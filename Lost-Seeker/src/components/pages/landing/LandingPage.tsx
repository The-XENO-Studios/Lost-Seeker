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

      <div className="flex flex-col items-center mt-20 z-10">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-8xl py-4 w-1/2  mt-32 text-black">
            Return the <b className="text-blue font-extrabold">found</b> and
            find the <b className="text-blue font-extrabold">lost</b>.
          </h1>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
