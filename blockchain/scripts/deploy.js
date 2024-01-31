async function main() {
  const FileStorage = await ethers.getContractFactory("FileStorage");

  const FileStorage_ = await FileStorage.deploy();
  console.log("Contract Address:", FileStorage_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
