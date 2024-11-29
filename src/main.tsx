import React, { useEffect, useState } from "react";
import {
  dispatchTS,
  getColorTheme,
  listenTS,
  subscribeColorTheme,
} from "./utils/utils";
import { Button } from "./components/ui/button";
import Slider from "./components/sliderSingle";
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

  const createbox = () => {
    dispatchTS("createColorGrid", {
      step: step,
      hue: sliderHueValue,
      saturationMin: sliderSaturationRangeMinValue,
      saturationMax: sliderSaturationRangeMaxValue,
      brightnessmin: sliderBrigtnessRangeMinValue,
      brightnessmax: sliderBrigtnessRangeMaxValue,
    });

    listenTS(
      "createColorGridCallback",
      (res) => {
        console.log("createboxCallback result: ", res);
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
      <main className="relative flex flex-col w-full h-full bg-white ">
        <div>
          <Slider
            description="Hue"
            value={sliderHueValue}
            onChange={setSliderHueValue}
            minRange={0}
            maxRange={360}
          />
        </div>
        <div>
          <DoubleRangeSlider
            description="Saturation"
            minValue={sliderSaturationRangeMinValue}
            maxValue={sliderSaturationRangeMaxValue}
            onMinChange={setSliderSaturationRangeMinValue}
            onMaxChange={setSliderSaturationRangeMaxValue}
          />
        </div>
        <div>
          <DoubleRangeSlider
            description="Brightness"
            minValue={sliderBrigtnessRangeMinValue}
            maxValue={sliderBrigtnessRangeMaxValue}
            onMinChange={setSliderBrigtnessRangeMinValue}
            onMaxChange={setSliderBrigtnessRangeMaxValue}
          />
        </div>
        <div className="px-16">
          <p className="mb-3 font-bold">Grid</p>
          <div className="flex flex-row items-center justify-between w-full ">
            <Button onClick={() => setStep(step - 1)}>-</Button>
            {step}
            <Button onClick={() => setStep(step + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-10">
          <Button className="bg-blue-700 w-36" onClick={createbox}>
            create
          </Button>
        </div>

        <footer className="absolute bottom-0 left-0 flex justify-end w-full h-8 p-1 pr-2 text-sm text-blue-200 bg-black">
          <a
            href="https://www.teknisee.com/"
            target="_blank"
            className="hover:text-[#3ff3f3]"
          >
            by teknisee
          </a>
        </footer>
      </main>
    </>
  );
};
