// apps/server/src/routes/consumer-worker.ts
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
import { Event } from '@shared/src';
import { connect, Channel, Connection } from 'amqplib';
import knex from '../config/database';
import Stripe from 'stripe';
import OrderService from '../services/order.service';
import { generateRandomBytes } from '../lib/utils';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CONN = 'amqp://localhost';
let channel: Channel | null = null;
let connection: Connection | null = null;

async function handleStripeEvent(event: Event) {
  console.log('Handling Stripe Event');

  switch (event.type) {
    case 'account.updated':
      console.log('ACCOUNT UPDATED EVENT PROCESSING');

      const {
        id: stripeAccountId,
        chargesEnabled,
        payoutsEnabled,
        detailsSubmitted,
      } = event.data.object;

      const newAccountData = {
        chargesEnabled,
        payoutsEnabled,
        detailsSubmitted,
      };

      // const stripeAccountId = event.data.object.id;
      const updatedAccount = await knex('accounts')
        .where({ stripeAccountId })
        .update(newAccountData);

      // TODO: SEE IF YOU CAN SEND A MESSAGE TO THE FRONTEND TO INVALIDATE THE ACCOUNTS CACHE
      break;
    case 'customer.created':
      console.log('CUSTOMER CREATED EVENT PROCESSING');
      break;

    case 'checkout.session.completed':
      console.log('CHECKOUT.SESSION.COMPLETED');
      const checkoutSession = event.data.object;

      // TODO: If a bug shows up here, you might need to re-GET the status from the stripe api

      await OrderService.updateByCheckoutSessionId(checkoutSession.id, {
        // @ts-ignore
        stripePaymentIntentId: checkoutSession.paymentIntent,
        paymentStatus: checkoutSession.paymentStatus,
      });

      // fulfillOrder(lineItems);
      // TODO: Sending the customer a receipt email <= i think this is handled by stripe?

      // TODO: Create New Cart.

      // TODO: Payout/transfer payment percentage to seller account.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        // { expand: ['line_items'] }
        { expand: ['line_items.data.price.product'] }
      );
      // console.log(sessionWithLineItems);
      const lineItems = sessionWithLineItems.line_items?.data;
      // console.log('HERE');
      // @ts-ignore
      // console.log(sessionWithLineItems.metadata.productToAccountMapping);
      // const productToAccountMapping =
      //   sessionWithLineItems.metadata?.productToAccountMapping;
      // console.log(typeof lineItems);
      // console.log(lineItems);
      // console.log('');

      const paymentIntent = await stripe.paymentIntents.retrieve(
        checkoutSession.paymentIntent
      );
      const chargeId = paymentIntent.latest_charge;
      // console.log('chargeId', chargeId);
      // console.log('productToAccountMapping', productToAccountMapping);

      lineItems?.forEach(async (item) => {
        // console.log(item);
        // console.log(item.price?.unit_amount);
        // @ts-ignore
        // const productId = item.price?.product?.id;
        // console.log('productId', productId);

        // @ts-ignore
        const stripeAccountId = productToAccountMapping[productId];

        if (item.price?.unit_amount) {
          const transfer = await stripe.transfers.create({
            // amount: paymentIntent.amount,
            amount: item.price.unit_amount,
            currency: 'usd',
            // @ts-ignore
            source_transaction: chargeId,
            destination: 'acct_1O9hCGQoPQmuq40j',
          });
        }
      });

      break;
    case 'checkout.session.expired':
      console.log('CHECKOUT.SESSION.EXPIRED: ');
      break;

    // TODO: NOT SURE IF I NEED THE FOLLOWING CASE OR NOT:
    case 'payment_intent.created':
      console.log('PAYMENT_INTENT.CREATED: ');
      break;

    case 'payment_intent.succeeded': {
      // TODO: Payout/transfer payment percentage to seller account.
      console.log(`PAYMENT INTENT SUCCEEDED`);

      const paymentIntent = event.data.object;

      // const order = await OrderService.getBy(
      //   'stripePaymentIntentId',
      //   paymentIntent.id
      // );

      // console.log(paymentIntent);
      // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      //   order.stripeCheckoutSessionId,
      //   { expand: ['line_items'] }
      // );
      // console.log(sessionWithLineItems);

      // const lItems = stripe.checkout.sessions.listLineItems(
      //   event.data.object.id,
      //   { limit: 5 }
      //   // function (err, lineItems) {
      //   //   // asynchronously called
      //   // }
      // );
      // console.log(lItems);

      // lineItems.forEach((item) => {
      //   console.log(item);
      // });

      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log(
        `❌ PAYMENT FAILED: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case 'payment_intent.canceled': {
      const paymentIntent = event.data.object;
      console.log('PAYMENT_INTENT.CANCELED');
      break;
    }

    case 'transfer.created':
      console.log('TRANSFER.CREATED');
      break;

    default:
      // console.warn(`Unhandled event type: ${event.type}`);
      console.log(`Unhandled event type: ${event.type}`);
  }
}

//  sudo systemctl status rabbitmq-server
const consumeFromQueue = async () => {
  console.log('consumerfromq()');

  // event.status = 'processing'

  try {
    connection = await connect(CONN);
    channel = await connection.createChannel();

    const queue = 'webhook_queue';
    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      (msg) => {
        if (msg) {
          const rawContent = msg.content.toString();
          try {
            const events = JSON.parse(rawContent);
            const event = events[0];

            if (event.source === 'stripe') {
              handleStripeEvent(event);
            }

            // TODO: not sure if this is the right place to update the status
            // event.status = 'processed'
          } catch (error) {
            console.error('Error parsing message:', error);
          }

          channel?.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    // event.processingErrors += error
    // event.status = 'failed'
    console.error('Error in consumer:', error);
  }
};

// Graceful shutdown
process.on('exit', () => {
  console.log('Closing RabbitMQ Channel and Connection...');
  channel?.close();
  connection?.close();
});

consumeFromQueue();
