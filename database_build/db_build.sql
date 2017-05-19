BEGIN;

DROP TABLE IF EXISTS users, partyVotes, counts, education, health, economy, immigration, housing, environment, tax, brexit, transport, faffairs, defence, jokes CASCADE;

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  firstname   VARCHAR(30)   NOT NULL,
  lastname    VARCHAR(50),
  facebook_id BIGINT       UNIQUE,
  startContext TEXT[],
  flow      TEXT[],
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
  majority    VARCHAR(100)   NOT NULL,
  issueTitle  VARCHAR(100)   NOT NULL
);

CREATE TABLE counts (
  id          SERIAL        PRIMARY KEY,
  conservative  INTEGER,
  labour        INTEGER,
  green         INTEGER,
  snp           INTEGER,
  libdem        INTEGER,
  education        INTEGER,
  health        INTEGER,
  economy        INTEGER,
  immigration        INTEGER,
  housing        INTEGER,
  environment        INTEGER,
  tax        INTEGER,
  brexit_mani        INTEGER,
  brexit_votes        INTEGER,
  transport        INTEGER,
  faffairs        INTEGER,
  defence        INTEGER,
  syria        INTEGER,
  tuition_fees        INTEGER
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

INSERT INTO counts (conservative, labour, green, snp, libdem, education, health, economy, immigration, housing, environment, tax, brexit_mani, brexit_votes, transport, faffairs, defence, syria, tuition_fees)
VALUES
(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

INSERT INTO users (firstName)
VALUES
('test');

INSERT INTO education (conservative, labour, green, snp, libdem)
VALUES
('placeholder for conservative', 'placeholder for labour', 'placeholder for green', 'placeholder for snp', 'placeholder for libdem');

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

INSERT INTO partyVotes (partyKey, party, issue, inFavour, against, extra, turnout, swing, majority, issueTitle)
VALUES
('Conservativebrexit_votes', 'the Conservative Party', 'brexit_votes', '319 Conservative MPs (99.7%)', '1 MP (0.3%)', 'and Conservative leader Theresa May has said the UK "cannot possibly" remain part of the single market as it would mean "not leaving the EU at all"', '97.9%', 'in favour', '99.7%', 'Brexit'),
('Labourbrexit_votes', 'the Labour Party', 'brexit_votes', '168 Labour MPs (78%)', '47 MPs (22%)', 'Labour''s shadow Brexit Secretary Sir Keir Starmer has ruled out a second referendum, but said there would have to be transitional arrangements at the end of the two-year Article 50 process.', '93.5%', 'in favour', '78%', 'Brexit'),
('Lib Dembrexit_votes', 'the Liberal Democrats', 'brexit_votes', '0 Lib Dem MPs (0%)', '7 MPs (100%)', 'The Lib Dem manifesto will include a commitment to another EU referendum on the final Brexit deal, in which the party would campaign for Remain.', '77.8%', 'against', '100%', 'Brexit'),
('Greenbrexit_votes', 'the Green Party', 'brexit_votes', '0 Green MPs (0%)', '1 MP (100%)', 'and the Green Party would offer a second referendum on the details of any Brexit deal, with 16 and 17-year-olds given a vote.', '100%', 'against', '100%', 'Brexit'),
('SNPbrexit_votes', 'the SNP', 'brexit_votes', '0 SNP MPs (0%)', '50 MPs (100%)', 'and SNP leader Nicola Sturgeon has been pushing for Scotland - which voted to remain in the EU - to have a special status after Brexit, including remaining in the single market.', '96.3%', 'against', '100%', 'Brexit'),
('Conservativetuition_fees', 'the Conservative Party', 'tuition_fees', '296 Conservative MPs (98%)', '6 MPs (2%)', '', '99.0%', 'in favour', '98%', 'Tuition Fees'),
('Labourtuition_fees', 'the Labour Party', 'tuition_fees', '0 Labour MPs (0%)', '253 MPs (100%)', '', '99.2%', 'against', '100%', 'Tuition Fees'),
('Lib Demtuition_fees', 'the Liberal Democrats', 'tuition_fees', '27 Lib Dem MPs (56%)', '21 MPs (44%)', '', '86%', 'in favour', '56%', 'Tuition Fees'),
('Greentuition_fees', 'the Green Party', 'tuition_fees', '0 Green MPs (0%)', '1 MP (100%)', '', '100%', 'against', '100%', 'Tuition Fees'),
('SNPtuition_fees', 'the SNP', 'tuition_fees', '0 SNP MPs (0%)', '6 MPs (100%)', '', '96.3%', 'against', '100%', 'Tuition Fees'),
('Conservativesyria', 'the Conservative Party', 'syria', '313 Conservative MPs (98%)', '7 MPs (2%)', '', '97.6%', 'in favour', '98%', 'Air strikes on Syria'),
('Laboursyria', 'the Labour Party', 'syria', '66 Labour MPs (30%)', '153 MPs (70%)', '', '94.8%', 'against', '70%', 'Air strikes on Syria'),
('Lib Demsyria', 'the Liberal Democrats', 'syria', '6 Lib Dem MPs (75%)', '2 MPs (25%)', '', '100%', 'in favour', '75%', 'Air strikes on Syria'),
('Greensyria', 'the Green Party', 'syria', '0 Green MPs (0%)', '1 MP (100%)', '', '100%', 'against', '100%', 'Air strikes on Syria'),
('SNPsyria', 'the SNP', 'syria', '0 SNP MPs (0%)', '53 MPs (100%)', '', '100%', 'against', '100%', 'Air strikes on Syria');

COMMIT;
