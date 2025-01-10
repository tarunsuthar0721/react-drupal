import React from "react";
import { useEffect, useState } from "react";
import { getHeroBanner } from "../services/Api";
import "../assets/styles/HeroBanner.css";

const HeroBanner = () => {
    const [bannerData, setBannerData] = useState(null);

    // Fetch the Hero Banner data from the API
    useEffect(() => {
        getHeroBanner()
            .then((data) => setBannerData(data))
            .catch((error) => console.error('Error fetching hero banner:', error));
    }, []);


    // Check if banner data is available
    if (!bannerData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <div className="banner-title">
                        <h1>{bannerData.title}</h1>
                    </div>
                    <div className="banner-content">
                        {bannerData.text}
                    </div>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <div className="banner-image">
                        <img
                            src={bannerData.image}
                            alt="Precise Thick-N INSTANT"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;