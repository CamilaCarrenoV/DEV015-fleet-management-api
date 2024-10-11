"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxis = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plate, page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page); // Convertir a número para paginación
    const limitInt = parseInt(limit);
    if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
        return res.status(400).json({ error: "page or limit is not valid" });
    }
    const where = plate ? { plate: { equals: plate } } : {};
    const taxis = yield prisma.taxis.findMany({
        where,
        skip: (pageInt - 1) * limitInt, // Saltar los registros según la página
        take: limitInt // Limitar el número de registros
    });
    res.json(taxis);
});
exports.getTaxis = getTaxis;
