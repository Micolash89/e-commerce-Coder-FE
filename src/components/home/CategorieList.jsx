import axios from "axios";
import noPicture from "../../assets/image_3.png";
import { END_POINTS } from "../endPoints";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/features/SearchResult";
import { useNavigate } from "react-router-dom";

function CategorieList({ name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    axios
      .get(`${END_POINTS.URL()}/api/products/custom/search?search=${name._id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data.payload));
        navigate(`/search/${name._id}`);
      });
  };

  return (
    <>
      <button onClick={handleSearch} className="ms3Cards__card flexcolum">
        <div className="ms3Cards__card--img">
          <img src={name.url || noPicture} alt={name._id} title={name._id} />
        </div>

        <span className="ms3Cards__card--name">
          {name._id.length < 12 ? name._id : name._id.slice(0, 12) + "..."}
        </span>
      </button>
    </>
  );
}

export default CategorieList;
