// apps/server/src/services/stripe.service.ts

import {
  AppUser,
  AppUserWithProducts,
  Product,
  ProductSchema,
} from '@shared/src/schemas';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import AppUserModel from '../models/app-user.model';
import ProductService from './productService';
import S3Service from './s3.service';
import AppUserService from './app-user.service';
import TransactionError from 'knex';
import Stripe from 'stripe';
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class StripeService {
  static async createProduct(product: Product) {
    const stripeProduct = await stripe.products.create({
      name: 'Gold Special',
      metadata: {
        appProductId: product.id,
      },
    });
  }
}
