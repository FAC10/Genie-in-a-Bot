BEGIN;

DROP TABLE IF EXISTS users, partyVotes CASCADE;

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  firstname   VARCHAR(30)   NOT NULL,
  lastname    VARCHAR(50),
  facebook_id BIGINT       UNIQUE,
  postcode    VARCHAR(10)
);

CREATE TABLE partyVotes (
  id          SERIAL        PRIMARY KEY,
  partyKey    VARCHAR(30),
  party       VARCHAR(50)   NOT NULL,
  issue       VARCHAR(50)   NOT NULL,
  inFavour    VARCHAR(30)   NOT NULL,
  against     VARCHAR(30)   NOT NULL,
  turnout     VARCHAR(10)   NOT NULL
);

INSERT INTO users (firstname, lastname, facebook_id, postcode)
VALUES
('Maja', 'Kudlicka', 517916098, 'E2 0ET');

INSERT INTO partyVotes (partyKey, party, issue, inFavour, against, turnout)
VALUES
('ConservativeBrexit', 'the Conservative Party', 'Brexit', '319 MPs (99.7%)', '1 MP (0.3%)', '97.9%'),
('LabourBrexit', 'the Labour Party', 'Brexit', '168 MPs (78%)', '47 MPs (22%)', '93.5%'),

COMMIT;
