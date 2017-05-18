BEGIN;

DROP TABLE IF EXISTS users, partyVotes, counts, education, health, economy, immigration, housing, environment, tax, brexit, transport, faffairs, defence, jokes CASCADE;

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  firstname   VARCHAR(30)   NOT NULL,
  lastname    VARCHAR(50),
  facebook_id BIGINT       UNIQUE,
  startContext VARCHAR(50),
  flow      VARCHAR(50),
  postcode    VARCHAR(10),
  constituency VARCHAR(100),
  persistingCtxts    TEXT[],
  party      TEXT[],
  issue       TEXT[]
);

CREATE TABLE partyVotes (
  id          SERIAL        PRIMARY KEY,
  partyKey    VARCHAR(30),
  party       VARCHAR(50)   NOT NULL,
  issue       VARCHAR(500)   NOT NULL,
  inFavour    VARCHAR(500)   NOT NULL,
  against     VARCHAR(500)   NOT NULL,
  extra       VARCHAR(500),
  turnout     VARCHAR(500)   NOT NULL,
  swing       VARCHAR(100)   NOT NULL,
  majority    VARCHAR(100)   NOT NULL
);

CREATE TABLE counts (
  id          SERIAL        PRIMARY KEY,
  conservative  INTEGER,
  labour        INTEGER,
  green         INTEGER,
  snp           INTEGER,
  libdem        INTEGER
);

CREATE TABLE jokes (
  id         SERIAL        PRIMARY KEY,
  joke       VARCHAR(10000),
  image_url  VARCHAR(500)
);

CREATE TABLE education (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE health (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE economy (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE immigration (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE housing (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE environment (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE tax (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE brexit (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE transport (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE defence (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

CREATE TABLE faffairs (
  id         SERIAL        PRIMARY KEY,
  conservative  VARCHAR(10000),
  labour        VARCHAR(10000),
  green         VARCHAR(10000),
  snp           VARCHAR(10000),
  libdem        VARCHAR(10000)
);

INSERT INTO jokes (joke, image_url)
VALUES
('I''m not a big fan of political jokes. I have seen too many of them get elected...', 'https://image.ibb.co/g2Q7kk/smug.png'),
('Why did the cat fall into the well?
It couldn''t see that well.', 'https://media.giphy.com/media/l4FGqEoFhVLlmWsXm/giphy.gif'),
('What do you call a magical labrador? A labracadabrador', 'https://media.giphy.com/media/X6iHMtWzRHVew/giphy.gif'),
('My friend told me I had to stop acting like a flamingo. So I had to put my foot down.', 'https://media.giphy.com/media/xUPGcAq8idp4tCSMYE/giphy.gif'),
('I bought my friend an elephant for his room. He said "Thanks". I said "Don''t mention it"', 'https://media.giphy.com/media/3o7GVCSdd9h0HkF6V2/giphy.gif'),
('What''s the difference between a hippo and a zippo? One is really heavy, and the other is a little lighter.', 'https://media.giphy.com/media/htx6SsN47YxWw/giphy.gif'),
('My friend says to me: "What rhymes with orange" I said: "no it doesn''t"', 'https://media.giphy.com/media/Jv6ascEIktV9m/giphy.gif'),
('My friend asked me to help him round up his 37 sheep. I said "40"', 'https://media.giphy.com/media/ctWSqhTv0LXd6/giphy.gif'),
('What''s the difference between a good joke and a bad joke timing.', 'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif'),
('I''ve been told I''m condescending. (that means I talk down to people)', 'https://media.giphy.com/media/3o6ZtkCn4Wp5lPEX04/giphy.gif');

INSERT INTO partyVotes (partyKey, party, issue, inFavour, against, extra, turnout, swing, majority)
VALUES
('Conservativebrexit', 'the Conservative Party', 'brexit', '319 Conservative MPs (99.7%)', '1 MP (0.3%)', 'and Conservative leader Theresa May has said the UK "cannot possibly" remain part of the single market as it would mean "not leaving the EU at all"', '97.9%', 'in favour', '99.7%'),
('Labourbrexit', 'the Labour Party', 'brexit', '168 Labour MPs (78%)', '47 MPs (22%)', 'Labour''s shadow Brexit Secretary Sir Keir Starmer has ruled out a second referendum, but said there would have to be transitional arrangements at the end of the two-year Article 50 process.', '93.5%', 'in favour', '78%'),
('Lib Dembrexit', 'the Liberal Democrats', 'brexit', '0 Lib Dem MPs (0%)', '7 MPs (100%)', 'The Lib Dem manifesto will include a commitment to another EU referendum on the final Brexit deal, in which the party would campaign for Remain.', '77.8%', 'against', '100%'),
('Greenbrexit', 'the Green Party', 'brexit', '0 Green MPs (0%)', '1 MP (100%)', 'and the Green Party would offer a second referendum on the details of any Brexit deal, with 16 and 17-year-olds given a vote.', '100%', 'against', '100%'),
('SNPbrexit', 'the SNP', 'brexit', '0 SNP MPs (0%)', '50 MPs (100%)', 'and SNP leader Nicola Sturgeon has been pushing for Scotland - which voted to remain in the EU - to have a special status after Brexit, including remaining in the single market.', '96.3%', 'against', '100%'),
('ConservativetuitionFees', 'the Conservative Party', 'tuitionFees', '296 Conservative MPs (98%)', '6 MPs (2%)', '', '99.0%', 'in favour', '98%'),
('LabourtuitionFees', 'the Labour Party', 'tuitionFees', '0 Labour MPs (0%)', '253 MPs (100%)', '', '99.2%', 'against', '100%'),
('Lib DemtuitionFees', 'the Liberal Democrats', 'tuitionFees', '27 Lib Dem MPs (56%)', '21 MPs (44%)', '', '86%', 'in favour', '56%'),
('GreentuitionFees', 'the Green Party', 'tuitionFees', '0 Green MPs (0%)', '1 MP (100%)', '', '100%', 'against', '100%'),
('SNPtuitionFees', 'the SNP', 'tuitionFees', '0 SNP MPs (0%)', '6 MPs (100%)', '', '96.3%', 'against', '100%'),
('Conservativesyria', 'the Conservative Party', 'syria', '313 Conservative MPs (98%)', '7 MPs (2%)', '', '97.6%', 'in favour', '98%'),
('Laboursyria', 'the Labour Party', 'syria', '66 Labour MPs (30%)', '153 MPs (70%)', '', '94.8%', 'against', '70%'),
('Lib Demsyria', 'the Liberal Democrats', 'syria', '6 Lib Dem MPs (75%)', '2 MPs (25%)', '', '100%', 'in favour', '75%'),
('Greensyria', 'the Green Party', 'syria', '0 Green MPs (0%)', '1 MP (100%)', '', '100%', 'against', '100%'),
('SNPsyria', 'the SNP', 'syria', '0 SNP MPs (0%)', '53 MPs (100%)', '', '100%', 'against', '100%');

COMMIT;
