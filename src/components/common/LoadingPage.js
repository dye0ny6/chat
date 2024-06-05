import React from "react";

const LoadingPage = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="flex items-center justify-center">
        <img
          class="max-w-full max-h-full"
          src={process.env.PUBLIC_URL + "/assets/imgs/spinner.svg"}
          alt="loading image"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
