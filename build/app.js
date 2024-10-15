"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const taxis_1 = __importDefault(require("./routes/taxis"));
const trajectories_1 = __importDefault(require("./routes/trajectories"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = 3000;
app.use('/taxis', taxis_1.default);
app.use('/trajectories', trajectories_1.default);
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
/*function convertirFecha(fechaString: string) {
  const [day, month, year] = fechaString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

app.get('/trajectories', async(req, res) => {
   const { taxiId, date } = req.query as any;

   try {
    // Convertir la fecha del formato "DD-MM-YYYY" a objeto Date
    const inicioDelDia = convertirFecha(date);
    const finDelDia = new Date(inicioDelDia);
    finDelDia.setHours(23, 59, 59, 999);

    // Consultar las ubicaciones en la base de datos
    const ubicaciones = await prisma.trajectories.findMany({
      where: {
        taxi_id: { equals: parseInt(taxiId)},
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
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: 'Error al consultar las ubicaciones.', error });
  }
});

app.get('/trajectories/latest', async(req, res) => {
  const lastUbication = await prisma.trajectories.findMany({
    distinct: ['taxi_id'],
    orderBy: {
      date: 'desc'
    },
  });
res.status(200).json(lastUbication);

});*/
