import React from "react";
import homeImg1 from "../assets/images/home-img1.jpg";
import About from "../components/About/About";

const Home = () => {
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Join us on your journey to be a better Farmer, we're here to
                  support.
                </h1>
                <button className="btn">Request an Appointment</button>
              </div>
            </div>
            <div className="flex gap-[30px] justify-end">
              <div>
                <img
                  className="w-[700px] rounded-[10px]"
                  src={homeImg1}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <About/>


    </>
  );
};

export default Home;
