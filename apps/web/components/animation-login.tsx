"use client";

import Lottie from "lottie-react";
import animationData from "../public/animation/login-asset.json";

export default function LoginAnimation() {
  return (
    <div className="w-64 h-64">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
