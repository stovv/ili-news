import { useLottie } from "lottie-react";
import Lottie from "lottie-react";
import sfLoadingAnimation from "../../assets/lottie/loading-success-fail.json";

const segments = {
  loading: [30, 240],
  success: [241, 386],
  fail: [700, 841],
};

export default function SFLoader({ style, className, type = "loading" }) {
  return (
    <Lottie
      animationData={sfLoadingAnimation}
      autoplay
      loop={type === "loading"}
      initialSegment={segments[type]}
      style={style}
      className={className}
    />
  );
}
