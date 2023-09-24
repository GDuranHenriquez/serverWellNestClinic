const { Router } = require('express');
const { postPlan } = require('../controllers/plan/postPlan');
const { getPlan } = require('../controllers/plan/getPlan')

const planRouter = Router();
planRouter.post('/', postPlan);
planRouter.get('/', getPlan);

module.exports = planRouter;