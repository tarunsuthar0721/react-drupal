import React from "react";
import HeroBanner from "../components/HeroBanner";
import Testimonials from "../components/Testimonials";
import Category from "../components/Category";

const Home = ({ categories }) => {
  return (
    <>
      <HeroBanner />
      <Category categories={categories} />
      <Testimonials />
    </>
  );
};

export default Home;
