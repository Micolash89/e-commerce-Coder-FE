import "../home/banner.css";
import banner from "../../images/banner.png";

function Banner() {
  return (
    <>
      <section className="main__section1 flexrow">
        <div>
          <img src={banner} alt="producto" />
        </div>
      </section>
    </>
  );
}

export default Banner;
