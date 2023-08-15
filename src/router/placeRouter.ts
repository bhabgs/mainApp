import { Router } from 'vue-router';

let router: Router;

export const setRouter = (r: Router) => (router = r);

export const getRouter = () => router;
