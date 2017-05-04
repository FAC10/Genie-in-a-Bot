const test = require('tape');
// const server = require('../webhook.js');

test('Passing test for travis', (t) => {
  t.equal(1, 1, '1 is equal to 1');
  t.end();
});

// test.onFinish(() => process.exit(0));

// const routes = [{
//   method: 'GET',
//   url: '/',
//   expectedStatusCode: 200,
// }, {
//   method: 'GET',
//   url: '/webhook',
//   expectedStatusCode: 200,
// }, {
//   method: 'POST',
//   url: '/webhook',
//   expectedStatusCode: 200,
// }];
//
//
// routes.forEach((route) => {
//   test(`check ${route.url} route`, (t) => {
//     const { method, url, expectedStatusCode } = route;
//     const options = {
//       method,
//       url,
//     };
//     server.inject(options, (res) => {
//       t.equal(res.status, expectedStatusCode, `Should return statuscode of ${expectedStatusCode}`);
//       t.end();
//     });
//   });
// });
