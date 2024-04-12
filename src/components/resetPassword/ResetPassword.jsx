import { useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

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
    console.log(formData);
    axios
      .post(
        `${END_POINTS.URL()}/api/sessions/restorepassword/${token}`,
        formData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
              <span>Confirm password</span>
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
              register
            </button>
            <div className="register__button--newUser">
              <a href="">
                {" "}
                Alredy User ? <strong>Login</strong>
              </a>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default ResetPassword;
