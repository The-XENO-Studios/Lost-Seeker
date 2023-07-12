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
    <div className="card min-h-fit  h-[35rem]  md:h-full w-full bg-white shadow-lg rounded-xl max-w-[400px] md:max-w-[450px] p-6 flex flex-col justify-between z-20">
      <div>
        <h3 className="font-bold text-2xl text-black">{headline}</h3>
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
