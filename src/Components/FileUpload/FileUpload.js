import React, { useState } from "react";
import "./FileUpload.css";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("YOUR_UPLOAD_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      } 
    } else {
      console.warn("No file selected");
    }
  };

  return (
    <div classname="Container">
      <div classname="Files">
        <div className="FileType">
          <input
            type="file"
            accept=".pdf, .doc, .docx, .txt, .json"
            onChange={handleFileChange}
          />
          <p>Accepted file types: PDF, DOC, DOCX, TXT, JSON</p>
          <button className="uploadButton" onClick={handleUpload}>
            Upload
          </button>
          <li className="FileTypeButtons">
            <button onClick={handleUpload}>get Queries</button>&nbsp;&nbsp;
            <button onClick={handleUpload}>get Templates</button>&nbsp;&nbsp;
            <button onClick={handleUpload}>get Rules</button>
          </li>
        </div>

        <div className="FileType1">
          <input
            type="file"
            accept=".parquet, .csv, .xlsx"
            onChange={handleFileChange}
          />
          <p>Accepted file types: PARQUET, CSV, XLSX</p>
          <button className="uploadButton" onClick={handleUpload}>
            Upload
          </button>
          <li className="FileType1Buttons">
            <button onClick={handleUpload}>get Schema</button>
            <button onClick={handleUpload}>Another button</button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
