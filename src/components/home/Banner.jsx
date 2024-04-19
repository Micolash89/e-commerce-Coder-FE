import React from "react";
import "../home/banner.css";
import banner from "../../images/banner.png";

function Banner() {
  return (
    <>
      <section className="main__section1 flexrow">
        {/* <div className="flexcolum">
          <span>Best Deal Online on smart watches</span>
          <h2>SMART WEARABLE.</h2>
          <span>UP to 80% OFF</span>
        </div> */}
        <div>
          <img src={banner} alt="producto" />
        </div>
        {/* <button className="main__section1--button preview">
          <span>x</span>
        </button>
        <button className="main__section1--button next">
          <span>x</span>
        </button> */}
      </section>
    </>
  );
}

export default Banner;
