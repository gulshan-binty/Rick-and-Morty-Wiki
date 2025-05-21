import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { request, gql } from "graphql-request";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  {
    locations(page: 1) {
      results {
        id
        name
      }
    }
  }
`;

const LocationSection = () => {
  const sliderRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 4.5;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await request(endpoint, query);
        setLocations(data.locations.results.slice(0, 10)); // adjust limit as needed
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2.5 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="mt-16 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold">Locations</h2>
      </div>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {locations.map((loc) => (
            <div key={loc.id} className="px-2">
              <div
                className="min-w-[160px] sm:min-w-[180px] md:min-w-[220px] rounded-md relative episode-border-gradient group shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 65%, 80% 100%, 0 100%)",
                }}
              >
                <div className="p-4">
                  <p className="text-sm text-white/60">#{loc.id}</p>
                  <h3 className="text-white text-lg font-medium">{loc.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Left arrow */}
        {currentSlide > 0 && (
          <button
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-lime-500 w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:scale-110 transition"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {currentSlide < locations.length - slidesToShow && (
          <button
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-lime-500 w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:scale-110 transition"
            onClick={() => sliderRef.current.slickNext()}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationSection;
