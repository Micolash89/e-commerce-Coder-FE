import axios from "axios";
import "../../css/register.css";
import "../registerUser/registerUser.css";
import { useState } from "react";
import { END_POINTS } from "../endPoints";
import Loader from "../loaders/Loader";
import Error from "../Error";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import register from "../../images/register.png";

function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    console.log("entré en el handleSubmit");
    axios
      .post(`${END_POINTS.URL()}/api/sessions/registrar`, formData)
      .then((response) => {
        console.log(response.data);
        window.scrollTo(0, 0);
        dispatch(messageOk("se Registro correctamente"));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        dispatch(messageError("Error Registro"));
        setError(true);
        window.scrollTo(0, 0);
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <section className="sectionRegister sectionRegisterUser flexrow">
        <div
          className={`sectionRegister__status ${
            loading || error ? "sectionRegisterUser__status" : ""
          } `}
        >
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="logoLogin sectionRegisterUser__logo">
              <img src={register}></img>
            </div>
          )}
        </div>
        <form
          className="register sectionRegisterUserForm"
          onSubmit={handleSubmit}
        >
          <div className="register__title flexcolum">
            <h2>Registro</h2>
            <p>Únete a nosotros</p>
          </div>
          <div className="register__input sectionRegisterUser__input flexcolum">
            <label className="register__input--username flexcolum">
              <span>Primer nombre</span>
              <input
                required={true}
                onChange={handleInputChange}
                type="text"
                name="first_name"
                placeholder="Jhon Deo"
              />
            </label>
            <label className="register__input--lastName flexcolum">
              <span>apellido</span>
              <input
                required={true}
                onChange={handleInputChange}
                type="text"
                name="last_name"
                placeholder="Lock"
              />
            </label>
            <label className="register__input--age flexcolum">
              <span>edad</span>
              <input
                required={true}
                onChange={handleInputChange}
                type="number"
                name="age"
                placeholder="##"
              />
            </label>
            <label className="register__input--email flexcolum">
              <span>email</span>
              <input
                required={true}
                onChange={handleInputChange}
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>contraseña</span>
              <input
                required={true}
                onChange={handleInputChange}
                name="password"
                placeholder="******"
                type="password"
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>confirmar contraseña</span>
              <input
                required={true}
                name="password2"
                placeholder="******"
                type="password"
              />
            </label>
          </div>

          <div className="register__button sectionRegisterUserButton flexcolum">
            <button className="register__button--submit" type="submit">
              registrar
            </button>
            <div className="register__button--newUser">
              <Link to={"/login"}>
                {" "}
                Ya Tienes un Usuario ? <strong>Login</strong>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
