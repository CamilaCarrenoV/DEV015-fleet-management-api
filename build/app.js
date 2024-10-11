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
const taxis_1 = __importDefault(require("./routes/taxis"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = 3000;
app.use('/taxis', taxis_1.default);
/*app.get('/taxis', async(req:Request , res:Response ) => {

  const { plate, page = 1, limit = 10 } = req.query as any;

  const pageInt = parseInt(page);  // Convertir a número para paginación
  const limitInt = parseInt(limit);

  if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
    return res.status(400).json({ error: "page or limit is not valid" });
  }

  const where = plate ? { plate: { equals: plate } } : {};


  const taxis = await prisma.taxis.findMany({
    where,
    skip: (pageInt - 1) * limitInt,  // Saltar los registros según la página
    take: limitInt                   // Limitar el número de registros
});

    res.json(taxis);
});*/
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
function convertirFecha(fechaString) {
    const [day, month, year] = fechaString.split('-').map(Number);
    return new Date(year, month - 1, day);
}
app.get('/trajectories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get('/trajectories/latest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lastUbication = yield prisma.trajectories.findMany({
        distinct: ['taxi_id'],
        orderBy: {
            date: 'desc'
        },
    });
    res.status(200).json(lastUbication);
}));
