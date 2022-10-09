import React from "react";

const DarkMode = ({ darkMode, mode }) => {
  const active = mode ? "after:left-[56%]" : "after:left-[10%]";

  return (
    <div className=" flex items-center justify-center space-x-2">
      <div className="text-primary text-sm font-medium">Dark Mode</div>
      <div
        onClick={darkMode}
        className={`w-12 h-6 bg-primary rounded-xl overflow-hidden relative
        after:h-4 after:w-4 after:rounded-full after:top-1/2 after:-translate-y-1/2  after:transition-all after:duration-300 after:bg-theme after:z-10 after:absolute ${active}`}></div>
    </div>
  );
};

export default DarkMode;
