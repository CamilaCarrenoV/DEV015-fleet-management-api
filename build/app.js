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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = 3001;
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plate, page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page); // Convertir a número para paginación
    const limitInt = parseInt(limit);
    const where = plate ? { plate: { contains: plate } } : {};
    const taxis = yield prisma.taxis.findMany({
        where,
        skip: (pageInt - 1) * limitInt, // Saltar los registros según la página
        take: limitInt // Limitar el número de registros
    });
    res.json(taxis);
}));
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
//aquí configuro la appi
