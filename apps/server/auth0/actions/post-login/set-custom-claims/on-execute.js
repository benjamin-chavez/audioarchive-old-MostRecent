// apps/server/auth0/actions/post-login/set-custom-claims/on-execute.js

// ACTION: Add user metadata to tokens

/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */

exports.onExecutePostLogin = async (event, api) => {
  // const namespace = 'http://localhost:3000';
  const { id, first_name, last_name, username } = event.user.user_metadata;

  if (event.authorization) {
    // Set claims
    // api.idToken.setCustomClaim(`${namespace}/first_name`, first_name);
    api.idToken.setCustomClaim(`id`, id);
    api.idToken.setCustomClaim(`first_name`, first_name);
    api.idToken.setCustomClaim(`last_name`, last_name);
    api.idToken.setCustomClaim(`username`, username);
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
