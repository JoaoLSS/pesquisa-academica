import { lazy } from 'react';

const wait = () => new Promise((res) => setTimeout(res, 10000));

export const Login = lazy(() => import('./Login'));
export const MySurvey = lazy(() => wait().then(() => import('./MySurvey')));
export const MySurveys = lazy(() => import('./MySurveys'));
