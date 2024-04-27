function PaginadoButton({ name, setPage, page }) {
  const handleSetPage = () => {
    if (name != page) window.scrollTo(0, 0);
    setPage(name);
  };

  return (
    <button
      className={`buttonPaginate ${name == page ? "selectedPaginate" : ""}`}
      onClick={handleSetPage}
    >
      <span className="buttonPaginate__span">{name}</span>
    </button>
  );
}

export default PaginadoButton;
