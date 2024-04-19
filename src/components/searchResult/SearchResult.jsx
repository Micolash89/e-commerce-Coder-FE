import { useSelector } from "react-redux";
import "../searchResult/searchResult.css";
import SearchResultCard from "./SearchResultCard";
import PaginadoButton from "./PaginadoButton";
import { useEffect, useState } from "react";

function SearchResult() {
  const products = useSelector((state) => state.search.products);
  const total = products.length;

  const [page, setPage] = useState(1);
  const [cantPaginate, setCantPaginate] = useState(5);
  const [cantPaginas, setCantPaginas] = useState([]);

  let fin;
  let inicio;
  fin = page * cantPaginate;
  inicio = fin - (cantPaginate - 1);
  fin = page * cantPaginate > total ? total : page * cantPaginate;
  inicio = inicio > fin ? 1 : inicio;

  const handleView = (env) => {
    setCantPaginate(env.target.value);
    console.log(env.target.value);
    setPage(1);
  };

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < Math.ceil(total / cantPaginate); i++) {
      arr.push(i + 1);
    }
    setCantPaginas(arr);
  }, [cantPaginate, total]);

  return (
    <>
      {products && (
        <section className="SearchResultContainer">
          <header className="QueryResultDisplay qrd flexrow">
            <span>
              <strong>
                {inicio} - {fin}
              </strong>{" "}
              of {products.length} results
            </span>
            <div className="qrd__itemsQuantity flexrow">
              <span>show items</span>
              <div className="qrd__itemsQuantity--selectBox flexrow">
                <input
                  type="radio"
                  hidden
                  name="opcion"
                  value={`5`}
                  onClick={handleView}
                  //   checked={cantPaginate === 3}
                  id="opcion1"
                />
                <label htmlFor="opcion1">5</label>

                <input
                  type="radio"
                  hidden
                  name="opcion"
                  value="10"
                  id="opcion2"
                  onClick={handleView}
                />
                <label htmlFor="opcion2">10</label>

                <input
                  type="radio"
                  hidden
                  name="opcion"
                  value="15"
                  id="opcion3"
                  onClick={handleView}
                />
                <label htmlFor="opcion3">15</label>
              </div>
            </div>
            {/* <div className="qrd__select flexrow">
            <div className="qrd__select--boxSelect flexrow">
              <label htmlFor="opciones">show items:</label>
              <select name="opciones" id="opciones">
                <option value="0" selected disabled>
                  default{" "}
                </option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div> */}
            <span>view as</span>
          </header>
          <section className="main__section2--cards ms2Cards  SearchResultList flexrow">
            {products.slice(inicio - 1, fin).map((product, index) => (
              <SearchResultCard
                key={`${index}${product._id}`}
                product={product}
              />
            ))}
          </section>

          <section className="SearchResultContainer__paginate flexrow">
            {cantPaginas.map((e, index) => (
              <PaginadoButton
                key={`${e}paginas${index}`}
                name={e}
                setPage={setPage}
                page={page}
              />
            ))}
          </section>
        </section>
      )}
    </>
  );
}

export default SearchResult;
