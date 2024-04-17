import { useState } from "react";
import "../css/login.css";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import Loader from "./loaders/Loader";
import Error from "./Error";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const [token, setToken] = useState(null);

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
      Cookies.set("coderCookieToken", token);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="sectionLogin flexrow">
        <div className="sectionLogin__status">
          {loading && <Loader />}
          {error && <Error />}
        </div>

        <form className="login" onSubmit={handleSubmit}>
          <div className="login__title flexcolum">
            <h2>Welcome Back</h2>
            <p>LOGIN TO CONTINUE</p>
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
              <span>password</span>
              <input
                name="password"
                placeholder="******"
                type="password"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <Link to={"/restorepassword"} className="login__a" href="">
            Forget Password ?
          </Link>

          <div className="login__button flexcolum">
            <button className="login__button--submit" type="submit">
              Login
            </button>
            <div className="login__button--newUser">
              <Link to={"/register"}>
                {" "}
                New User ? <strong>SING UP</strong>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
