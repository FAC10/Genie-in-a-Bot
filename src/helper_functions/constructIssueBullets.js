const get = require('../database/get_data.js');
let lastIntent = null;
const count = 0;
const constructRemoteReply = require('./constructRemoteReply');

function constructIssueBullets(facebookId, intent) {
  console.log('inside construct bullets');
  if (lastIntent === null) {
    console.log('lastIntent is null so party options');
    console.log('lastIntent is ', lastIntent);
    console.log('count is ', count);
    lastIntent = intent;
    const responseText = { text: `Which party's manifesto should I check for points on ${intent}?`,
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
  } else if (lastIntent === intent) {
    console.log('lastIntent = intent so info');
  }
}

module.exports = constructIssueBullets;
