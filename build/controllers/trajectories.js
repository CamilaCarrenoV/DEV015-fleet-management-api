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
exports.getTrajectoriesLatest = exports.getTrajectories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taxiId, date } = req.query;
    try {
        // Convertir la fecha del formato "DD-MM-YYYY" a objeto Date
        const inicioDelDia = convertirFecha(date);
        const finDelDia = new Date(inicioDelDia);
        finDelDia.setHours(23, 59, 59, 999);
        // Consultar las ubicaciones en la base de datos
        const ubicaciones = yield prisma.trajectories.findMany({
            where: {
                taxi_id: { equals: parseInt(taxiId) },
                date: {
                    gte: inicioDelDia,
                    lte: finDelDia,
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        // Verificar si se encontraron resultados
        if (ubicaciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ubicaciones para este taxi en la fecha proporcionada.' });
        }
        // Devolver las ubicaciones
        res.status(200).json(ubicaciones);
    }
    catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error al consultar las ubicaciones.', error });
    }
});
exports.getTrajectories = getTrajectories;
const getTrajectoriesLatest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lastUbication = yield prisma.trajectories.findMany({
        distinct: ['taxi_id'],
        orderBy: {
            date: 'desc'
        },
    });
    res.status(200).json(lastUbication);
});
exports.getTrajectoriesLatest = getTrajectoriesLatest;
function convertirFecha(fechaString) {
    const [day, month, year] = fechaString.split('-').map(Number);
    return new Date(year, month - 1, day);
}
;
