import axios from "axios";
import React, { useState } from "react";
import { END_POINTS } from "./endPoints";

function RegisterProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    price: 0,
    category: "",
    stock: 0,
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
      console.log(formData);
      await axios
        .post(`${END_POINTS.URL()}/api/products`, formData, {
          withCredentials: true,
        })
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
            <h2>Register Product</h2>
          </div>
          <div className="register__input flexcolum">
            <label className="register__input--username flexcolum">
              <span>nombre del producto</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="title"
                placeholder="xxxx"
              />
            </label>
            <label className="register__input--lastName flexcolum">
              <span>description</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="description"
                placeholder="xxxx"
              />
            </label>
            <label className="register__input--age flexcolum">
              <span>code</span>
              <input
                onChange={handleInputChange}
                type="string"
                name="code"
                placeholder="#####"
              />
            </label>
            <label className="register__input--email flexcolum">
              <span>price</span>
              <input
                onChange={handleInputChange}
                type="number"
                name="price"
                placeholder="$$$$$$"
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>category</span>
              <input
                onChange={handleInputChange}
                name="category"
                placeholder="******"
                type="string"
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>stock</span>
              <input
                onChange={handleInputChange}
                name="stock"
                placeholder="******"
                type="number"
              />
            </label>
          </div>

          <div className="register__button flexcolum">
            <button className="register__button--submit" type="submit">
              register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RegisterProduct;
