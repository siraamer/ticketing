import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../app';

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY! = 'amji';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //? Build JWT Payload {id, email}
  const payload = {
    id: 'uewld213kl',
    email: 'yase@yahoo.com',
  };
  //? Create The JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //? Build Session Object
  const session = { jwt: token };
  //? Turn That Session Into JSON
  const sessionJSON = JSON.stringify(session);
  //? Take JSON And Encode It as Base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  //? Return a String Thats The Cookie With The Encoded Data
  return [`session=${base64}`];
};
