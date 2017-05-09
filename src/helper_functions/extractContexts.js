function extractContexts(contexts, intent) {
  if (intent === 'brexit' || intent === 'tuitionFees') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    console.log('contexts are ', contexts);
    console.log('contextszero is', contexts[0]);
    const contextzero = contexts[0];
    console.log('contextzero param', contextzero.parameters);
    console.log(contextzero.parameters.Parties);
    return parameter + intent;
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
