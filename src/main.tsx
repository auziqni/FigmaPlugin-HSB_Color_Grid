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
  const [sliderSaturationRangeMinValue, setSliderSaturationRangeMinValue] =
    useState(0);
  const [sliderSaturationRangeMaxValue, setSliderSaturationRangeMaxValue] =
    useState(100);
  const [sliderBrigtnessRangeMinValue, setSliderBrigtnessRangeMinValue] =
    useState(0);
  const [sliderBrigtnessRangeMaxValue, setSliderBrigtnessRangeMaxValue] =
    useState(100);
  const [sliderHueValue, setSliderHueValue] = useState(150);
  const [step, setStep] = useState(10);

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
        <div>
          hue
          <Slider
            value={sliderHueValue}
            onChange={setSliderHueValue}
            minRange={0}
            maxRange={360}
          />
        </div>
        <div>
          Saturation
          <DoubleRangeSlider
            minValue={sliderSaturationRangeMinValue}
            maxValue={sliderSaturationRangeMaxValue}
            onMinChange={setSliderSaturationRangeMinValue}
            onMaxChange={setSliderSaturationRangeMaxValue}
          />
        </div>
        <div>
          Brightness
          <DoubleRangeSlider
            minValue={sliderBrigtnessRangeMinValue}
            maxValue={sliderBrigtnessRangeMaxValue}
            onMinChange={setSliderBrigtnessRangeMinValue}
            onMaxChange={setSliderBrigtnessRangeMaxValue}
          />
        </div>
        <div>
          step
          <div>
            <Button onClick={() => setStep(step - 1)}>-</Button>
            {step}
            <Button onClick={() => setStep(step + 1)}>+</Button>
          </div>
        </div>

        <Button onClick={helloWorld}>Hello World</Button>
      </main>
    </>
  );
};
