import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Iphone 14 Pro"
        subtitle="Experinece the power of the latest iphone 14 with our most Pro camera ever."
        link="/product/66827b8f404637ade1f33462"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini."
        link="/product/66827b8f404637ade1f3346a"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
