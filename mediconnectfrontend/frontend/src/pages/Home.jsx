import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import ShortServices from "../components/ShortService";
import Faq from "../components/Faq";
const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <ShortServices />
      <TopDoctors />
      <Testimonials />
      <Faq />

      <Banner />
    </div>
  );
};

export default Home;
