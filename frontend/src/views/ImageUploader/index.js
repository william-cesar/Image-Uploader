import React, { useState } from "react";

import { Container, Content } from "./styles";
import Upload from "../../components/upload";
import FileList from "../../components/fileList";

const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState();

  const handleUpload = (files) => {
    console.log(files);
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        <FileList />
      </Content>
    </Container>
  );
};

export default ImageUploader;
