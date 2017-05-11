function constructCandidates(candidates, senderID, intent, callback, callback2) {
  const allCandidates = [];
  candidates.forEach((candidate) => {
    const name = candidate.name;
    const image = candidate.image_url;
    const party = candidate.party_name;
    const twitter = candidate.twitter_username;

    const candidateTemplate = {
      title: name,
      image_url: image,
      subtitle: party,
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
    allCandidates.push(candidateTemplate);
  });
  const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
  // console.log(allCandidates);
  callback(placeholderVotingObj, null, allCandidates, senderID, intent, callback2);
}

module.exports = constructCandidates;
