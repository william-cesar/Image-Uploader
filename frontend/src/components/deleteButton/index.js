import React from "react";
import { MdDeleteForever } from "react-icons/md";

import DeleteButton from "./styles";

const deleteButton = ({ onDeleteAll }) => {
  return (
    <DeleteButton onClick={() => onDeleteAll()}>
      <MdDeleteForever size={20} color="#fff" />
      Excluir tudo
    </DeleteButton>
  );
};

export default deleteButton;
