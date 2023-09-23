"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../config/router");
const fs_1 = __importDefault(require("fs"));
const IMAGE_PATH = "src/screenshots/s";
exports.default = new router_1.Route({
    method: "GET",
    handler(req, res) {
        return res.send(fs_1.default.readFileSync(IMAGE_PATH).toString('base64'));
    },
});
