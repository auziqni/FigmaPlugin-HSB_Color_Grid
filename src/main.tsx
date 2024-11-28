import React, { useEffect, useState } from "react";
import {
  dispatchTS,
  getColorTheme,
  listenTS,
  subscribeColorTheme,
} from "./utils/utils";
import { Button } from "./components/ui/button";
import Slider from "./components/SliderSingle";
import DoubleRangeSlider from "./components/sliderRange";

export const App = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [value, setValue] = useState(150);

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
      <main className="w-full h-full bg-white">
        <DoubleRangeSlider
          minValue={minValue}
          maxValue={maxValue}
          onMinChange={setMinValue}
          onMaxChange={setMaxValue}
        />
        <Slider value={value} onChange={setValue} />
      </main>
    </>
  );
};
