export interface Settings {
  vesselId: string;
  bumperToBumperDistance: number;
}

export const settingsFactory = (): Settings => ({
  vesselId: "undefined",
  bumperToBumperDistance: 0.6,
});
