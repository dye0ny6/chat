import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <img
          className="max-w-full max-h-full"
          src={process.env.PUBLIC_URL + "/assets/imgs/spinner.svg"}
          alt="loading image"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
