function extractContexts(contexts, intent, cb) {
  if (intent === 'brexit') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    return cb(parameter + context, (err, res) => {
      if (err) {
        return err;
      }
      console.log('res.rows is ', res.rows[0]);
      console.log('partyname is ', res.rows[0].party);
      return res.rows[0];
    });
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
