import React from "react";
import GlobalStyle from "./styles/global";

import ImageUploader from "./views/ImageUploader/index";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ImageUploader />
    </>
  );
};

export default App;
