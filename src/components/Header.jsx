const Header = () => {
  return (
    <div className=" w-full">
      <div className="max-w-[1220px] mx-auto relative z-10 flex flex-col items-center justify-center text-white px-4 text-center">
        {/* Wrapper for fixed width */}
        {/* Floating Rick & Morty Label */}

        <img
          src="/src/assets/images/Logo.png"
          alt="Rick and Morty Logo"
          className="h-auto w-32 md:w-56 py-8"
        />

        {/* Main Heading */}
        <h1 className="relative header-text flex flex-wrap justify-center items-center text-4xl md:text-8xl font-extrabold md:gap-4 gap-0 pt-16">
          <img
            src="/src/assets/images/bubble.png"
            alt="Portal"
            className="absolute top-12 -left-8 md:left-15 md:-top-5  w-20 md:w-56"
          />
          <span className="text-white tracking-wider italic">THE</span>
          <img
            src="/src/assets/images/portal.png"
            alt="Portal"
            className="w-32 md:w-60"
          />

          <span className="drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tracking-wider bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-bold">
            RICK &
          </span>
          <span className="drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tracking-wider bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent font-bold">
            MORTY
          </span>
          <span className="text-white tracking-wider italic">WIKI</span>
        </h1>

        {/* Description */}
        <div className="flex md:flex-row flex-col-reverse gap-8 md:gap-16 justify-center items-start w-[360px] md:w-[512px] mx-auto my-8">
          {/* Button */}
          <button className="font-semibold w-36 md:w-80 py-2 px-5  md:p-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-white rounded-full shadow-lg flex justify-center items-center md:gap-2 hover:scale-105 transition-transform">
            <svg className="md:w-6 md:h-6 w-3 h-3 fill-white" viewBox="0 0 24 24">
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
            Watch Now
          </button>

          {/* Text */}
          <p className="header-text pt- leading-none text-cyan-400 text-sm tracking-tight text-justify max-w-[280px]">
            Brilliant but boozy scientist Rick hijacks his fretful teenage
            grandson, Morty, for wild escapades in other worlds and alternate
            dimensions.
          </p>
        </div>
      </div>

      {/* Right-side glowing device image */}
      {/* <div className="absolute right-4 bottom-8 md:bottom-20 md:right-10 w-28 md:w-36">
        <img
          src="/src/assets/images/device.png"
          alt="Device"
          className="w-full h-full object-contain"
        />
      </div> */}
    </div>
  );
};

export default Header;
