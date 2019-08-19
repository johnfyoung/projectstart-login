# projectstart-login

This is a Node.js project starter for an API with a remote login.

## Server

Built on `express`, using a `passport` `JWT` strategy. The app expects eslint to be installed globally. It also requires a `keys_dev.js` in the `config` directory:

```javascript
const keys = {
  mongoURI: "mongodb://<dbuser>:<dbpass>@<db url>:<db port>/<db name>",
  secretOrKey: "some random garbage"
};

export default keys;
```

## Client

Built on `react` and `redux`. The client requires the Redux DevTools to be installed in the browser.
