import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen text-primary flex flex-col justify-center items-center dark:bg-dark-bg">
      <h1 className="text-clr-blue-text font-inter text-primary font-medium text-base md:text-xl dark:text-dark-para">
        Questions loading...
      </h1>
      <div className="lds">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
