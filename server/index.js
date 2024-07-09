const app = require('./src/app');
const fs = require('fs')
const https = require('https');
const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`Listening: http://localhost:${port}`);
//   /* eslint-enable no-console */
// });


https.createServer({
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem")
}, app).listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: https://localhost:${port}`);
  /* eslint-enable no-console */
});