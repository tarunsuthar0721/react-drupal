import React, { useEffect, useRef } from "react";
import "../assets/styles/Category.css";

const Category = ({ categories }) => {
  const sliderRef = useRef(null);

  // Automatically scroll the slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (slider.scrollWidth - slider.scrollLeft === slider.clientWidth) {
        // Reset to start when reaching the end
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right by 1 card width
        slider.scrollBy({ left: 220, behavior: "smooth" });
      }
    }, 3000); // Adjust time interval for auto-scroll (3 seconds here)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="my-5 text-center">
      <h1 className="category-title">Category</h1>
      <div ref={sliderRef} className="category-slider">
        {categories.length > 0 ? (
          categories.map((category) => (
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
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default Category;
