import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { equal } from 'assert';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3000;

app.get('/taxis', async(req: any, res: any) => {

  const { plate, page = 1, limit = 10 } = req.query;

  const pageInt = parseInt(page);  // Convertir a número para paginación
  const limitInt = parseInt(limit);

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

