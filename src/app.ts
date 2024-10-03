import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { equal } from 'assert';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3000;

app.get('/taxis', async(req:Request , res:Response ) => {

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
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

app.get('trajectories', async(req: , res:) => {
    const taxiInt = parseInt(taxiId);
    const dateInt = parseInt(date);

    const where = 
})