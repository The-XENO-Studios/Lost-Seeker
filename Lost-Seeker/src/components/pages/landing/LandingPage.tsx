import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LottiePlayer from "../../shared/LottiePlayer";
import NavBar from "../../shared/NavBar";
import { useInView } from "react-intersection-observer";
import Footer from "../../shared/Footer";

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

  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX,
        mouseY = e.clientY;
      const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;

      const maxX = page.current!.offsetWidth * 0.1,
        maxY = page.current!.offsetHeight * 0.1;

      const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
      setMousePos({ x: mouseX, y: mouseY });
      page.current?.animate(
        { transform: `translate(${panX}px, ${panY}px)` },
        { duration: 2000, fill: "forwards", easing: "ease" }
      );
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      onScroll={handleScroll}
      className="flex flex-col items-center w-screen overflow-x-hidden h-screen relative "
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

      <div
        ref={page}
        className="flex flex-col items-center mt-10 sm:mt-24 md:mt-32 lg:mt-36 z-10"
      >
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
        <div className="card  h-[33rem]  md:h-[30rem] w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-2xl">
              Lost & Found Community - Reuniting Valuables
            </h3>
            <p className="font-light text-lg">
              Welcome to Lost Seeker, the online community where lost and found
              items meet their owners once again. Have you discovered a lost
              item that you'd like to return to its rightful owner? Or are you
              seeking to reunite with something you've lost? You're in the right
              place!
            </p>
          </div>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
        <div className="card h-[33rem]  md:h-[30rem] w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-2xl">
              Be a Hero - Return Lost Items
            </h3>
            <p className="font-light text-lg">
              Be a hero in someone's life! At Lost Seeker, you have the power to
              make a difference by returning lost items to their owners. Share
              the details of the item you found, and the owner will connect to
              you securely. Let's spread kindness and make meaningful
              connections through our lost and found community.
            </p>
          </div>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
        <div className="card  h-[33rem]  md:h-[30rem] w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-2xl">Lost Something? We Can Help!</h3>
            <p className="font-light text-lg">
              Losing something can be stressful, but don't worry, we're here to
              assist. Search for the details of your lost item on Lost Seeker,
              and let the community come to your aid. Our platform provides a
              safe and efficient way to reach out to potential finders,
              increasing the chances of reuniting you with your beloved
              belongings. Let's work together in bringing lost items back to
              their rightful homes!
            </p>
          </div>
          <LottiePlayer
            className="w-[150px] h-[150px] mt-2"
            src="https://assets9.lottiefiles.com/packages/lf20_xiWykXZv3t.json"
            loop
            autoplay
          />
        </div>
      </div>

      <Footer />

      <div className="absolute" style={{ top: mousePos.y, left: mousePos.x }}>
        <div className="rounded-full w-[300px] h-[300px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute blur-[190px] bg-red animate-pulse "></div>
      </div>
    </div>
  );
}

export default LandingPage;
