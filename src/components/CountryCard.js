import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CountryCard() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "custom-slider",
  };

  const sliderRef = useRef(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="w-full relative max-w-[1000px] mx-auto">
      <button
        onClick={() => previousSlide()}
        className="absolute top-1/2 -translate-y-1/2 -left-[20px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <button
        onClick={() => nextSlide()}
        className="absolute top-1/2 -translate-y-1/2 -right-[20px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>

      {loading ? (
        <p> loading....</p>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {countries.map((country) => (
            <div key={country.cca3} className=" w-max">
              <img
                className="flag size-[300px] block"
                src={country.flags.png}
                alt={`${country.name.common} flag`}
              />
              <h2>{country.name.common}</h2>
              {country.population && (
                <p className="population">
                  Population: {country.population.toLocaleString()}
                </p>
              )}
              {country.name.common}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CountryCard;
