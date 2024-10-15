import { Router} from "express";
import { getTrajectories, getTrajectoriesLatest } from "../controllers/trajectories";


const defaultRoute = Router();

defaultRoute.get('/', getTrajectories);
defaultRoute.get('/latest', getTrajectoriesLatest);

export default defaultRoute;