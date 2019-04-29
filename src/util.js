import UAParser from "ua-parser-js";

const parser = new UAParser();
const deviceType = parser.getDevice().type;

export const isPC = () => deviceType !== "mobile" && deviceType !== "tablet";
