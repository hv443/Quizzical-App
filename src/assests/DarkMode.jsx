import React from "react";

const DarkMode = ({ darkMode, mode }) => {
  const active = mode ? "after:right-1" : "after:left-1";

  return (
    <div className=" flex  items-center justify-center space-x-2 absolute top-4 right-10">
      <div className="text-primary text-sm font-medium">Dark Mode</div>
      <div
        onClick={darkMode}
        className={`w-12 h-6 bg-primary duration-500 after:duration-500 rounded-xl overflow-hidden relative
        after:h-4 after:rounded-full after:top-1/2 after:-translate-y-1/2 after:w-4 after:bg-theme after:z-10 after:absolute ${active}`}
      ></div>
    </div>
  );
};

export default DarkMode;
