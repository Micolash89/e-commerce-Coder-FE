import axios from "axios";
import { useState } from "react";
import { END_POINTS } from "./endPoints";
import { useDispatch } from "react-redux";
import { messageError, messageOk } from "../redux/features/NotificationSlice";
import Loading2H from "./loaders/Loading2H";

function RegisterProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    console.log("entré en el handleSubmit");

    await axios
      .post(`${END_POINTS.URL()}/api/products`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(messageOk("se registro un producto"));
        setFormData({
          title: "",
          description: "",
          code: "",
          price: 0,
          category: "",
          stock: 0,
          url: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        dispatch(messageError("Registro de producto fallido"));
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  return (
    <>
      <section className="sectionRegister sectionRegisterProduct">
        <div className="imgPrewiev sectionRegisterProduct__img">
          {formData.url && (
            <img
              className={`imgPrewiev__img ${
                focus
                  ? "sectionRegisterProduct__img--show"
                  : "sectionRegisterProduct__img--notshow"
              }`}
              src={`${formData.url}`}
              alt="imagen previa"
            />
          )}
        </div>
        <form className="register registerProductForm" onSubmit={handleSubmit}>
          <div className="register__title flexcolum">
            <h2>Registrar Producto</h2>
          </div>
          <div className="register__input registerProductForm__input flexcolum">
            <label className=" register__input--productRegister register__input--username flexcolum">
              <span>nombre del producto</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="title"
                placeholder="xxxx"
              />
            </label>
            <label className=" register__input--productRegister register__input--lastName flexcolum">
              <span>Descripción</span>
              <input
                onChange={handleInputChange}
                type="text"
                name="description"
                placeholder="xxxx"
              />
            </label>
            <label className=" register__input--productRegister register__input--age flexcolum">
              <span>código</span>
              <input
                onChange={handleInputChange}
                type="string"
                name="code"
                placeholder="#####"
              />
            </label>
            <label className=" register__input--productRegister register__input--email flexcolum">
              <span>Precio</span>
              <input
                onChange={handleInputChange}
                type="number"
                name="price"
                placeholder="$$$$$$"
              />
            </label>
            <label className=" register__input--productRegister register__input--password flexcolum">
              <span>Categoria</span>
              <input
                onChange={handleInputChange}
                name="category"
                placeholder="******"
                type="string"
              />
            </label>
            <label className=" register__input--productRegister register__input--password flexcolum">
              <span>stock</span>
              <input
                onChange={handleInputChange}
                name="stock"
                placeholder="******"
                type="number"
              />
            </label>
            <label
              className={`register__input--productRegister register__input--password flexcolum `}
            >
              <span>imagen URL </span>
              <input
                onChange={handleInputChange}
                name="url"
                placeholder="https/www.ejemplo.com"
                type="url"
                onFocus={() => setFocus(true)}
                onMouseLeave={() => setFocus(false)}
              />
            </label>
          </div>

          <div className="register__button flexcolum">
            <button
              className={`register__button--submit register__button--registerProduct ${
                loading ? "rbs" : ""
              } `}
              type="submit"
            >
              {!loading ? (
                <span>Registrar</span>
              ) : (
                <Loading2H className="sps2__loading " />
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RegisterProduct;
