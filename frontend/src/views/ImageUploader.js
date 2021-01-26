import React from "react";

import Container from "../styles/container";
import Content from "../styles/content";
import Upload from "../components/upload";

const ImageUploader = () => {
  return (
    <Container>
      <Content>
        <Upload />
      </Content>
    </Container>
  );
};

export default ImageUploader;
