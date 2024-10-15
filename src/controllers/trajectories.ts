import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getTrajectories =  async(req:Request , res:Response) => {
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
 };

 export const getTrajectoriesLatest = async(req:Request , res:Response) => {
    const lastUbication = await prisma.trajectories.findMany({
      distinct: ['taxi_id'], 
      orderBy: {
        date: 'desc'
      },
    });
  res.status(200).json(lastUbication);
  
  };


  function convertirFecha(fechaString: string) {
    const [day, month, year] = fechaString.split('-').map(Number);
    return new Date(year, month - 1, day);  
  };