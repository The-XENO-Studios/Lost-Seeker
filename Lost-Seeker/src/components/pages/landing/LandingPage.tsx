import { Link } from "react-router-dom";
import LandingNavBar from "./components/LandingNavBar";

function LandingPage() {
  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden h-screen relative">
      <LandingNavBar />

      <div className="h-[36rem] w-[36rem] left-48 bottom-36 absolute">
        <div className="p-20 h-full w-full bg-lightBlue  rounded-full blur-3xl"></div>
      </div>

      <div className="h-[32rem] w-[32rem] right-48 top-36 absolute">
        <div className="p-20 h-full w-full bg-lightBlue  rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col items-center mt-10 sm:mt-24 md:mt-32 lg:mt-36 z-10">
        <div className="flex flex-col items-center lg:w-[40rem]">
          <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl xl:text-7xl px-4 md:px-0 py-4 text-center   mt-32 text-black">
            Return the <b className="text-blue font-extrabold">found</b> and
            find the <b className="text-blue font-extrabold">lost</b>.
          </h1>
          <p className=" text-base sm:text-lg md:text-xl text- font-normal text-center w-4/5">
            You lost something and want to see if someone found it or you found
            something but don't know who it belongs to? We got you covered. We
            offer an easy platform to exhange the lost and found.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center pt-8 gap-2">
          <Link
            className="bg-lightBlue text-darkBlue rounded-full w-fit px-4 py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-blue shadow-md"
            to="/"
          >
            <b>Found</b> something?
          </Link>
          <p className="animate-pulse text-darkBlue ">or</p>
          <Link
            className="bg-lightBlue text-darkBlue rounded-full w-fit px-4 py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-blue "
            to="/"
          >
            <b>Lost</b> something?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
