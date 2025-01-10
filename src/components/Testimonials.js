import React from "react";
import { useEffect, useState } from "react";
import { getTestimonials } from "../services/Api";
import "../assets/styles/Testimonial.css";

const Testimonials = () => {
    const [testimonialData, setTestimonialData] = useState(null);

    useEffect(() => {
        getTestimonials()
            .then((data) => setTestimonialData(data))
            .catch((error) => console.error('Error fetching hero banner:', error));
    }, []);

    if (!testimonialData) {
        return <p>Loading...</p>;
    }

    const [heading, ...testimonials] = testimonialData;

    return (
        <>
            <div className="container my-5">
                <div id="testimonialSlider" className="carousel slide" data-bs-ride="carousel">
                    <h2 className="text-center mb-4 custom-heading">{heading}</h2>
                    <div className="carousel-inner">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <div className="testimonial-slide text-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.title}
                                        className="testimonial-image rounded-circle mb-3"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                    <h3 className="testimonial-title">{testimonial.title}</h3>
                                    <p className="testimonial-description">
                                        "{testimonial.description}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a
                        className="carousel-control-prev"
                        href="#testimonialSlider"
                        role="button"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#testimonialSlider"
                        role="button"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Testimonials;