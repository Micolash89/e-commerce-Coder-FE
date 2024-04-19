import React from "react";

function PaginadoButton({ name, setPage, page }) {
  return (
    <button
      className={`buttonPaginate ${name == page ? "selectedPaginate" : ""}`}
      onClick={() => setPage(name)}
    >
      <span className="buttonPaginate__span">{name}</span>
    </button>
  );
}

export default PaginadoButton;
