import { Router } from 'express';
import OrphanagesController from './controllers/Orphanages.controller';

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', OrphanagesController.create);

export default routes;
