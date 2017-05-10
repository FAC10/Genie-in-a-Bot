const get = require('../database/get_data');

function extractContexts(senderID, intent) {
  get.party(senderID, (err, res) => {
    if (err) {
      return err;
    }

    console.log(res.rows);

  // const parameter = contexts[0].parameters.Parties;
  // const context = contexts[1].name;
  // return parameter + intent;
  });
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
