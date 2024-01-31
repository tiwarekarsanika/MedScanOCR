document.addEventListener("DOMContentLoaded", () => {
  const fileUploadForm = document.getElementById("fileUploadForm");
  const fileInput = document.getElementById("fileInput");
  const responseDiv = document.getElementById("response");

  fileUploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        responseDiv.innerText = result;
      } else {
        responseDiv.innerText = "File upload failed.";
      }
    } catch (error) {
      console.error("Error:", error);
      responseDiv.innerText = "An error occurred.";
    }
  });
});

// script.js
