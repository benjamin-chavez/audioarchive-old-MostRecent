// apps/server/auth0/actions/post-login/create-app-user/on-execute.js

// ACTION: Create app_user from SSO

const axios = require('axios');

/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  if (
    event.stats.logins_count === 1 &&
    event.connection.strategy === event.connection.name
  ) {
    await axios.post(
      'https://f4a5-67-176-146-228.ngrok-free.app/api/app-users/register',
      {
        authId: event.user.user_id,
        firstName: event.user.given_name,
        lastName: event.user.family_name,
        username: event.user.email,
        email: event.user.email,
        picture: event.user.picture,
        // local: event.user.locale,
      }
    );
  }
};

/**
 * Handler that will be invoked when this action is resuming after an external redirect. If your
 * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
// exports.onContinuePostLogin = async (event, api) => {
// };
