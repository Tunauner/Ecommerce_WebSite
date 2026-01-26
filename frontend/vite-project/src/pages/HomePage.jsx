import React from "react";
import { Link } from "react-router-dom";
import woman from "../assets/homepage/woman.jpg";
import man from "../assets/homepage/man.jpg";

const HomePage = () => {
  return (
    <div className="h-screen w-full absolute z-50">
      <div className="flex h-full">
        {/* WOMAN */}
        <Link
          to="/woman"
          className="relative w-1/2 h-full group overflow-hidden"
        >
          <img
            src={woman}
            alt="Woman"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <h1
            className="absolute top-1/2 left-1/2 
                         -translate-x-1/2 -translate-y-1/2
                         text-white text-4xl font-semibold tracking-wide"
          >
            WOMAN EDITION
          </h1>
        </Link>

        {/* MAN */}
        <Link to="/man" className="relative w-1/2 h-full group overflow-hidden">
          <img
            src={man}
            alt="Man"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <h1
            className="absolute top-1/2 left-1/2 
                         -translate-x-1/2 -translate-y-1/2
                         text-white text-4xl font-semibold tracking-wide"
          >
             MAN EDITION
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
