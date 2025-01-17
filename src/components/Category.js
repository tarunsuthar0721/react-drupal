import React, { useEffect, useRef } from "react";
import "../assets/styles/Category.css";

const Category = ({ categories }) => {
  const sliderRef = useRef(null);

  // Dynamically calculate the card width
  const getCardWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 576) {
      // Mobile
      return sliderRef.current?.querySelector(".category-card")?.offsetWidth || 180;
    } else if (screenWidth <= 768) {
      // Tablet
      return sliderRef.current?.querySelector(".category-card")?.offsetWidth || 200;
    } else {
      // Desktop
      return sliderRef.current?.querySelector(".category-card")?.offsetWidth || 220;
    }
  };

  // Automatically scroll the slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const cardWidth = getCardWidth(); // Get card width based on the screen size
      if (slider.scrollWidth - slider.scrollLeft <= slider.clientWidth + cardWidth) {
        // Reset to start when reaching the end
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right by 1 card width
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000); // Adjust time interval for auto-scroll (3 seconds here)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="my-5 text-center">
      <h1 className="category-title">Category</h1>
      <div ref={sliderRef} className="category-slider">
        {categories.length > 0 ? (
          categories.map(
            (category) =>
              category.image &&
              category.image !== "No image field or image available" && ( // Check if image exists and is not the placeholder message
                <a
                  key={category.id}
                  href={category.url} // Redirect to the category's URL
                  className="category-link"
                >
                  <div className="category-card">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                </a>
              )
          )
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default Category;
