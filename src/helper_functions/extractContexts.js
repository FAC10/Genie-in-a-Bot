function extractContexts(contexts, intent) {
  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    const parameter = contexts[0].parameters.Parties;
    const context = contexts[1].name;
    return parameter + intent;
  }
}

module.exports = extractContexts;
