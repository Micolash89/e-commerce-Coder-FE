import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/current/Current";
import Register from "./components/Register";
import RegisterProduct from "./components/RegisterProduct";
import Cart from "./components/cart/Cart";
import Product from "./components/Product";
import PreLoading from "./components/PreLoading";
import MyProducts from "./components/MyProducts";
import ModificarProducts from "./components/ModificarProducts";
import Page404 from "./components/page404/Page404";
import Section2 from "./components/home/Section2";
import { ThemeProvider } from "./components/context/ThemeContext";
import ForgetPassword from "./components/forgetPasswod/ForgetPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Main from "./components/main/Main";
import "./css/breakpoints.css";
import PathLocation from "./components/PathLocation/PathLocation";
import SearchResult from "./components/searchResult/SearchResult";

function App() {
  return (
    <>
      <ThemeProvider>
        <PreLoading />
        <Header />
        <Main>
          <PathLocation>
            <Routes>
              <Route path="/" element={<Section2 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/current" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registerproduct" element={<RegisterProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route exact path="/details/:id" element={<Product />} />
              <Route exact path="/myproducts" element={<MyProducts />} />
              <Route exact path="/modify/:id" element={<ModificarProducts />} />
              <Route exact path="/search/:query" element={<SearchResult />} />
              {/* <Route exact path="/search/?query" element={<ModificarProducts />} /> */}
              <Route
                exact
                path="/restorepassword"
                element={<ForgetPassword />}
              />
              <Route
                exact
                path="/restorepassword/:token"
                element={<ResetPassword />}
              />

              <Route path="/*" element={<Page404 />} />
            </Routes>
          </PathLocation>
        </Main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
