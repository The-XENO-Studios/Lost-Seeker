import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LottiePlayer from "../../shared/LottiePlayer";
import NavBar from "../../shared/NavBar";
import { useInView } from "react-intersection-observer";

function LandingPage() {
  const [onTop, setOnTop] = useState(false);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      onScroll={handleScroll}
      className="flex flex-col items-center w-screen overflow-x-hidden h-screen relative"
    >
      <NavBar
        onTop={onTop}
        links={["List", "Contribute", "About", "Questions"]}
      />

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
            className="bg-black text-white rounded-full w-fit px-4 py-2 text-lg font-bold transition-transform hover:scale-95 shadow-md border-2 border-black"
            to="/foundreport"
          >
            <b>Found</b> something?
          </Link>
          <p className="animate-pulse text-black ">or</p>
          <Link
            className="bg-white text-black rounded-full w-fit px-4 py-2 text-lg font-bold transition-transform hover:scale-95  shadow-md border-2 border-black"
            to="/list"
          >
            <b>Lost</b> something?
          </Link>
        </div>
      </div>

      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-center mt-20 md:mt-96 gap-8 md:gap-4 lg:gap-8 w-full px-8 md:px-4 lg:px-8 mb-8  hidden-card  ${
          inView && "show-card"
        }`}
      >
        <div className="card  h-fit w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6">
          <h3 className="font-bold text-2xl">Lorem ipsum dolor sit amet</h3>
          <p className="font-light text-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
        <div className="card  h-fit w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6">
          <h3 className="font-bold text-2xl">Lorem ipsum dolor sit amet</h3>
          <p className="font-light text-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
        <div className="card  h-fit w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6">
          <h3 className="font-bold text-2xl">Lorem ipsum dolor sit amet</h3>
          <p className="font-light text-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
      </div>
      <div className="absolute" style={{ top: mousePos.y, left: mousePos.x }}>
        <div className="rounded-full w-[300px] h-[300px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute blur-[190px] bg-red animate-pulse "></div>
      </div>
    </div>
  );
}

export default LandingPage;
