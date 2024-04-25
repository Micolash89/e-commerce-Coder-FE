import { useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const dispath = useDispatch();

  const handleInputChange = (event) => {
    setEmail(
      event.target.value
      // setEmail({
      //   ...email,
      //   [event.target.name]: event.target.value,
      // }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("entré en el handleSubmit");
    axios
      .post(`${END_POINTS.URL()}/api/sessions/restorepassword`, {
        email,
      })
      .then((response) => {
        console.log(response.data);
        dispath(messageOk("se envio un mail a su casilla de correo"));
      })
      .catch((error) => {
        console.log(error);
        dispath(messageError("error al enviar el mail"));
      });
  };

  return (
    <>
      <section className="sectionRegister">
        <form className="register" onSubmit={handleSubmit}>
          <div className="register__title flexcolum">
            <h2>Reset </h2>
            <p>Password</p>
          </div>
          <div className="register__input flexcolum">
            <label className="register__input--password flexcolum">
              <span>Email</span>
              <input
                onChange={handleInputChange}
                name="email"
                placeholder="example@example"
                type="email"
              />
            </label>
          </div>

          <div className="register__button flexcolum">
            <button className="register__button--submit" type="submit">
              Enviar Email
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

export default ForgetPassword;
