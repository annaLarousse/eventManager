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
  it('should return status 201 when creation completed successfully', () => {});
  it('should return the id of the new element after creation completed successfully', () => {});
});
