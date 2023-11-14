// apps/server/src/controllers/order.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import MeService from '../services/me.service';
import CustomerService from '../services/stripe-customer.service';
import OrderService from '../services/order.service';
import { Order } from '@shared/src';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createOrder: RequestHandler = asyncHandler(async (req, res) => {
//   // @ts-ignore
//   const authId = req.auth.sub;
// });

export const createCheckout: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);
  const cartItems = req.body;
  const customer = await CustomerService.getCustomerByAppUserId(appUser);
  const order: Order = await OrderService.create({
    appUserId: appUser.id,
  });
  // console.log('cartItems', req.body);

  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        // product: product.stripeProductId,
        product_data: {
          name: item.product.name,
          // images: [item.image],
          // description: item.description,
          metadata: {
            id: item.product.id,
            stripe_product_id: item.product.stripeProductId,
            stripe_account_id: item.product.stripeAccountId,
          },
        },
        // recurring: {
        //   interval: 'month',
        // },
        unit_amount: item.product.price * 100,
      },
      quantity: 1,
    };
  });

  const stripeSession = await stripe.checkout.sessions.create({
    customer: customer.stripeCustomerId,
    mode: 'payment',
    // mode: 'subscription',
    // ui_mode: 'embedded',
    line_items: lineItems,

    automatic_tax: { enabled: true },
    customer_update: {
      address: 'auto',
      shipping: 'auto',
    },
    // subscription_data: {
    //   transfer_data: {
    //     destination: 'acct_1OBstLQpzpp1vjpb',
    //     amount_percent: 95,
    //   },
    // },
    metadata: {
      app_order_id: order.id,
      // productToAccountMapping: JSON.stringify(productToAccountMapping),
    },
    payment_intent_data: {
      metadata: {
        app_order_id: order.id,
      },
    },
    // reciept_email: '' <= TODO: Look into this

    // http://localhost:3000/dashboard/accounts?session_id=cs_test_b1G45KX8hYXJidwcYiMlRlTDps8T5S8RAATT2eu5YywwZ4vwSlZv8RlUoG
    success_url: `${process.env.CLIENT_URL}/dashboard/accounts?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // const newOrder: Order = await OrderService.create({
  //   appUserId: appUser.id,
  //   stripeCheckoutSessionId: stripeSession.id,
  // });

  const newOrder: Order = await OrderService.updateByOrderId(order.id, {
    stripeCheckoutSessionId: stripeSession.id,
  });

  // console.log('newOrder', newOrder);
  if (!newOrder) {
    // "render :new"???
    console.log('render :new???');
  }
  console.log('NEW ORDER CREATED IN ORDER CONTROLLER!!!');

  res
    .status(200)
    .json({ data: stripeSession, message: 'Successfully created cart' });
});
