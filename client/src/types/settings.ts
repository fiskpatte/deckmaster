export interface Settings {
  vesselId: string;
  bumperToBumperDistance: number;
  defaultVCG: number;
}

export const settingsFactory = (): Settings => ({
  vesselId: "undefined",
  bumperToBumperDistance: 0,
  defaultVCG: 0,
});
