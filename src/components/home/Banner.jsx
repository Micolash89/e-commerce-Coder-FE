import "../home/banner.css";
import banner from "../../images/banner.png";

function Banner() {
  return (
    <>
      <section className="main__section1 flexrow">
        <div>
          <img src={banner} alt="producto" />
        </div>
        <h1 className="main__section1--title">
          E-commerce <br />
          <strong>MegaMart</strong>
        </h1>
      </section>
    </>
  );
}

export default Banner;
