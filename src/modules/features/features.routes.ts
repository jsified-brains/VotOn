import { Router } from 'express';
import * as featureApi from './feature-api';

const FeatureRoutes = Router();

FeatureRoutes.post('', featureApi.add );
FeatureRoutes.get('', featureApi.get);
FeatureRoutes.get('/:id', featureApi.getById);

export default FeatureRoutes;