import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";

function ResetPassword() {
  const { token } = useParams();

  const dispath = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entré en el handleSubmit");

    axios
      .post(
        `${END_POINTS.URL()}/api/sessions/restorepassword/${token}`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        dispath(messageOk("se restablecio la contraseña correctamente"));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        dispath(messageError("error al restablecer la contraseña"));
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
              <span>password</span>
              <input
                onChange={handleInputChange}
                name="password"
                placeholder="******"
                type="password"
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>confirmar password</span>
              <input
                onChange={handleInputChange}
                name="confirm_password"
                placeholder="******"
                type="password"
              />
            </label>
          </div>

          <div className="register__button flexcolum">
            <button className="register__button--submit" type="submit">
              Reset Password
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

export default ResetPassword;
