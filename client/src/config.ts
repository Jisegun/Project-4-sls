// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '...'
export const apiEndpoint = `https://0bifmr6cz0.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-k1awb9m8.us.auth0.com',            // Auth0 domain
  clientId: 'IoqGDxKZduUyOxI75wfI5j9H25q7hVRT',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}