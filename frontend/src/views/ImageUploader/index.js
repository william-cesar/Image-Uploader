import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";
import api from "../../services/api";

import { Container, Content } from "./styles";
import Upload from "../../components/upload";
import FileList from "../../components/fileList";
import DeleteButton from "../../components/deleteButton";
import { MdFilterCenterFocus } from "react-icons/md";

const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let fileData = [];

  useEffect(() => {
    api.get("/uploads").then((response) => {
      const files = response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: fileSize(file.size),
        preview: file.url,
        progress: file.progress,
        isUploaded: true,
        isError: false,
        url: file.url,
      }));

      setUploadedFiles(files);
    });
  }, []);

  const normalizeName = (str) => {
    if (str.length > 30) {
      const newStr = str.slice(0, 20) + str.slice(-5);
      return newStr;
    }
    return str;
  };

  const handleUpload = (files) => {
    const addedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: normalizeName(file.name),
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

    api
      .post("/upload", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          updateFileProgress(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        updateFileProgress(uploadedFile.id, {
          isUploaded: true,
          id: response.data.post._id,
          url: response.data.post.url,
        });
      })
      .catch(() => {
        updateFileProgress(uploadedFile.id, {
          isError: true,
        });
      });
  };

  const updateFileProgress = (id, data) => {
    const updatedFile = fileData.map((uploadedFile) => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile;
    });
    fileData = [...updatedFile];
    setUploadedFiles([...uploadedFiles, ...updatedFile]);
  };

  const handleDelete = (id) => {
    api.delete(`/delete/${id}`);

    const filesToKeep = uploadedFiles.filter((file) => {
      return file.id !== id;
    });

    setUploadedFiles(filesToKeep);
  };

  const handleDeleteAll = () => {
    api.delete("/deleteAll");

    setUploadedFiles([]);
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
        {!!uploadedFiles.length && (
          <DeleteButton onDeleteAll={handleDeleteAll} />
        )}
      </Content>
    </Container>
  );
};

export default ImageUploader;
