import { get } from "./verbs";

const controllerName = "log";

export const getLog = async () => await get(`${controllerName}/voyagelog`);
