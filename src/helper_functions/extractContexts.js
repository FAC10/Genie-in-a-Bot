function extractContexts(contexts, intent, cb) {
  if (intent === 'brexit') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    console.log('key we are sending is ', parameter + context);
    cb(parameter + context, (err, res) => {
      if (err) {
        return err;
      }
      console.log('anonymous bit is ', res.rows[0].anonymous);
      return res.rows[0];
    });
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
