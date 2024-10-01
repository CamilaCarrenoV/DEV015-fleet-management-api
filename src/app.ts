import express, { Application, Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3001;

app.get('/taxis', async(req: any, res: any): Promise<void> => {
  const taxis = await prisma.taxis.findMany()
    res.json(taxis);
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

//aquí configuro la appi
