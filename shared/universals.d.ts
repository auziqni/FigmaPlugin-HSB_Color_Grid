export interface EventTS {
  hello: {
    string: string;
    num: number;
  };
  helloCallback: {
    result: boolean;
  };
  createColorGrid: {
    step: number;
    hue: number;
    saturationMin: number;
    saturationMax: number;
    brightnessmin: number;
    brightnessmax: number;
  };
  createColorGridCallback: {
    result: boolean;
  };
}
