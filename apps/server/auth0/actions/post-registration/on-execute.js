// apps/server/auth0/actions/post-registration/on-execute.js

// ACTION: Create app_user
const axios = require('axios');

/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 */
exports.onExecutePostUserRegistration = async (event, api) => {
  await axios.post(
    'https://f4a5-67-176-146-228.ngrok-free.app/api/app-users/register',
    {
      params: {
        authId: event.user.user_id,
        firstName: event.user.given_name,
        lastName: event.user.family_name,
        username: event.user.email,
        email: event.user.email,
        picture: event.user.picture,
        // local: event.user.locale,
      },
    }
  );
};
