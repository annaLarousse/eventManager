import fs from 'fs';
import { Express, Request, Response } from 'express';
import { IEvent } from '../models/event';

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

  app.post('/event', (req: Request, res: Response) => {
    const newEvent: IEvent = req.body;
    if (newEvent?.name?.length > 32) {
      res.status(400).json('Event name cannot exceed 32 characters');
    } else {
      res.contentType('text/plain');
      let data = getEventsFromJSONFile();
      const dataLength: number = !data
        ? 0
        : Object.keys(JSON.parse(data))?.length;
      const newId: number = dataLength + 1;
      data = !data ? {} : JSON.parse(data);

      newEvent.id = newId;
      (data[newEvent.id] as Object) = newEvent;

      data = JSON.stringify(data, undefined, 2);
      fs.writeFileSync(dataFilePath, data);

      res.writeHead(201);
      res.end(newId.toString());
    }
  });
};

function getEventsFromJSONFile(): string {
  return fs.readFileSync(dataFilePath, 'utf8');
}
