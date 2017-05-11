function constructCandidates(candidates, callback) {
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
  console.log(allCandidates);
  callback(null, null, allCandidates);
}

module.exports = constructCandidates;
