import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = () => {
  return (
    <Container>
      <li>
        <FileInfo>
          <Preview src="http://localhost:3000/files/24209bc889bc4b2c2dd2d0a19fb5f5c7-1.jpg" />
          <div>
            <strong>profile.jpg</strong>
            <span>
              64kb<button onClick={() => {}}>Excluir</button>
            </span>
          </div>
        </FileInfo>
        <div>
          <CircularProgressbar
            styles={{
              root: { width: 24 },
              path: { stroke: "#52b3f9" },
            }}
            strokeWidth={10}
            value={50}
          />
          <a
            href="http://localhost:3000/files/24209bc889bc4b2c2dd2d0a19fb5f5c7-1.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
          </a>
          <MdCheckCircle size={24} color="#78e5d5" />
          <MdError size={24} color="#e57878" />
        </div>
      </li>
    </Container>
  );
};

export default FileList;
