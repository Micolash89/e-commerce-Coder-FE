import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function ModificarProducts() {
  const { id } = useParams();

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

  useEffect(() => {
    axios.get(`${END_POINTS.URL()}/api/products/${id}`).then((response) => {
      console.log("datos del producto", response.data);
      setFormData({
        title: response.data.payload.title,
        description: response.data.payload.description,
        code: response.data.payload.code,
        price: response.data.payload.price,
        category: response.data.payload.category,
        stock: response.data.payload.stock,
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("entré en el handleSubmit");
      console.log(formData);

      const tokenCookie = Cookies.get("coderCookieToken");

      await axios
        .put(`${END_POINTS.URL()}/api/products/${id}`, formData, {
          withCredentials: true,

          headers: {
            Authorization: `coderCookieToken=${tokenCookie}`,
          },
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
            <h2>Modificar Producto</h2>
          </div>
          <div className="register__input flexcolum">
            <label className="register__input--username flexcolum">
              <span>nombre del producto</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="title"
                placeholder="xxxx"
                value={formData.title}
              />
            </label>
            <label className="register__input--lastName flexcolum">
              <span>description</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="description"
                placeholder="xxxx"
                value={formData.description}
              />
            </label>
            <label className="register__input--age flexcolum">
              <span>code</span>
              <input
                onChange={handleInputChange}
                type="string"
                name="code"
                placeholder="#####"
                value={formData.code}
                disabled={true}
              />
            </label>
            <label className="register__input--email flexcolum">
              <span>price</span>
              <input
                onChange={handleInputChange}
                type="number"
                name="price"
                placeholder="$$$$$$"
                value={formData.price}
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>category</span>
              <input
                onChange={handleInputChange}
                name="category"
                placeholder="******"
                type="string"
                value={formData.category}
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>stock</span>
              <input
                onChange={handleInputChange}
                name="stock"
                placeholder="******"
                type="number"
                value={formData.stock}
              />
            </label>
          </div>

          <div className="register__button flexcolum">
            <button className="register__button--submit" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ModificarProducts;
