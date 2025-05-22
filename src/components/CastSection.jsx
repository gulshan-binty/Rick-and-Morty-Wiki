import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router";
import { request, gql } from "graphql-request";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const CastSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cast, setCast] = useState([]);

  const slidesToShow = 5.5;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await request(endpoint, query);
        setCast(data.characters.results.slice(0, 15)); 
      } catch (err) {
        console.error("Failed to fetch cast:", err);
      }
    };
    fetchCast();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 2.5 } },
    ],
  };

  return (
    <section className="py-12 px-4 sm:px-8 bg-[#0b0f1a] relative overflow-hidden">
      <div className="max-w-[1320px] m-auto flex justify-between items-center mb-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold">
          Meet The Cast
        </h2>
        <Link
          to="/castPage"
          className="px-4 py-1 border border-lime-400 text-white rounded hover:bg-lime-400 hover:text-black transition"
        >
          View All
        </Link>
      </div>

      <div className="relative max-w-[1320px] m-auto">
        <Slider ref={sliderRef} {...settings}>
          {cast.map((character) => (
            <div key={character.id} className="px-2">
              <div
                className="w-fit rounded-md relative border-gradient group shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)",
                }}
              >
                <Link to={`/character/${character.id}`}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-56 h-46 object-cover rounded-t-md px-3 pt-3"
                  />
                </Link>
                <div className="p-4 text-white text-sm font-medium">
                  {character.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Arrows */}
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
        {currentSlide < cast.length - slidesToShow && (
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
    </section>
  );
};

export default CastSection;
