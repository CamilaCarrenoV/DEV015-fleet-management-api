"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxis_1 = require("../controllers/taxis");
const defaultRoute = (0, express_1.Router)();
defaultRoute.get('/', taxis_1.getTaxis);
exports.default = defaultRoute;
