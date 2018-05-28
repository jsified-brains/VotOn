import FeatureRoutes from './features/features.routes';
import PollTemplateRoutes from './pollTemplates/pollTemplate.routes';
import * as express from 'express';

function route(route){
    return `/api/v1/${route}`;
}
const AppRoutes  = (app: express.Express) => {
    app.use(route('features'), FeatureRoutes);
    app.use(route('pollTemplates'), PollTemplateRoutes);
}

export default AppRoutes;