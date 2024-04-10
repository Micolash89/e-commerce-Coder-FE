import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Dashboard from "./components/Current";
import Register from "./components/Register";
import RegisterProduct from "./components/RegisterProduct";
import Cart from "./components/Cart";
import Product from "./components/Product";
import PreLoading from "./components/PreLoading";
import MyProducts from "./components/MyProducts";
import ModificarProducts from "./components/ModificarProducts";
import Page404 from "./components/page404/Page404";
import "./css/main.css";
import Section2 from "./components/Section2";

function App() {
  return (
    <>
      <PreLoading />
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Section2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/current" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerproduct" element={<RegisterProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/details/:id" element={<Product />} />
          <Route exact path="/myproducts" element={<MyProducts />} />
          <Route exact path="/modificar/:id" element={<ModificarProducts />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
