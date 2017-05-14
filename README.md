# MPBots
*An app to help people learn about the UK General Elections*
![cover3](https://cloud.githubusercontent.com/assets/20152018/26032082/2a61cbe6-3882-11e7-88f3-656e6e6f48c7.png)

**We captured this politics genie and put him in a bot so he can answer all your UK General Election questions. Message him on Facebook [here](https://www.facebook.com/politicalgenie/)**

Problem? Suggestion? Raise an issue/pull request or email us at HelpAGenieOut@gmail.com

Hosted on Heroku [here](https://mp-chatbot.herokuapp.com/)

Thanks to [Founders & Coders](foundersandcoders.com), [Filament](http://filament.uk.com/) and [Clear Honest Design](http://clearhonestdesign.com/) for their support in getting this ready in 2 weeks!

### Aims
In the 2015 General Election, only 43% of 18-24 year olds voted. The idea behind this project was to help inform young people, in particular, and inspire them to vote. The bot is accessible in Facebook Messenger and currently provides information on the candidates standing (including their recent tweets, tweets about them and the party they represent), as well as how parties have voted on key issues in the past. We hope to build this out with more natural language processing and information on the manifestos, key events and more. Our genie also prompts users to register to vote.

We felt that there weren't many bots out there that were both educational *and* fun so built a little sass into our Genie in a bot; he's not too pleased to have been captured, he's not afraid to fight back if you're mean to him and he's pretty touchy about the Christina Aguilera reference..

### Summary of interview findings
After prototyping an initial version of the app, we interviewed some students at Queen Mary's university to get their thoughts on the product. Findings can be seen [here](https://github.com/FAC10/Genie-in-a-Bot/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20user%20test) but some general takeaways were that:

- Facebook's persistant menu is not particularly clear so important info should not only be present here
- It was not always clear that users can type rather than press buttons so we should let them know explicitly
- Several students mentioned that they would be embarrassed to ask their friends about politics and would use a bot like this if it worked well
- None of the students had heard of Facebook bots

### User flow on bot site
This user flow changed multiple times but we settled with the below after determining that extracting the data on how local MPs had voted was going to be time-consuming and less relevant than focusing on candidates standing and parties.
![electionbot 4](https://cloud.githubusercontent.com/assets/20152018/25740081/eba68894-317c-11e7-824f-aac8f9454d27.png)

### Databases and APIs

We are using API.AI for natural language processing and for setting up intents. To prompt users with questions relevant to the conversation they are having, we save contexts in our database and query these. Our list of candidates comes from [Democracy Club](https://democracyclub.org.uk/) and our data on how parties have voted as a whole is pulled from [The Public Whip](http://www.publicwhip.org.uk/project/data.php).

Other APIs we are using include:
- Twitter
- Facebook
- http://postcodes.io/

# Notes on how we added the candidates csv file to our Heroku database

1. Create local table in psql:
```

  CREATE TABLE temps2 (
    id  SERIAL  PRIMARY KEY,
    name  VARCHAR(200) NOT NULL,
    gender  VARCHAR(30),
    party_name  VARCHAR(250),
    post_label  VARCHAR(250),
    email   VARCHAR(250),
    twitter_username  VARCHAR(250),
    facebook_page_url VARCHAR(250),
    party_ppc_page_url  VARCHAR(250),
    facebook_personal_url VARCHAR(250),
    homepage_url  VARCHAR(250),
    wikipedia_url VARCHAR(250),
    linkedin_url  VARCHAR(350),
    image_url VARCHAR(250),
    theyworkforyou_url  VARCHAR(250)
  );
```
2. Set enconding:

  ```
  
  SET client_encoding = 'ISO_8859_5';
  ```

3. import CVS to local table:
```

  COPY temps2(name, gender, party_name, post_label, email, twitter_username, facebook_page_url, party_ppc_page_url, facebook_personal_url, homepage_url, wikipedia_url, linkedin_url, image_url, theyworkforyou_url) FROM '/Users/alicecarr/Downloads/candidates-parl.2017-06-08.csv' CSV HEADER;
```

4. create new database on heroku

  heroku app database --> resources --> heroku postgres

5. push local database to heroku (get colour from heroku config variables)

  ```heroku pg:push candidates HEROKU_POSTGRESQL_BLUE --app mp-chatbot```
  
  ![codecov](https://codecov.io/gh/FAC10/MPBots/branch/master/graph/badge.svg)
![travis](https://travis-ci.org/FAC10/MPBots.svg?branch=master)
