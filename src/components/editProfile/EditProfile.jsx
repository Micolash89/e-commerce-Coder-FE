import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
// import "../editProfile/editProfile.css";
import "../editProfile/editprofile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { END_POINTS } from "../endPoints";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";
import { logOutSession } from "../../redux/features/UserSlice";
import NoSession from "../noSession/NoSession";
import Loader from "../loaders/Loader";
import Loading2H from "../loaders/Loading2H";

function EditProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tokenCookie = Cookies.get("coderCookieToken");
    console.log("entré en el handleSubmit");
    axios
      .put(
        `${END_POINTS.URL()}/api/sessions/editprofile/${user._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${tokenCookie}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(messageOk(`Perfil actualizado correctamente`));
        Cookies.remove("coderCookieToken");
        dispatch(logOutSession());
        window.scrollTo(0, 0);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        dispatch(messageError("no se pudo actualizar el perfil"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="sectionRegister">
        <form className="register editProfile" onSubmit={handleSubmit}>
          <NoSession />
          <div className="register__title editProfileRegister__title flexcolum">
            <h2>Información de cuenta</h2>
          </div>
          <div className="register__input editProfile__input flexcolum">
            <label className="register__input--username flexcolum">
              <span>nombre</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="first_name"
                placeholder="Jhon Deo"
                value={formData.first_name}
              />
            </label>
            <label className="register__input--lastName flexcolum">
              <span>apellido</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="last_name"
                placeholder="Lock"
                value={formData.last_name}
              />
            </label>
            <label className="register__input--email  flexcolum">
              <span>email</span>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
              />
            </label>
            <label className="register__input--age editProfile__input--age flexcolum">
              <span>edad</span>
              <input
                onChange={handleInputChange}
                type="number"
                name="age"
                placeholder="##"
                minLength="1"
                maxLength="3"
                value={formData.age}
              />
            </label>
          </div>

          <div className="register__button  flexcolum">
            <button
              className={`register__button--submit editProfileRegister__button ${
                loading ? "editProfileRegister__button--loading" : ""
              }`}
              type="submit"
              disabled={
                formData.first_name == user.first_name &&
                formData.last_name == user.last_name &&
                formData.age == user.age &&
                formData.email == user.email
              }
            >
              {loading ? <Loading2H /> : "Guardar"}
            </button>

            <div className="register__button--newUser ">
              <Link to={"/restorepassword"}>
                Cambiar <strong>Password</strong>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
