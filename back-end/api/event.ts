import fs from 'fs';
import { Express, Request, Response } from 'express';
import { IEvent } from '../models/event';
import { IApiResponse } from '../models/apiResponse';

const dataFilePath: string = __dirname + '/../data/' + 'events.json';
module.exports = (app: Express) => {
  app.get('/events', (_req: Request, res: Response) => {
    res.contentType('application/json');
    const data: string = getEventsFromJSONFile();
    if (!data || !Object.keys(JSON.parse(data)).length)
      res.status(404).json('No events found!');
    else {
      res.status(200);
      res.end(data);
    }
  });

  app.post('/event', (req: Request, res: Response) => {
    res.contentType('application/json');
    let apiResponse: IApiResponse = {
      status: 201,
      message: 'Event added successfully!',
    };
    const newEvent: IEvent = {
      id: -1,
      name: req.body.name ? `${req.body.name}` : '',
      description: req.body.description ? `${req.body.description}` : '',
      startDate: req.body.startDate ? `${req.body.startDate}` : '',
      endDate: req.body.endDate ? `${req.body.endDate}` : '',
    };

    const errorMessage = doValidation(newEvent);
    if (errorMessage) {
      apiResponse = {
        status: 400,
        message: errorMessage,
      };
    }
    if (apiResponse.status !== 400) {
      res.contentType('text/plain');
      let dataString = getEventsFromJSONFile();
      const data = dataString ? JSON.parse(dataString) : {};
      const dataLength: number = Object.keys(data).length;
      const newId: number = dataLength + 1;

      newEvent.id = newId;
      (data[newEvent.id] as Object) = newEvent;

      dataString = JSON.stringify(data, undefined, 2);
      fs.writeFileSync(dataFilePath, dataString);
      apiResponse = {
        status: 201,
        message: 'Event added successfully!',
      };
    }
    res.writeHead(apiResponse.status);
    res.end(JSON.stringify(apiResponse));
  });
};

function getEventsFromJSONFile(): string {
  return fs.readFileSync(dataFilePath, 'utf8');
}

function doValidation(data: IEvent): string | null {
  if (!isValidDate(data.startDate)) {
    return 'Start date must be a valid date.';
  }
  if (!isValidDate(data.endDate)) {
    return 'End date must be a valid date.';
  }
  if (!data.name) {
    return 'Name must be set.';
  }
  if (data.name.length > 32) {
    return 'Event name cannot exceed 32 characters.';
  }
  if (data.endDate <= data.startDate) {
    return 'The end date have to be after the start date.';
  }
  return null;
}

function isValidDate(dateString: string): boolean {
  return !!Date.parse(dateString);
}
