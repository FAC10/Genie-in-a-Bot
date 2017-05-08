const test = require('tape');
var request = require('supertest');
var routes = require('../src/routes/home.js');
var app = require('../src/webhook.js');
var multiply = require('../src/helper_functions/testfunction.js');
var constructLocal = require('../src/helper_functions/findLocalReply.js');
var constructAnswers = require('../src/helper_functions/answer_objects.js');
// const server = require('../webhook.js');

test('Passing test for travis', (t) => {
  t.equal(1, 1, '1 is equal to 1');
  t.end();
});

test('Multiply funtion works', (t) => {
  t.equal(multiply(2, 4), 8, '2 times 4 equals 8');
  t.end();

});


test('constructLocal function returns expected result', (t) => {
  const answer_objects = constructAnswers('Maja');
  const testObject = constructLocal.constructLocal(1, 'Parties');
  console.log(answer_objects);
  console.log(testObject);
  var expectedId = 1;
  var actualId = testObject.recipient.id;
  var actualMessage = testObject.message;
  var expectedMessage = {

    text: 'Pick a party you\'re interested in.',
    quick_replies: [
      {
        content_type: 'text',
        title: 'Conservative',
        payload: 'party_votes',
      },
      {
        content_type: 'text',
        title: 'Labour',
        payload: 'party_votes',
      },
      {
        content_type: 'text',
        title: 'Lib Dem',
        payload: 'party_votes',
      },
      {
        content_type: 'text',
        title: 'UKIP',
        payload: 'party_votes',
      },
    ],


  }

  t.equal(actualId, expectedId, 'constructLocal function returns an object with the correct sender id');
  t.deepEqual(actualMessage, expectedMessage , 'constructLocal function returns an object with the correct message object')
  t.end();

})



// test('GET home', function (assert) {
//   request(routes)
//     .get('/')
//     .expect(200)
//     .expect('Content-Type', /html/)
//     .end(function (err, res) {
//       var expectedThings = 'I should be working';
//       var actualThings = res.body;
//
//       assert.error(err, 'No error');
//       assert.same(actualThings, expectedThings, 'Retrieve list of things');
//       assert.end();
//     });
// });


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
