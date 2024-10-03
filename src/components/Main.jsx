import React from "react";

export default function Main(props) {
  return (
    <main
      className={`w-[calc(100%-20%)] float-right relative top-[73px] bg-themeMainGray min-h-[calc(100vh-73px)] space-y-6`}
    >
      {props?.content}
    </main>
  );
}
