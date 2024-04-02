import axios from "axios";
import "../css/register.css";
import { useState } from "react";

function Register() {
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
    try {
      console.log("entré en el handleSubmit");
      const response = await axios
        .post("http://localhost:8080/api/sessions/registrar", formData)
        .then((response) => {
          console.log(response.data);
        })
        .then((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="sectionRegister">
        <form className="register" onSubmit={handleSubmit}>
          <div className="register__title flexcolum">
            <h2>Register</h2>
            <p>join to us</p>
          </div>
          <div className="register__input flexcolum">
            <label className="register__input--username flexcolum">
              <span>First Name</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="first_name"
                placeholder="Jhon Deo"
              />
            </label>
            <label className="register__input--lastName flexcolum">
              <span>Last Name</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="last_name"
                placeholder="Lock"
              />
            </label>
            <label className="register__input--age flexcolum">
              <span>age</span>
              <input
                onChange={handleInputChange}
                type="number"
                name="age"
                placeholder="##"
              />
            </label>
            <label className="register__input--email flexcolum">
              <span>email</span>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
            </label>
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
              <input name="password2" placeholder="******" type="password" />
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

export default Register;
