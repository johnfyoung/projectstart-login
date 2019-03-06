import app from './app';

// Set port to listen to
const port = process.env.PORT || 5000;

// Start listening
export default (app.listen(port));