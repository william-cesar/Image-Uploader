import React, { useState } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";
import api from "../../services/api";

import { Container, Content } from "./styles";
import Upload from "../../components/upload";
import FileList from "../../components/fileList";

const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let fileData = [];

  const handleUpload = (files) => {
    const addedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      isUploaded: false,
      isError: false,
      url: null,
    }));

    fileData = [...fileData, ...addedFiles];
    addedFiles.forEach(processUpload);
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api.post("/upload", data, {
      onUploadProgress: (e) => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        updateFileProgress(uploadedFile.id, {
          progress,
        });
      },
    });
  };

  const updateFileProgress = (id, data) => {
    const updatedFile = fileData.map((uploadedFile) => {
      return id === uploadedFile.id
        ? { ...uploadedFile, progress: data.progress }
        : uploadedFile;
    });
    fileData = [...updatedFile];
    setUploadedFiles([...uploadedFiles, ...updatedFile]);
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Content>
    </Container>
  );
};

export default ImageUploader;
