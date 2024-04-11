import { useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";

function ForgetPassword() {
  const [email, setEmail] = useState("");

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
              Send Email
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

export default ForgetPassword;
