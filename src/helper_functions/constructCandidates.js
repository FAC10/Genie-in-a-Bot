function constructCandidates(candidates) {
  const allCandidates = {};

  const candidateTemplate = {
    title: 'Rushanara Ali',
    image_url: 'https://candidates.democracyclub.org.uk/media/images/5535cf82367dc5383f552cef.png',
    subtitle: 'Labour Party',
    buttons: [
      {
        type: 'postback',
        title: 'Recent tweets',
        payload: 'Recent tweets',
      }, {
        type: 'postback',
        title: 'Recent mentions',
        payload: 'Recent mentions',
      },
    ],
  };
}


module.exports = constructCandidates;
