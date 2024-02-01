const express = require("express");
const multer = require("multer");
const ethers = require("ethers");
const path = require("path");
const app = express();
// const port = 3000;
const port = 8085;
require("dotenv").config();
const fs = require("fs");
const Moralis = require("moralis");
const Moralis2 = Moralis.default;
const moralisKey = process.env.MORALIS_KEY;

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", upload.single("file"), (req, res) => {
  var name = req.file.filename;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const filePath = req.file.path;
  res.send(`File uploaded successfully. Path: ${filePath}`);
  console.log(`File uploaded successfully. Path: ${filePath}`);
  saveFile(name, filePath);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function saveFile(name, path) {
  try {
    await Moralis2.start({
      apiKey: moralisKey,
    });
    const data = fs.readFileSync(path, { encoding: "base64" });
    const uploadArray = [
      {
        path: "file",
        content: data,
      },
    ];
    const response = await Moralis2.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });
    var filePath = response.jsonResponse[0].path;
    filePath = encrypt(Buffer.from(filePath));
    await interactWithContract(name, filePath);
  } catch (error) {
    console.error("Error saving file to IPFS:", error);
  }
}

async function interactWithContract(name, filePath) {
  console.log(name);
  console.log(filePath);
  const API_URL = process.env.SEPOLIA_API_URL;
  const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  // Contract ABI
  const {
    abi,
  } = require("./artifacts/contracts/FileStorage.sol/FileStorage.json");
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const StorageContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log("Storing the IPFS hash...");
  //   const gasLimit = 25000;
  const tx = await StorageContract.upload(name, filePath.encryptedData);
  await tx.wait();
  var storedhash = await StorageContract.getIPFSHash(name);
  console.log(storedhash);
  storedhash = { iv: iv.toString("hex"), encryptedData: storedhash };
  storedhash = decrypt(storedhash);
  console.log(`IPFS hash is stored in the smart contract: ${storedhash}`);
}

const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); //initialization vector

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decrypt(text) {
  console.log(text.encryptedData);
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}
