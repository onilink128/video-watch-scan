import * as path from "path";
import { IAppConfig } from "./interfaces";

let packageData = require("../../package.json")
let appSettings = require(path.join(process.cwd(), "src", "appSettings.json"));

export let appConfig: IAppConfig = {
    name: packageData.name,
    version: packageData.version,
    appSettings: appSettings
};