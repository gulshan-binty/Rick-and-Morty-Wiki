import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { request, gql } from "graphql-request";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationSection from "./Location";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  {
    episodes(page: 1) {
      results {
        id
        name
        episode
      }
    }
  }
`;

const EpisodeSection = () => {
  const sliderRef = useRef(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 4.5;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await request(endpoint, query);
        setEpisodes(data.episodes.results.slice(0, 10)); 
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
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
      { breakpoint: 1024, settings: { slidesToShow: 3.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2.5 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-12 px-4 sm:px-8 bg-[#0b0f1a] relative overflow-hidden">
      <img
        src="src/assets/images/Spiral Element.png"
        alt="Spiral"
        className="absolute right-0 top-0 w-96 opacity-60 pointer-events-none"
      />
      <div className="max-w-[1320px] m-auto mb-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold">Episodes</h2>
      </div>

      <div className="relative max-w-[1320px] m-auto">
        <Slider ref={sliderRef} {...settings}>
          {episodes.map((ep) => (
            <div key={ep.id} className="px-2">
              <div
                className="text-white min-w-[160px] sm:min-w-[180px] md:min-w-[220px] rounded-md relative episode-border-gradient group shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 65%, 80% 100%, 0 100%)",
                }}
              >
                <div className="p-4">
                  <p className="text-sm opacity-70 ">{ep.episode}</p>
                  <p className="text-lg font-medium text-wrap">{ep.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Left Arrow */}
        {currentSlide > 0 && (
          <button
            className="absolute -left-6 top-10 -translate-y-1/2 z-10 bg-white text-lime-500 w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:scale-110 transition"
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

        {/* Right Arrow */}
        {currentSlide < episodes.length - slidesToShow && (
          <button
            className="absolute -right-6 top-10 -translate-y-1/2 z-10 bg-white text-lime-500 w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:scale-110 transition"
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
        <LocationSection />
      </div>
    </section>
  );
};

export default EpisodeSection;
