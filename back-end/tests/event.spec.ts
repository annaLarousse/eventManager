import fs from 'fs';
import request from 'supertest';
import { app } from '../app';

require('../api/event')(app);

jest.mock('fs');

const mockEvents = {
  '1': {
    'id': 1,
    'name': 'Mock event',
    'description': 'Mock event description',
    'startDate': '2022-04-04T00:0:00.000Z',
    'endDate': '2022-04-05T00:0:00.000Z',
  },
};

describe('GET / events', () => {
  it('should respond with status 200 when there is data', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(
      JSON.stringify(mockEvents)
    );
    const res = await request(app).get('/events');
    expect(res.status).toBe(200);
  });
  it('should respond with status 404 when there is no data', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(null);
    const res = await request(app).get('/events');
    expect(res.status).toBe(404);
  });
  it('should return all elements of the data file', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(
      JSON.stringify(mockEvents)
    );
    const res = await request(app).get('/events');
    expect(res.text).toEqual(JSON.stringify(mockEvents));
  });
});

describe('POST / event', () => {
  const newElementInitialValue = {
    'name': 'Mock event test Post',
    'description': 'Mock event test post description',
    'startDate': '2022-04-04T00:0:00.000Z',
    'endDate': '2022-04-05T00:0:00.000Z',
  };
  let newElement: any = { ...newElementInitialValue };
  afterEach(() => {
    newElement = { ...newElementInitialValue };
  });

  it('should return status 201 when creation completed successfully', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(
      JSON.stringify(mockEvents)
    );
    const res = await request(app).post('/event').send(newElement).then();
    expect(res.status).toBe(201);
  });

  it('should return status 400 when name property exceed 32 characters', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(
      JSON.stringify(mockEvents)
    );
    newElement['name'] = 'This event name is really too long';
    const res = await request(app).post('/event').send(newElement).then();
    expect(res.status).toBe(400);
  });

  it('should return status 400 when end date is inferior to the start date', async () => {
    (<jest.Mock>fs.readFileSync).mockReturnValueOnce(
      JSON.stringify(mockEvents)
    );
    newElement['startDate'] = '2022-04-02T20:35:00.484Z';
    newElement['endDate'] = '2022-04-01T20:35:00.484Z';
    const res = await request(app).post('/event').send(newElement).then();
    expect(res.status).toBe(400);
  });
});
