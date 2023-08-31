const { Router } = require('express');
const { postPlan } = require('../controllers/plan/postPlan');

const planRouter = Router();
planRouter.post('/', postPlan);

module.exports = planRouter;