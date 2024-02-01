import http from "./http-common";
const fs = require("fs");
const path = require("path");

class UploadFilesService {
  upload = async(file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    //save the file in the same directory
    // const filePath = path.join(__dirname, "uploaded.pdf");
    console.log(formData);
    const filePath = path.join(__dirname, "uploads", "translated.pdf");
    fs.writeFile(filePath, file, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(filePath);

    try {
      console.log("Uploading file...");
      const res = await fetch("http://localhost:8085/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "uploaded.pdf",
          filePath: "uploaded.pdf",
        }),
      });
      if (res.ok) {
        const data = await res.json(); // Parse the JSON response
        console.log("Received data:", data); // Logging the entire response for debugging
        console.log("Stored Hash:", data.storedhash);
        const uri = data.storedhash;
        setUrl(uri); // Update the 'url' state with the URI
      } else {
        console.error("Error:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // const firstResponse = await fetch('http://localhost:8000/user', {
    //   method: 'POST',
    //   body: JSON.stringify({ "name": p.name }),
    // })

    // const user_id = firstResponse

    // return http.post("/upload/${userId}", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress,
    // });

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
