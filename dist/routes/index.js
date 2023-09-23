"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const router_1 = require("../config/router");
const util_1 = require("util");
const exec = (0, util_1.promisify)(child_process_1.default.exec);
const dir = "echo %USERPROFILE%\\Desktop";
exports.default = new router_1.Route({
    method: "GET",
    async handler(req, res) {
        let desktop = "";
        try {
            const { stdout, stderr } = await exec(dir, { windowsHide: true });
            desktop = (stdout + "\n" + stderr.trim()).trim();
        }
        catch { }
        res.render("index", { desktop });
    },
});
