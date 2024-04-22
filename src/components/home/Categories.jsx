import { useEffect, useState } from "react";
import "../home/categories.css";
import CategorieList from "./CategorieList";
import axios from "axios";
import { END_POINTS } from "../endPoints";

function Categories() {
  const [category, setCategory] = useState(false);

  useEffect(() => {
    axios
      .get(`${END_POINTS.URL()}/api/products/find/categories`)
      .then((res) => {
        setCategory(res.data.payload);
        console.log("categoria para el list", category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {category && (
        <section className="main__section3">
          <h3 className="main__section3--h3">
            Compre en las <strong>categorías principales</strong>
          </h3>
          <div className="main__section3--cards ms3Cards flexrow">
            {category.map((categ, index) => (
              <CategorieList key={`categoria ${index}`} name={categ} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Categories;
