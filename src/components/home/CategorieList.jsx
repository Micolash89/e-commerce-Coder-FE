import axios from "axios";

import { END_POINTS } from "../endPoints";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/features/SearchResult";
import { useNavigate } from "react-router-dom";

function CategorieList({ name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    axios
      .get(`${END_POINTS.URL()}/api/products/custom/search?search=${name}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data.payload));
        navigate(`/search/${name}`);
      });
  };

  return (
    <>
      <button
        onClick={handleSearch}
        to={`/search/${name}`}
        className="ms3Cards__card flexcolum"
      >
        <div className="ms3Cards__card--img">
          <img src="images/image 3 (1).png" alt="" />
        </div>

        <span className="ms3Cards__card--name">{name}</span>
      </button>
    </>
  );
}

export default CategorieList;
