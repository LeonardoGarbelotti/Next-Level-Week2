import express from 'express';
import classes_controller from './controllers/classes_controller';
import connections_controller from './controllers/connections_controller';


const routes = express.Router();
const classesController = new classes_controller();
const ConnectionController = new connections_controller();


routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.post('/connections', ConnectionController.create);
routes.get('/connections', ConnectionController.index);

export default routes;