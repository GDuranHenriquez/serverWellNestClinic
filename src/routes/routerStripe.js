const { Router } = require('express');
const { postPayMethod } = require('../controllers/Stripe/postStripe');



const stripe = Router();

stripe.post('/PaymentMethod', postPayMethod);

module.exports = stripe;
