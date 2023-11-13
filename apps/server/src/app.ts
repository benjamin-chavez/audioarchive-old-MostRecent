// apps/backend/src/app.ts

import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import flash from 'express-flash';
import morgan from 'morgan';
import errorHandler from './middleware/errorMiddleware'; // notFoundHandler, // generalErrorHandler,
import routes from './routes/index';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

const baseUrl = process.env.AUTH0_BASE_URL;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

// const corsOptions = {
//   origin: 'http://localhost:3000',
// };

// app.use(cors(corsOptions));

if (!baseUrl || !issuerBaseUrl) {
  throw new Error(
    'Please make sure that the file .env.local is in place and populated'
  );
}

if (!audience) {
  console.log(
    'AUTH0_AUDIENCE not set in .env.local. Shutting down API server.'
  );
  process.exit(1);
}

app.use(morgan('dev'));
app.use(helmet());
// TODO: CHANGE CORS BACK
// app.use(cors({ origin: baseUrl }));
app.use(cors({ origin: '*' }));

// app.use(express.json());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: (req, res, buf) => {
      // @ts-ignore
      if (req.originalUrl.startsWith('/api/webhook')) {
        // @ts-ignore
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// app.use((req, res, next) => {
//   console.log('Request Headers: ', req.headers);
//   next();
// });

app.use('/api', routes);

// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('Invalid token');
//   } else {
//     // handle other types of errors or pass them on
//     next(err);
//   }
// });
app.use(errorHandler);

export default app;
