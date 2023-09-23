"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_version = exports.last_commit = void 0;
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const exec = (0, util_1.promisify)(child_process_1.default.exec);
const CONFIG_FILE_ROUTE = path_1.default.join(path_1.default.dirname(require.main.filename), "project.json");
const l_ = async () => new Promise(async (resolve) => {
    if (!fs_1.default.existsSync(CONFIG_FILE_ROUTE)) {
        const version = (await exec("npm run last", {
            windowsHide: true,
        })).stdout.split("\n")[4];
        fs_1.default.writeFileSync(CONFIG_FILE_ROUTE, JSON.stringify({
            version: version,
        }));
        return resolve(version);
    }
    else {
        return resolve(require(CONFIG_FILE_ROUTE).version);
    }
});
exports.last_commit = l_;
const new_version = (last_version) => {
    const last_commit = last_version; //Prisma vx.x.x
    const version_string = last_commit.slice("OptelX v".length);
    const version = parseInt(version_string.split(".")[0]);
    const sub_version = parseInt(version_string.split(".")[1]);
    const sub_sub_version = parseInt(version_string.split(".")[2]);
    const final_version_array = [];
    if (sub_sub_version + 1 === 10) {
        if (sub_version + 1 === 10) {
            final_version_array.push(version + 1, 0, 0);
        }
        else {
            final_version_array.push(version, sub_version + 1, 0);
        }
    }
    else {
        final_version_array.push(version, sub_version, sub_sub_version + 1);
    }
    const final_version_string = final_version_array.join(".");
    return final_version_string;
};
exports.new_version = new_version;
