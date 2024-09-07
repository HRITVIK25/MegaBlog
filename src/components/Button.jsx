import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props //agar user ne koi property di hai to wo yahan spread ho jayegi
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
      {/* ye children kuch nhi hai bas button jahan call hoke text pass
      hoga wo yahan a ajyegz */}
    </button>
  );
}

export default Button;
