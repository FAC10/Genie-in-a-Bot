const get = require('../database/get_data.js');
let lastIntent = null;
let count = 1;
const constructRemoteReply = require('./constructRemoteReply');

function constructIssueBullets(facebookId, intent, party) {
  console.log('lastintent is ', lastIntent);
  console.log('intent is ', intent);
  console.log('party is ', party);
  console.log('inside construct bullets');
  if (lastIntent === null || !party) {
    console.log('lastIntent is ', lastIntent);
    console.log('count is ', count);
    lastIntent = intent;
    const capitalisedIntent = intent.charAt(0).toUpperCase() + intent.slice(1);
    const responseText = { text: `Which party's manifesto should I check for points on ${capitalisedIntent}?`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Conservative',
          payload: 'manifestoQuery',
          image_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Conservative_logo_2006.svg/1280px-Conservative_logo_2006.svg.png',
        },
        {
          content_type: 'text',
          title: 'Labour',
          payload: 'manifestoQuery',
          image_url: 'https://pbs.twimg.com/profile_images/683632825434771456/n4NaU8Ku.png',
        },
        {
          content_type: 'text',
          title: 'Lib Dem',
          payload: 'manifestoQuery',
          image_url: 'https://d3n8a8pro7vhmx.cloudfront.net/simonhughes/sites/35/meta_images/original/Libdem_Bird.jpg?1389204968',
        },
        {
          content_type: 'text',
          title: 'Green',
          payload: 'manifestoQuery',
          image_url: 'http://www.symbols.com/gi.php?type=1&id=3308',
        },
        {
          content_type: 'text',
          title: 'SNP',
          payload: 'manifestoQuery',
          image_url: 'https://static1.squarespace.com/static/551f3665e4b0bf9fbff0752d/t/58541c079f7456e64f2ba1df/1481907207624/snp.png',
        },
      ] };
    constructRemoteReply(facebookId, responseText);
  } else if (party) {
    console.log('inside party in construct bullets');
    if (party.toLowerCase() === 'lib dem') {
      party = party.toLowerCase().split(' ').join('');
    }
    get.manifestoData(count, intent, party, (err, maniData) => {
      console.log('inside get manifestoData');
      if (err) console.log(err);
      else {
        console.log('maniData is ', maniData);
        const responseText2 = { text: `${maniData}`,
          quick_replies: [
            {
              content_type: 'text',
              title: 'Another point',
              payload: 'Another point',
            },
            {
              content_type: 'text',
              title: 'Different issue',
              payload: 'Different issue',
            },
            {
              content_type: 'text',
              title: 'Compare',
              payload: 'Compare',
            },
          ] };
        console.log('responseText2 is ', responseText2);
        constructRemoteReply(facebookId, responseText2);
      }
    });
  } else if (lastIntent = intent) {
    console.log('lastIntent = intent so info');
    get.manifestoData(count, intent, party, (err, maniData) => {
      console.log('inside get manifestoData');
      if (err) console.log(err);
      else {
        console.log('maniData is ', maniData);
        const responseText3 = { text: `${maniData}`,
          quick_replies: [
            {
              content_type: 'text',
              title: 'Another point',
              payload: 'Another point',
            },
            {
              content_type: 'text',
              title: 'Different issue',
              payload: 'Different issue',
            },
            {
              content_type: 'text',
              title: 'Compare',
              payload: 'Compare',
            },
          ] };
        console.log('responseText3 is ', responseText3);
        count++;
        console.log('count is now ', count);
        if (count > 4) {
          count = 0;
        }
        constructRemoteReply(facebookId, responseText3);
      }
    });
  }
}

module.exports = constructIssueBullets;
