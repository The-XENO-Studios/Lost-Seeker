import { Player } from "@lottiefiles/react-lottie-player";

function LottiePlayer({
  src,
  className,
  autoplay,
  loop,
}: {
  src: string;
  className: string;
  autoplay?: boolean;
  loop?: boolean;
}) {
  return (
    <Player
      className={className}
      autoplay={autoplay}
      loop={loop}
      src={src}
    ></Player>
  );
}

export default LottiePlayer;
