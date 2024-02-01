// UploadFiles.js

import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/upload/65ba595cc1eb24b3b0715082",
  headers: {
    "Content-type": "application/json",
  },
});

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return http.post("", formData, {
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

const uploadFilesService = new UploadFilesService();

export default class UploadFiles extends Component {
  state = {
    selectedFiles: undefined,
    progressInfos: [],
    message: [],
    fileInfos: [],
  };

  componentDidMount() {
    this.loadFiles();
  }

  loadFiles = () => {
    uploadFilesService.getFiles()
      .then((response) => {
        this.setState({
          fileInfos: response.data,
        });
      })
      .catch((error) => console.error("Error loading files:", error));
  };

  upload = (idx, file) => {
    // let _progressInfos = [...this.state.progressInfos];

    uploadFilesService.upload(file, (event) => {
    //   _progressInfos[idx].percentage = Math.round(
    //     (100 * event.loaded) / event.total
    //   );
    //   this.setState({
    //     _progressInfos,
    //   });
    })
      .then(() => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });

        return this.loadFiles();
      })
      .catch(() => {
        // _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  };

  uploadFiles = () => {
    const selectedFiles = this.state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        // progressInfos: _progressInfos,
        // message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  };

  onDrop = (files) => {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  };

  render() {
    const { selectedFiles, progressInfos, message, fileInfos } = this.state;

    return (
      <div className="wrap">
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        <div className="my-3">
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {selectedFiles &&
                  Array.isArray(selectedFiles) &&
                  selectedFiles.length ? (
                    <div className="selected-file">
                      {selectedFiles.length > 3
                        ? `${selectedFiles.length} files`
                        : selectedFiles.map((file) => file.name).join(", ")}
                    </div>
                  ) : (
                    `Drag and drop files here, or click to select files`
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <button
                    className="btn"
                    disabled={!selectedFiles}
                    onClick={this.uploadFiles}
                  >
                    Upload
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
