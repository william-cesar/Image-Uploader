import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files }) => {
  return (
    <Container>
      {files.map((uploadedFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}
                {!!uploadedFile.url && (
                  <button onClick={() => {}}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>
          <div>
            {!uploadedFile.isUploaded && !uploadedFile.isError && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#52b3f9" },
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}
            {uploadedFile.url && (
              <a
                href="http://localhost:3000/files/24209bc889bc4b2c2dd2d0a19fb5f5c7-1.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFile.isUploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.isError && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
