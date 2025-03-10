import React from "react";

interface PrimaryButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  rounded?: boolean;
  size?: "small" | "medium" | "large";
  customClass?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  rounded = true,
  size = "medium",
  customClass = "",
}) => {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-3 py-2 text-md",
    large: "px-5 py-3 text-lg",
  };

  const baseClass = `font-semibold bg-[color:var(--accent)] text-[color:var(--text-white)] ${
    rounded ? "rounded-full" : "rounded"
  } flex items-center gap-2 ${sizeClasses[size]} ${customClass}`;

  return (
    <button onClick={onClick} className={baseClass}>
      {children}
    </button>
  );
};

export default PrimaryButton;
