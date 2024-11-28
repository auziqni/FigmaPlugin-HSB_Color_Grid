import React, { useEffect, useState } from "react";
import {
  dispatchTS,
  getColorTheme,
  listenTS,
  subscribeColorTheme,
} from "./utils/utils";

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  const helloWorld = () => {
    dispatchTS("hello", {
      string: "World",
      num: 20,
    });

    listenTS(
      "helloCallback",
      (res) => {
        console.log("helloCallback result: ", res);
      },
      true
    );
  };

  const [lightOrDarkMode, setLightOrDarkMode] = useState(getColorTheme());
  useEffect(() => {
    subscribeColorTheme((mode) => {
      setLightOrDarkMode(mode);
    });
  }, []);
  return (
    <>
      <main className="w-full h-full text-blue-300 bg-white"> hello world</main>
    </>
  );
};
