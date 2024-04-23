import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loading2H from "./loaders/Loading2H";
import { messageError, messageOk } from "../redux/features/NotificationSlice";
import { useDispatch } from "react-redux";

function ModificarProducts() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    price: 0,
    category: "",
    stock: 0,
    url: "",
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
        url: response.data.payload.url,
      });
      setStatus(response.data.payload.status);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
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
        dispatch(messageOk("se modifico un producto"));
        setStatus(true);
      })
      .catch((error) => {
        console.log(error);

        dispatch(messageError("error al modificar"));
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
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
        setStatus(false);
        dispatch(messageOk("Baja del producto"));
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
        dispatch(messageError("error al modificar el estado del producto"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="sectionRegister">
        <div className="imgPrewiev">
          {formData.url && (
            <img
              className="imgPrewiev__img"
              src={`${formData.url}`}
              alt="imagen previa"
            />
          )}
        </div>
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
            <label className="register__input--code ric flexcolum">
              <span>code</span>
              <input
                onChange={handleInputChange}
                type="string"
                name="code"
                placeholder="#####"
                value={formData.code}
                disabled={true}
                className="ric__input"
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
            <label className="register__input--password flexcolum">
              <span>imagen URL </span>
              <input
                onChange={handleInputChange}
                name="url"
                placeholder="https/www.ejemplo.com"
                type="url"
                value={formData.url}
              />
            </label>
            <label className="register__input--password flexcolum">
              <span>estado del producto *</span>
              <input
                disabled={true}
                name="status"
                placeholder={status ? "alta" : "baja"}
                type="text"
                value={status ? "alta" : "baja"}
                className={`${status ? "productTrue" : "productFalse"}`}
              />
            </label>
          </div>

          <div className={`register__button  flexrow `}>
            <button
              className={`register__button--submit ${loading ? "rbd" : ""}`}
              type="submit"
            >
              {!loading ? (
                <span>modificar</span>
              ) : (
                <Loading2H className="sps2__loading " />
              )}
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
          <span>
            * Para dar de alta un producto selecione modificar <br />* Para dar
            de baja un producto seleccione eliminar{" "}
          </span>
        </form>
      </section>
    </>
  );
}

export default ModificarProducts;
