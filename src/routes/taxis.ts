import { Router} from "express";
import {getTaxis} from '../controllers/taxis';


const defaultRoute = Router();

defaultRoute.get('/', getTaxis);

export default defaultRoute;