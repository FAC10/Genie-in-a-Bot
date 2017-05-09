function extractContexts(contexts, intent, cb) {
  if (intent === 'brexit') {
    let result;
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    cb(parameter + context, (err, res) => {
      if (err) {
        return err;
      }
      console.log('res.rows is ', res.rows[0]);
      result = res.rows[0];
    });
    return result;
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
