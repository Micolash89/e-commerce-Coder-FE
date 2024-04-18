import React from "react";

function PaginadoButton({ name, setPage }) {
  return (
    <button className="buttonPaginate" onClick={() => setPage(name[0])}>
      <span className="buttonPaginate__span">{name}</span>
    </button>
  );
}

export default PaginadoButton;
