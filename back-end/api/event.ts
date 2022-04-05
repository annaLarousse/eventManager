import fs from 'fs';
import { Express, Request, Response } from 'express';

const dataFilePath: string = __dirname + '/../data/' + 'events.json';
module.exports = (app: Express) => {
  app.get('/events', (_req: Request, res: Response) => {
    res.contentType('application/json');
    const data: string = getEventsFromJSONFile();
    if (!data || !Object.keys(JSON.parse(data))?.length)
      res.status(404).json('No events found!');
    else {
      res.status(200);
      res.end(data);
    }
  });
};

function getEventsFromJSONFile(): string {
  return fs.readFileSync(dataFilePath, 'utf8');
}
