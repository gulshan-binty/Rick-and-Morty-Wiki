
import React, { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import { Link } from "react-router";
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

const CastPage = () => {
    const [cast, setCast] = useState([]);
     useEffect(() => {
        const fetchCast = async () => {
          try {
            const data = await request(endpoint, query);
            setCast(data.characters.results.slice(0, 15)); // limit to first 1
          } catch (err) {
            console.error("Failed to fetch cast:", err);
          }
        };
        fetchCast();
      }, []);
  return (
    <section className="relative min-h-screen bg-[#0b0f1a] overflow-hidden py-12 px-4 sm:px-10">
      {/* Full background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="src/assets/images/image 64-9.png"
          alt="Background"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0b0f1a]/95" />
      </div>

      {/* Logo at top center */}
      <div className="relative z-10 flex justify-center mb-10">
        <Link to='/'>
          <img
            src="src/assets/images/Logo.png"
            alt="Rick and Morty Logo"
            className="h-auto w-32 md:w-56"
          />
        </Link>
      </div>

      {/* Cast grid content */}
      <div className="relative z-10 max-w-[1260px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-10">
          The Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cast.map((character, index) => (
            <div
              key={index}
              className="w-full bg-white/5 rounded-md relative cast-border-gradient shadow-md"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                backdropFilter: "blur(4px)",
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-32 md:h-60 object-cover rounded-md px-4 pt-4"
              />
              <p className="text-white text-sm font-medium px-4 py-2">
                {character.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CastPage;
