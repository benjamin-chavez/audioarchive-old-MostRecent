// src/routes/auth0.ts
import { Router } from 'express';
// import { checkJwt } from '../app';
import { checkJwt } from '../src/middleware/authMiddleware';
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const router = Router();

// This route doesn't need authentication

router.get('/api/public', function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
router.get('/api/private', checkJwt, (req, res) => {
  res.json({
    msg: 'Hello sfrom a private endpoint! You need to be authenticated to see this.',
  });
});

router.get('/api/shows', checkJwt, (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!',
  });
});

// const checkScopes = requiredScopes('read:messages');
// const checkScopes = requiredScopes('openid profile email read:messages');

// router.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
router.get('/api/private-scoped', checkJwt, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
});

// router.get(
//   '/api/private-scoped',
//   checkJwt,
//   requiredScopes('read:messages'),
//   function (req, res) {
//     res.json({
//       message:
//         'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
//     });
//   }
// );

export default router;
