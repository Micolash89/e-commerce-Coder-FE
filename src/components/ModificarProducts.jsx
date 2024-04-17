import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loading2H from "./loaders/Loading2H";

function ModificarProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    /*la eliminacion tiene que ser una baja logica, verificar en el backeend que el carrito no me den los que tienen baja logica*/
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("entré en el handleSubmit");

    const tokenCookie = Cookies.get("coderCookieToken");

    axios
      .put(`${END_POINTS.URL()}/api/products/${id}`, formData, {
        withCredentials: true,

        headers: {
          Authorization: `coderCookieToken=${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (e) => {
    const tokenCookie = Cookies.get("coderCookieToken");
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`${END_POINTS.URL()}/api/products/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/myproducts");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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

          <div className={`register__button  flexrow `}>
            <button className="register__button--submit" type="submit">
              Modificar
            </button>
            {/* cambiar que cambie de alta o baja dependiendo del estado del producto */}
            <button
              className={`register__button--submit register__button--deleted ${
                loading ? "rbd" : ""
              }`}
              onClick={deleteProduct}
            >
              {!loading && <span>Eliminar</span>}
              {loading && <Loading2H className="rbd__loading" />}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ModificarProducts;
