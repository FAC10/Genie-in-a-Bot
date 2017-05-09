const test = require('tape');
const request = require('supertest');
const routes = require('../src/routes/home.js');
const app = require('../src/webhook.js');
const constructLocal = require('../src/helper_functions/findLocalReply.js');
const constructAnswers = require('../src/helper_functions/answer_objects.js');
// const server = require('../webhook.js');

test('Passing test for travis', (t) => {
  t.plan(1);
  t.equal(1, 1, '1 is equal to 1');
  t.end();
});


test('constructLocal function returns expected result for Parties intent', (t) => {
  t.plan(2);
  const answer_objects = constructAnswers('Maja');
  const testObject = constructLocal.constructLocal(1, 'Parties', answer_objects);
  const expectedId = 1;
  const actualId = testObject.recipient.id;

  const actualMessage = testObject.message;
  const expectedMessage = {

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
        title: 'Green',
        payload: 'party_votes',
      },
      {
        content_type: 'text',
        title: 'SNP',
        payload: 'party_votes',
      },
    ],
  };

  t.equal(actualId, expectedId, 'constructLocal function returns an object with the correct sender id for Parties intent');
  t.deepEqual(actualMessage, expectedMessage, 'constructLocal function returns an object with the correct message object for Parties intent');
  t.end();
});


test('constructLocal function returns expected result for FACEBOOK_WELCOME intent', (t) => {
  t.plan(3);
  const dummy = {};
  const answer_objects = constructAnswers(dummy, 'Maja');
  const testObject = constructLocal.constructLocal(2, 'FACEBOOK_WELCOME', answer_objects);
  const expectedGreeting = 'Hey Maja, I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering and more!';
  const actualGreeting = testObject.message.attachment.payload.text;
  const expectedId = 2;
  const actualId = testObject.recipient.id;
  const actualMessage = testObject.message;
  const expectedMessage = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Hey Maja, I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering and more!',
        buttons: [
          {
            type: 'postback',
            title: 'Candidates',
            payload: 'Candidates',
          },
          {
            type: 'postback',
            title: 'Parties',
            payload: 'Parties',
          },
        ],
      },
    },
  };

  t.equal(actualGreeting, expectedGreeting, 'constructLocal function returns the correct greeting with the correct name for FACEBOOK_WELCOME intent');
  t.equal(actualId, expectedId, 'constructLocal function returns an object with the correct sender id for FACEBOOK_WELCOME intent');
  t.deepEqual(actualMessage, expectedMessage, 'constructLocal function returns an object with the correct message object for FACEBOOK_WELCOME intent');
  t.end();
});


test.onFinish(() => process.exit(0));
