import { Router } from 'express';
import * as pollTemplateApi from './pollTemplate-api';

const PollTemplateRoutes = Router();

PollTemplateRoutes.post('', pollTemplateApi.add );
PollTemplateRoutes.get('', pollTemplateApi.get);
PollTemplateRoutes.get('/:id', pollTemplateApi.getById);

export default PollTemplateRoutes;