// apps/server/src/services/stripe.service.ts

import { Product } from '@shared/src/schemas';
// import { convertDollarsToCents } from '../lib/utils';

import Stripe from 'stripe';
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function convertDollarsToCents(price: number) {
  // const priceInCents = Math.round(price * 100);
  // return priceInCents;
  return Math.round(price * 100);
}

class StripeService {
  // static async createProduct(product: Omit<Product, 'id' | 'tripeProductId'>) {
  static async createProduct(product: Partial<Product>) {
    // TODO: Error handling

    const stripeProduct = await stripe.products.create({
      // @ts-ignore
      name: product.name,
      description: product.description,
      // metadata: {
      //   appProductId: product.id,
      // },
    });
    console.log('stripeProduct', stripeProduct);

    await this.createPrice(product, stripeProduct.id);

    return stripeProduct.id;
  }

  static async createPrice(
    // product: Omit<Product, 'id'>,
    product: Partial<Product>,
    stripeProductId: string
  ) {
    // TODO: Error handling
    // @ts-ignore
    const priceInCents = convertDollarsToCents(product.price);
    const stripePrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: priceInCents,
      currency: 'usd',
    });

    return stripePrice;
  }

  static async getProducts() {
    // TODO: Error handling
    const stripeProducts = await stripe.products.list({});

    return stripeProducts;
  }

  // static async getOrCreateProduct() {}

  static async deleteProduct(product: Product) {
    // TODO: Error handling
    // TODO: Delete associated prices
    const deletedProduct = await stripe.products.del(product.stripeProductId);

    return deletedProduct;
  }
}

export default StripeService;
