import { app } from './app';

const port: number = 8081;
const allowedUrl: string = `http://localhost:4200`;

app.use(function (_req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', allowedUrl);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

require('./api/event')(app);
