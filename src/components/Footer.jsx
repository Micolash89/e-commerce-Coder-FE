import "../css/footer.css";
import apple from "../assets/appStore.png";
import google from "../assets/googlePlay.png";

function Footer() {
  let year = new Date().getFullYear();

  return (
    <>
      <footer className="footer flexcolum">
        <section className="flexrow footer__links ">
          <section className="footer__links--section1 fls1 flexcolum">
            <h4 className="fls1__h4">MegaMart</h4>
            <div className="fls1__div1">
              <i className="ri-whatsapp-line"></i>
              <p className="fls1__div--p">
                Whats App <br /> +1 202-918-2132{" "}
              </p>
              <i className="ri-phone-line"></i>
              <p className="fls1__div--p">
                Call Us <br />
                +1 202-918-2132
              </p>
            </div>
            <div className="fls1__div2">
              <h4 className="fls1__div2--h4">Download App</h4>
              <div className="fls1__div flexrow">
                <a className="fls1__div--a" href="">
                  <i className="ri-apple-line"></i>
                  <img src={apple} alt="app aple" />
                </a>
                <a className="fls1__div--a" href="">
                  <i className="ri-google-play-line"></i>
                  <img src={google} alt="app google Play" />
                </a>
              </div>
            </div>
          </section>
          <section className="footer__links--section2 fls2 flexcolum">
            <h4 className="fls2__h4">Most Popular Categories</h4>
            <ul className="fls2__ul flexcolum">
              <li className="fls2__ul--li">Staples</li>
              <li className="fls2__ul--li">Beverages</li>
              <li className="fls2__ul--li">Personal Care</li>
              <li className="fls2__ul--li">Home Care</li>
              <li className="fls2__ul--li">Baby Care</li>
              <li className="fls2__ul--li">Vegetables & Fruits</li>
              <li className="fls2__ul--li">Snacks & Foods</li>
              <li className="fls2__ul--li">Dairy & Bakery</li>
            </ul>
          </section>
          <section className="footer__links--section3 fls3 flexcolum">
            <h4 className="fls3__h4">Customer Services</h4>
            <ul className="fls3__ul flexcolum">
              <li className="fls3__ul--li">About Us</li>
              <li className="fls3__ul--li">Terms & Conditions</li>
              <li className="fls3__ul--li">FAQ</li>
              <li className="fls3__ul--li">Privacy Policy</li>
              <li className="fls3__ul--li">E-waste Policy</li>
              <li className="fls3__ul--li">Cancellation & Return Policy</li>
            </ul>
          </section>
        </section>
        <span className="footer__span">
          © {year} All rights reserved. Reliance Retail Ltd.
        </span>
      </footer>
    </>
  );
}

export default Footer;
