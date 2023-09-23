"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../config/router");
exports.default = new router_1.Route({
    method: "GET",
    async handler(req, res) {
        res.render("screenshot");
    },
});
