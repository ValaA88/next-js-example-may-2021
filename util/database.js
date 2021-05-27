// DO NOT COPY
// This is only to simulate something that could
// only run on the server (such as a database
// connection)
// eslint-disable-next-line unicorn/prefer-node-protocol
import fs from 'fs';

//
console.log('we are on the server-side', fs.access);
//
// END OF DO NOT COPY

export const users = [
  { id: '1', firstName: 'Karl', lastName: 'Horky' },
  { id: '2', firstName: 'Andrea', lastName: 'Wöger' },
  { id: '3', firstName: 'Jakob', lastName: 'Steininger' },
];
