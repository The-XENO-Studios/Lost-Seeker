import { Player } from "@lottiefiles/react-lottie-player";

function LottiePlayer({
  src,
  className,
  autoplay,
  loop,
  ref,
}: {
  src: string;
  className: string;
  autoplay?: boolean;
  loop?: boolean;
  ref?: React.RefObject<Player>;
}) {
  return (
    <Player
      className={className}
      autoplay={autoplay}
      loop={loop}
      src={src}
      ref={ref}
    ></Player>
  );
}

export default LottiePlayer;
