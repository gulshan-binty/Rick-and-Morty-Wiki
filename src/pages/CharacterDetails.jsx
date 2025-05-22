import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { request, gql } from "graphql-request";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faRobot,
  faMars,
  faGlobe,
  faMapMarkerAlt,
  faTv,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const endpoint = "https://rickandmortyapi.com/graphql";

const CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
      }
    }
  }
`;

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await request(endpoint, CHARACTER_QUERY, { id });
        setCharacter(data.character);
      } catch (error) {
        console.error("Failed to fetch character:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div className="text-white p-4">Loading...</div>;

  return (
    <section className="relative min-h-screen text-white bg-[#0b0f1a] overflow-hidden px-4 sm:px-10">

      <div className="absolute inset-0 -z-10">
        <img
          src="src/assets/images/image 64-9.png"
          alt="Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0b0f1a]/95" />
      </div>

      {/* Logo */}
      <Link to="/">
        <img
          src="/src/assets/images/Logo.png"
          alt="Rick and Morty Logo"
          className="h-auto w-32 md:w-56 mx-auto py-3"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center gap-6 items-center px-4">
        {/* Left Section */}
        <div className="flex flex-col justify-center gap-4 items-center flex-1">
          <h2 className="text-2xl font-bold text-cyan-400">{character.name}</h2>
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-green-400 to-cyan-400 w-fit">
            <div className="p-4 bg-[#0b0f1a] rounded-xl">
              <img
                src={character.image}
                alt={character.name}
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="hidden mr-10 md:block w-[1px] h-60 my-auto bg-gradient-to-b from-green-400 via-cyan-400 to-blue-500 rounded-full" />

        {/* Right: Info cards */}
        <div className="flex-1 w-full md:w-sm">
          <div className="flex gap-4 pb-3">
            <InfoCard
              label="Status"
              value={character.status}
              icon={
                <FontAwesomeIcon icon={faHeart} className="text-green-400" />
              }
            />
            <InfoCard
              label="Species"
              value={character.species}
              icon={
                <FontAwesomeIcon icon={faRobot} className="text-green-400" />
              }
            />
            <InfoCard
              label="Gender"
              value={character.gender}
              icon={
                <FontAwesomeIcon icon={faMars} className="text-green-400" />
              }
            />
          </div>

          <div className="pb-3">
            {/* Origin Card */}
            <div className="relative">
              <InfoCard
                label="Origin"
                value={character.origin.name}
                icon={
                  <FontAwesomeIcon icon={faGlobe} className="text-green-400" />
                }
              />
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                className="absolute bottom-3 right-6 text-white text-sm"
              />
            </div>

           
            <div className="relative mt-4">
              <InfoCard
                label="Last Known Location"
                value={character.location.name}
                icon={
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-green-400"
                  />
                }
              />
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                className="absolute bottom-3 right-6 text-white text-sm"
              />
            </div>
          </div>

          {/* Episodes */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-green-400 to-cyan-400">
            <div className="bg-[#0b0f1a] rounded-xl p-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-lime-500">
              <h3 className="text-white font-semibold mb-2">
                <span className="text-xl">
                  <FontAwesomeIcon icon={faTv} className="text-green-400" />
                </span>{" "}
                <br />
                <span className="text-sm text-gray-400 font-extralight">
                  Episode(s)
                </span>
              </h3>
              <ul className="list-disc list-inside text-white text-sm space-y-1">
                {character.episode.map((ep) => (
                  <li key={ep.id}>{ep.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ label, value, icon }) => (
  <div className="p-[1px] rounded-xl bg-gradient-to-br from-green-400 to-cyan-400 flex-1 mb-3">
    <div className="bg-[#0b0f1a] rounded-xl p-4 h-full">
      <p className="text-sm text-gray-400 font-extralight">
        <span className="text-lg block">{icon}</span>
        <span className="block">{label}</span>
      </p>
      <p className="text-lg font-medium mt-1">{value}</p>
    </div>
  </div>
);


export default CharacterDetails;
