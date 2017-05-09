function extractContexts(contexts) {
  if (contexts[0].name === 'party_votes') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    console.log(parameter + context);
    return parameter + context;
  }
}

module.exports = extractContexts;

// [{ name: 'party_votes',
//   parameters: { Parties: 'Conservative', 'Parties.original': 'Conservative' },
//   lifespan: 4 },
// { name: 'brexit', parameters: {}, lifespan: 5 }];
