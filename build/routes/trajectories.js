"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectories_1 = require("../controllers/trajectories");
const defaultRoute = (0, express_1.Router)();
defaultRoute.get('/', trajectories_1.getTrajectories);
defaultRoute.get('/latest', trajectories_1.getTrajectoriesLatest);
exports.default = defaultRoute;
