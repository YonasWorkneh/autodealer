import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="h-screen grid place-items-center"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('/car-logos2.png')",
        backgroundSize: "contain",
      }}
    >
      {children}
    </div>
  );
}
