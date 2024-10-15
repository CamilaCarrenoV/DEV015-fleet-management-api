import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//import { equal } from 'assert';
import  taxiRoute from './routes/taxis';
import trajectoriesRoute from './routes/trajectories';


const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3000;

app.use('/taxis', taxiRoute);
app.use('/trajectories', trajectoriesRoute);

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

