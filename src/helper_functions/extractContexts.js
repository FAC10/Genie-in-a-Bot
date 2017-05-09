function extractContexts(contexts, intent) {
  if (intent === 'brexit' || intent === 'tuitionFees') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    return parameter + context;
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
