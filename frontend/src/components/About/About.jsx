import React from "react";
import homeImg2 from "../../assets/images/home-img2.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          <div className="flex gap-[30px] justify-end order-2 lg:order-1">
            <img
              className="w-full max-w-[650px] rounded-[10px]"
              src={homeImg2}
              alt=""
            />
          </div>

          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to Stand Among India's Finest</h2>
            <p className="text__para">
              With a proud legacy spanning three decades, we have consistently
              earned acclaim as one of India's foremost agriculture advisors,
              solidifying our standing as the unquestionable choice in the
              nation's farming community. Our unwavering dedication to
              excellence is a daily commitment to our clients, as we remain
              focused on unlocking tomorrow's potential rather than resting on
              past achievements. We are steadfast in delivering nothing but the
              best in agricultural guidance and outcomes.
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
