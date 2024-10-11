import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { equal } from 'assert';
import  taxiRoute from './routes/taxis';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3000;

app.use('/taxis', taxiRoute);

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

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});



function convertirFecha(fechaString: string) {
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

});
