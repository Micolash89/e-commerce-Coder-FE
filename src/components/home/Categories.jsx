import { useEffect, useState } from "react";
import "../home/categories.css";
import CategorieList from "./CategorieList";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import ImageSlice from "./ImageSlice";

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
        <section className="main__section3 categories">
          <h3 className="main__section3--h3">
            Compre en las <strong>categorías principales</strong>
          </h3>
          <div className="main__section3--cards ms3Cards categories__list flexrow">
            {category.map((categ, index) => (
              <>
                <CategorieList key={`categoria ${index}`} name={categ} />
              </>
            ))}
            {/* <ImageSlice item={category} /> */}
          </div>
        </section>
      )}
    </>
  );
}

export default Categories;
