const get = require('../database/get_data');

function extractContexts(senderID, intent) {
  get.party(senderID, (err, res) => {
    if (err) {
      return err;
    }
    console.log(res + intent);
    const partyKey = res + intent;
    return partyKey;
  });
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
