# AudioArchive

https://stackoverflow.com/questions/74537841/is-redux-toolkit-compatible-with-next-13-new-app-directories
https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
https://redux-toolkit.js.org/tutorials/typescript
https://github.com/wpcodevo/nextjs13-redux-toolkit/blob/main/src/app/layout.tsx


https://www.reddit.com/r/nextjs/comments/qaur3v/auth0_nextjs_management_api/


Auth0: https://auth0.github.io/nextjs-auth0/index.html

SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'audio_archive_development';
10080


https://community.auth0.com/t/how-do-i-force-the-universal-login-to-allow-the-user-to-select-a-gmail-account/72655/9


 stripe listen --forward-to localhost:5000/api/webhook/stripe --forward-connect-to localhost:5000/api/webhooks/stripe
STRIPE:
stripe listen --forward-
to localhost:3000/webhooks/stripe

STRIPE MAGIC STRINGS: https://stripe.com/docs/connect/testing
Jenny Rosen
01/01/1901
address_full_match
+1 0000000000
0000




<!-- TODO:  -->
 - Fix-up/review the product s3ImageUrl logic so that a user never gets a cached response that includes a stale signed s3ImageUrl. Reduce the s3 expires in logic to test this.
 - Think about this problem for SEO:Update Internal Links: When a URL changes, update all internal links pointing to the old URL to point to the new URL directly.
 - Look at step 4 of the [Fulfill orders with Checkout](https://stripe.com/docs/payments/checkout/fulfill-orders) docs. Determine if you will be handling any of those payment methods and add delayed notification payment handling if so.
 - Go live and website checkilists: https://stripe.com/docs/development/checklist
 - Link at adding idempotencKeys to stripe requests: [idempotent_requests](https://stripe.com/docs/api/idempotent_requests)


<!--  -->
 --> customer.updated [evt_1OBXMfJiRcfe15ltX3uRPsvD]
2023-11-12 00:41:49  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXMfJiRcfe15ltX3uRPsvD]
2023-11-12 00:41:49   --> charge.succeeded [evt_3OBXMdJiRcfe15lt0XeQ3sKP]
2023-11-12 00:41:49  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_3OBXMdJiRcfe15lt0XeQ3sKP]
2023-11-12 00:41:49   --> payment_intent.succeeded [evt_3OBXMdJiRcfe15lt0Ow16mEx]
2023-11-12 00:41:49  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_3OBXMdJiRcfe15lt0Ow16mEx]
2023-11-12 00:41:49   --> payment_intent.created [evt_3OBXMdJiRcfe15lt0gMC1nQy]
2023-11-12 00:41:49  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_3OBXMdJiRcfe15lt0gMC1nQy]
2023-11-12 00:41:49   --> checkout.session.completed [evt_1OBXMfJiRcfe15lti89WpM3A]
2023-11-12 00:41:49  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXMfJiRcfe15lti89WpM3A]
2023-11-12 00:43:24   --> checkout.session.expired [evt_1OBXOCJiRcfe15ltJHgXBCA5]
2023-11-12 00:43:24  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXOCJiRcfe15ltJHgXBCA5]
2023-11-12 00:43:30   --> checkout.session.expired [evt_1OBXOIJiRcfe15ltzphXha0a]
2023-11-12 00:43:30  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXOIJiRcfe15ltzphXha0a]
2023-11-12 00:43:42   --> checkout.session.expired [evt_1OBXOUJiRcfe15ltj2ouJ3tj]
2023-11-12 00:43:42  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXOUJiRcfe15ltj2ouJ3tj]
2023-11-12 00:43:48   --> checkout.session.expired [evt_1OBXOZJiRcfe15ltlQcj4q9f]
2023-11-12 00:43:48  <--  [200] POST http://localhost:5000/api/webhook/stripe [evt_1OBXOZJiRcfe15ltlQcj4q9f]
# audioarchive


console.log(
        'sessionWithLineItems',
        JSON.stringify(sessionWithLineItems, null, 2)
      );


https://stripe-camo.global.ssl.fastly.net/fa04a84f8f505671f7dac761055f2edf3860b2a84aa15cbceb93cb54915dfcdf/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6479793867373661762f696d6167652f75706c6f61642f76313538383632313031372f416d696e63686176657a2e636f6d2d7468756d626e61696c5f6979717230632e706e67
