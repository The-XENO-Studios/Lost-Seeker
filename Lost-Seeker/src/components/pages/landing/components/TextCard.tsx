import React from "react";
import LottiePlayer from "../../../shared/LottiePlayer";

export default function TextCard({
  headline,
  text,
  lottieSrc,
}: {
  headline: string;
  text: string;
  lottieSrc: string;
}) {
  return (
    <div className="card  h-[33rem]  md:h-[30rem] w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-2xl">{headline}</h3>
        <p className="font-light text-lg">{text}</p>
      </div>
      <LottiePlayer
        className="w-[150px] h-[150px] mt-2"
        src={lottieSrc}
        loop
        autoplay
      />
    </div>
  );
}
