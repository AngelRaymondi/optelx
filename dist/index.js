"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cli_color_1 = __importDefault(require("cli-color"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./config/router"));
const screenshot_desktop_1 = __importDefault(require("screenshot-desktop"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const { PORT } = process.env;
const app = (0, express_1.default)();
const router = (0, router_1.default)({
    routesDir: "./routes/",
    indexFilename: (file) => ["index.js", "index.ts"].includes(file),
});
const IMAGES_DIR = "src/screenshots";
async function asyncInterval(callback, interval) {
    let running = true;
    while (running) {
        const startTime = Date.now();
        let timeoutId;
        const promise = new Promise((resolve) => {
            timeoutId = setTimeout(() => {
                resolve(callback());
            }, interval);
        });
        try {
            await promise;
            clearTimeout(timeoutId);
        }
        catch (error) {
            clearTimeout(timeoutId);
        }
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        if (elapsedTime < interval) {
            await new Promise((resolve) => setTimeout(resolve, interval - elapsedTime));
        }
    }
}
app.use(express_1.default.json({
    limit: "5mb",
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "5mb",
}));
app.use(router);
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "./views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "./public/")));
console.clear();
app.listen(PORT, async () => {
    console.log(cli_color_1.default.yellow(`🎉 OptelX running on port ${PORT}`));
    asyncInterval(async () => {
        const b = await (0, screenshot_desktop_1.default)({ format: "png" });
        fs_1.default.writeFileSync(path_1.default.join(IMAGES_DIR, "s"), b);
    }, .75 * 1000);
    // console.log(clc.cyan("Waiting for quick tunnel URL"));
    // const { data: ip } = await axios.get("https://ipv4.icanhazip.com");
    // const subdomain = `optelx-${ip.split(".").join("-").trim()}`;
    // const tunnel = await localtunnel({
    //   port: parseInt(PORT),
    //   subdomain
    // });
    // console.log(clc.greenBright(`🎉 Quick tunnel: ${tunnel.url}`));
});
