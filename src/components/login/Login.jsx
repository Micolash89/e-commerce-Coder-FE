import { useState } from "react";
import "../login/login.css";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import Loader from "../loaders/Loader";
import Error from "../error/Error";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";
import login from "../../images/login.png";
import { setSession } from "../../redux/features/UserSlice";
import { cartAdd, cartSet } from "../../redux/features/CartSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    console.log("entre al handle submit");
    try {
      const response = await axios.post(
        `${END_POINTS.URL()}/api/sessions/login`,
        formData
      );
      const token = response.data.token;
      Cookies.set("coderCookieToken", token, { expires: 7 });
      dispatch(messageOk("se logueo correctamente"));
      dispatch(setSession(response.data.user));
      handleCart();
      navigate("/");
    } catch (error) {
      setError(true);
      dispatch(messageError("Error logueo "));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCart = () => {
    const cookieToken = Cookies.get("coderCookieToken");

    try {
      axios
        .get(`${END_POINTS.URL()}/api/carts/`, {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${cookieToken}`,
          },
        })
        .then((response) => {
          dispatch(cartSet(0));
          console.log(response.data);
          console.log("response: cart", response.data.payload.products);
          response.data.payload.products.map((item) =>
            dispatch(cartAdd(item.quantity))
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="sectionLogin flexrow">
        <div className="sectionLogin__status">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="logoLogin">
              <img src={login}></img>
            </div>
          )}
        </div>

        <form className="login" onSubmit={handleSubmit}>
          <div className="login__title flexcolum">
            <h2>Bienvenido de Vuelta</h2>
            <p>Inicie Sesión para Continuar</p>
          </div>
          <div className="login__input flexcolum">
            <label className="login__input--username flexcolum">
              <span>email</span>
              <input
                type="text"
                name="email"
                placeholder="example@gamil.com"
                onChange={handleInputChange}
              />
            </label>
            <label className="login__input--password flexcolum">
              <span>Contraseña</span>
              <input
                name="password"
                placeholder="******"
                type="password"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <Link to={"/restorepassword"} className="login__a" href="">
            Restaurar Contraseña ?
          </Link>

          <div className="login__button flexcolum">
            <button className="login__button--submit" type="submit">
              Login
            </button>
            <div className="login__button--newUser">
              <Link to={"/register"}>
                {" "}
                Usuario Nuevo? <strong>Registrate</strong>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
