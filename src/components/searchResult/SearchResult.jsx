import { useSelector } from "react-redux";
import "../searchResult/searchResult.css";
import SearchResultCard from "./SearchResultCard";
import PaginadoButton from "./PaginadoButton";
import { useState } from "react";

function SearchResult() {
  const products = useSelector((state) => state.search.products);
  const total = products.length;
  const paginas = Math.ceil(total / 3);
  let arr = [];

  const [page, setPage] = useState(1);
  let cantPaginate = 3;
  let fin = page * cantPaginate;
  let inicio = fin - (cantPaginate - 1);
  fin = page * cantPaginate > total ? total : page * cantPaginate;

  /*

        total 2 /3 = .66 paginas = 1
        fin 1*3 = 3
        inicio 3-2 = 1 -1 = 0
        3>1 1


        3 prodcutos a la vez
        los botones de paginado

        total 9 = 3 paginas => 9/3=3.00  REDONDEO=>3 1-3
        total 8 = 3 paginas => 8/3=2.66  REDONDEO=>3 1-3
        total 7 = 3 paginas => 7/3=2.33  REDONDEO=>3 1-3 
        total 6 = 2 paginas => 6/3=2.00  REDONDEO=>2 1-2
        total 4 = 

        tengo 9
        1 pagina 1-3  1-9 1*3=3  
        2 pagina 4-6      2*3=6 6-2=4    
        3 pagina 7-9      3*3=9 9-2=7   

        total 53/20 = total de paginas = 2.65 = 3
        1 pagina 1-20  1*20=20 20-19
        2 pagina 21-40    2*20=40 40-19=21
        3 pagina 41-53     3*20=60/53 60-19=41

    */

  for (let i = 0; i < paginas; i++) {
    arr.push([i + 1]);
  }

  console.log("slice", products.slice(inicio, fin));
  console.log("slice", inicio, fin);
  console.log("page", page);
  return (
    <>
      <section className="SearchResultContainer">
        <header className="QueryResultDisplay qrd flexrow">
          <span>
            <strong>1 - 40</strong> of {products.length} results
          </span>
          {/* <div className="qrd__itemsQuantity flexrow">
            <span>show items</span>
            <div className="qrd__itemsQuantity--selectBox flexrow">
              <input
                type="radio"
                checked
                hidden
                name="opcion"
                value="24"
                id="opcion1"
              />
              <label htmlFor="opcion1">24</label>

              <input
                type="radio"
                hidden
                name="opcion"
                value="48"
                id="opcion2"
              />
              <label htmlFor="opcion2">48</label>

              <input
                type="radio"
                hidden
                name="opcion"
                value="72"
                id="opcion3"
              />
              <label htmlFor="opcion3">72</label>
            </div>
          </div> */}
          <div className="qrd__select flexrow">
            <div className="qrd__select--boxSelect flexrow">
              <label htmlFor="opciones">show items:</label>
              <select name="opciones" id="opciones">
                <option value="1" selected disabled>
                  default{" "}
                </option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div>
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
          {arr.map((e, index) => (
            <PaginadoButton
              key={`${e}paginas${index}`}
              name={e}
              setPage={setPage}
            />
          ))}
        </section>
      </section>
    </>
  );
}

export default SearchResult;
