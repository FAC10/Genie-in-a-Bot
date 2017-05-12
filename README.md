[![codecov](https://codecov.io/gh/FAC10/MPBots/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC10/MPBots)
[![travis](https://travis-ci.org/FAC10/MPBots.svg?branch=master)
# MPBots
An app to help people learn about the UK General Elections

Hosted on Heroku [here](https://mp-chatbot.herokuapp.com/)

Talk to us on facebook [here](https://m.me/politicalgenie)

### Aims

### User Stories

### Summary of interview findings

### User flow on bot site
![electionbot 4](https://cloud.githubusercontent.com/assets/20152018/25740081/eba68894-317c-11e7-824f-aac8f9454d27.png)

### Databases and APIs

#### Pushing cvs files to Heroku database

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
