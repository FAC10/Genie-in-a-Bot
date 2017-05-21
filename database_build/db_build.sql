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
('Conservatives will increase overall schools budget by £4bn by 2022 and redirect £1bn of national funding formula to help schools', 'Cut University tuition fees and reintroduce maintenance grants', 'Green Party points coming soon', 'SNP points coming soon', 'Increase budgets by £7 billion – Reverse cuts to front-line budgets and protect pupil premium'),
('Conservatives will build at least 100 new free schools a year, end ban on selective schools and ask universities and independent schools to help run state schools', 'Create a unified National Education Service (NES) for England to move towards cradle-to-grave learning that is free at the point of use', 'Green Party points coming soon', 'SNP points coming soon', 'Guarantee teachers in state-funded schools will be qualified/working towards QTS from Jan 2019'),
('Conservatives: no new places in schools rated ‘inadequate’ or ‘requires improvement’ by Ofsted', 'Re-introduce bursaries and funding for health-related degrees.', 'Green Party points coming soon', 'SNP points coming soon', 'Scrap expansion of grammar schools, allow Ofsted to inspect local authorities and academies'),
('Conservatives: free breakfast to every child in every year of primary school in place of free school lunches for first three years', 'Extend the 30 free hours to all two-year-olds, and move towards making some childcare available for one-year-olds and extending maternity pay to 12 months', 'Green Party points coming soon', 'SNP points coming soon', 'Reinstate maintenance grants for the poorest students'),
('Conservatives will build at least 100 new free schools a year, end ban on selective schools and ask universities and independent schools to help run state schools', 'Transition to a qualified, graduate-led workforce, by increasing staff wages and enhancing training opportunities', 'Green Party points coming soon', 'SNP points coming soon', 'Aim to double the number of firms hiring apprentices including new sectors of the economy');

INSERT INTO health (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will increase NHS spending by a minimum of £8bn in real terms over the next five years', 'Labour will invest in the future of the NHS with over £30 billion through the next Parliament', 'Green Party points coming soon', 'SNP points coming soon', 'End public pay freeze for workers, reinstate student nurse bursaries, introduce Patient Premiums'),
('Conservatives will make it a priority in Brexit negotiations that the 140,000 staff from EU countries can carry on their contributions to NHS and social care', 'Labour guarantee treatment within 18 weeks', 'Green Party points coming soon', 'SNP points coming soon', 'Guarantee no longer than six weeks for depression/anxiety treatment, two weeks for psychosis'),
('Conservatives will build and upgrade primary care facilities, mental health clinics and hospitals', 'Patients in A&E will be guaranteed to be seen within 4 hours', 'Green Party points coming soon', 'SNP points coming soon', 'Provide more choice at end of life care, cap cost of social care, raise Carer’s Allowance to £150pw'),
('Conservatives will recover the cost of medical treatment from non-UK residents', 'Free parking in NHS England for staff, patients and visitors', 'Green Party points coming soon', 'SNP points coming soon', 'Expand access to GPs through online, phone and Skype appointments'),
('Conservatives will increase NHS spending by a minimum of £8bn in real terms over the next five years', 'Reverse privatisation of the NHS', 'Green Party points coming soon', 'SNP points coming soon', 'Restrict marketing of junk food pre-9pm watershed, introduce minimum unit pricing of Alcohol');

INSERT INTO economy (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will continue to restore public finances and have a balanced budget by middle of next decade', 'Tackle the gender pay gap', 'Green Party points coming soon', 'SNP points coming soon', 'Nation-wide programme of fibre-optic broadband, continued investment in HS2, Crossrail 2 etc.'),
('Conservatives plan to meet OECD average for investments in R&D - 2.4% of GDP within 10 years. Launch a new £23bn national productivity investment fund', 'Put small businesses at the centre of economic strategy', 'Green Party points coming soon', 'SNP points coming soon', 'Eliminating the deficit on day-to-day spending by 2020'),
('Conservatives will introduce energy tariff cap to extend price protection for vulnerable customers, but maintain competitive element of the retail energy market', 'Unpaid internships banned.', 'Green Party points coming soon', 'SNP points coming soon', 'Introduce network of incubators for technology start-ups, FTTP as standard with >2Gbps speeds'),
('Conservatives will increase national living wage to 60% of median earnings by 2020', 'Bring minimum wage in line with living wage - at least £10 by 2020', 'Green Party points coming soon', 'SNP points coming soon', 'Binding board-member votes on executive pay, right for ZHC-holders to request fixed contract'),
('placeholder for conservative', 'Zero hours contracts outlawed.', 'Green Party points coming soon', 'SNP points coming soon', 'Champion Northern Powerhouse/Midlands Engine, devolve decisions, revenue-raising powers');

INSERT INTO immigration (conservative, labour, green, snp, libdem)
VALUES
('Conservatives: reduce immigration to “sustainable” levels, meaning annual net migration in the tens of thousands rather than hundreds of thousands', 'Fair rules and reasonable management of migration, not resorting to ‘bogus’ targets', 'Green Party points coming soon', 'SNP points coming soon', 'Hold an annual debate on skill and labour market shortfalls to identify necessary migration'),
('Conservatives will increase earnings threshold for those wishing to sponsor migrants for family visas', 'End indefinite detentions', 'Green Party points coming soon', 'SNP points coming soon', 'Remove international students from migration statistics, recognising them as largely temporary'),
('Conservatives: overseas students will remain in the immigration statistics', 'Protect those already working here, whatever their ethnicity', 'Green Party points coming soon', 'SNP points coming soon', 'Expand Syrian Resettlement scheme to 50,000, including 3,000 unaccompanied refugee children'),
('Conservatives will offer asylum and refuge to people in parts of the world affected by conflict and oppression, but work hard to reduce asylum claims in the UK', 'For areas where immigration has placed a strain on public services Labour will reinstate the Migrant Impact Fund and boost it with a contributory element from the investments required for High Net Worth Individual Visas', 'Green Party points coming soon', 'SNP points coming soon', 'Migration Impact fund to meet unexpected pressures on public services, housing'),
('Conservatives will increase earnings threshold for those wishing to sponsor migrants for family visas', 'Uphold the proud British tradition of honouring the spirit of international law and our moral obligations by taking our fair share of refugees', 'Green Party points coming soon', 'SNP points coming soon', 'Allow high-skilled immigration and reinstate post-study work visas for STEM graduates');

INSERT INTO housing (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will meet 2015 commitment to deliver 1m homes by the end of 2020 and deliver 500,000 more by the end of 2022', 'Invest to build one million new homes, including 100,000 council and housing association homes by the end of next parliament.', 'Green Party points coming soon', 'SNP points coming soon', 'Direct spending to build 300,000 homes a year by 2022, creation of 10 Garden Cities'),
('Conservatives will deliver reforms proposed in the housing white paper to free up more land', 'Rent rises capped to inflation and legal minimum standards in properties for rent.', 'Green Party points coming soon', 'SNP points coming soon', 'New Rent-to-Own model, rent payments giving increasing stake, ownership after 30 years'),
('Conservatives will build new fixed-term social houses which will be sold privately after 10-15 years with automatic right to buy for tenants', '4,000 homes for people with history of rough sleeping.', 'Green Party points coming soon', 'SNP points coming soon', 'Help-to-Rent scheme providing government-backed tenancy deposit loans for FTBs under 30'),
('Conservatives will deliver reforms proposed in the housing white paper to free up more land', 'Will be building at least 100,000 council and housing association homes a year for genuinely affordable rent or sale by the end of next Parliament', 'Green Party points coming soon', 'SNP points coming soon', 'Tenants have first refusal to buy the home they are renting from a landlord'),
('Conservatives will meet 2015 commitment to deliver 1m homes by the end of 2020 and deliver 500,000 more by the end of 2022', 'Invest to build one million new homes, including 100,000 council and housing association homes by the end of next parliament.', 'Green Party points coming soon', 'SNP points coming soon', 'Disallow advertising homes abroad before the UK, create rogue landlord/agent database');

INSERT INTO environment (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will meet 2050 carbon reduction objective and take action against poor air quality', 'Ensure that 60 per cent of the UK’s energy comes from zero-carbon or renewable sources by 2030', 'Green Party points coming soon', 'SNP points coming soon', 'Legally binding targets to reduce net greenhouse gas emissions by 80% by 2040, 100% by 2050'),
('Conservatives will develop the shale industry, legislate to change planning law for fracking applications, and set up a shale environmental regulator, with more tax revenues going to communities that host extraction sites', 'Remove carbon from electricity generation by 2030', 'Green Party points coming soon', 'SNP points coming soon', 'Aim for 60% of electricity from renewables by 2030, restore solar PV and onshore wind funding'),
('Conservatives will meet 2050 carbon reduction objective and take action against poor air quality', 'Keep forests in public ownership', 'Green Party points coming soon', 'SNP points coming soon', 'Invest in energy storage, smart grid technology, hydrogen, offshore wind and tidal power'),
('Conservatives will develop the shale industry, legislate to change planning law for fracking applications, and set up a shale environmental regulator, with more tax revenues going to communities that host extraction sites', 'Remove carbon from electricity generation by 2030', 'Green Party points coming soon', 'Create an Energy Security Board to plan and deliver the energy mix we need, including renewables, nuclear, green gas, carbon capture and storage, and clean coal', 'Green Party points coming soon', 'SNP points coming soon', 'Ensure at least four million homes made Band C efficient by 2022, all homes in England by 2035'),
('Conservatives will meet 2050 carbon reduction objective and take action against poor air quality', 'Ban fracking', 'Green Party points coming soon', 'SNP points coming soon', 'Extend 5p charge on plastic bags to disposable coffee cups');

INSERT INTO tax (conservative, labour, green, snp, libdem)
VALUES
('Conservatives: increase personal allowance to £12,500 and the higher rate to £50,000 by 2020, ensure local residents can veto high council tax increases via a referendum.', 'Rises in income tax for those earning over £80,000', 'Green Party points coming soon', 'SNP points coming soon', 'Fund spending on NHS and social care through 1p rise in income and dividend taxes'),
('The Conservative party won''t increase VAT.', 'Raising £19.4billion by raising corporation tax 26 per cent', 'Green Party points coming soon', 'SNP points coming soon', 'Reverse Corporation Tax and CGT cuts, reverse Marriage Allowance, IHT threshold increases'),
('Conservatives will stick to plan to cut corporation tax to 17% by 2020', 'Extra powers for HMRC to chase individuals and companies who avoid tax', 'Green Party points coming soon', 'SNP points coming soon', 'Review business rates to reduce burdens on small firms, prioritised for future business tax cuts'),
('Conservatives will maintain pensions triple lock until 2020 and introduce a new double lock afterwards. Means test winter fuel payments', 'Rises in income tax for those earning over £80,000', 'Green Party points coming soon', 'SNP points coming soon', 'Consider moving from a profit-based Corporation Tax to one accounting for sales, turnover'),
('Conservatives: increase personal allowance to £12,500 and the higher rate to £50,000 by 2020, ensure local residents can veto high council tax increases via a referendum.', 'Raising £19.4billion by raising corporation tax 26 per cent', 'Green Party points coming soon', 'SNP points coming soon', 'Encourage sales of electric and low-emission vehicles by adjusting vehicle taxation');

INSERT INTO brexit (conservative, labour, green, snp, libdem)
VALUES
('Conservatives seek a new “deep and special partnership with the EU”', 'Labour accepts referendum result', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will hold a Second Referendum on any negotiated deal with the European Union'),
('Conservatives will leave the single market and customs union', 'Labour will reject ‘no deal’ as a viable option', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats propose a Unilateral guarantee of rights for EU citizens and acceptance of Freedom of Movement'),
('Conservatives believe no deal is better than a bad deal for the UK', 'Labour will drop the Conservatives’ Great Repeal Bill, replacing it with an EU Rights and Protections Bill', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats: Membership of the Single Market and Customs Union, access to EU-funded schemes (Erasmus+)'),
('Conservatives will control immigration and secure the rights of EU nationals in the UK and Britons in the EU', 'Labour will will secure continued EU market access', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats: Joint co-operation on environmental standards, law enforcement and scientific research funding'),
('Conservatives will maintain a common travel area with a “frictionless” border with Ireland', 'Labour will immediately guarantee existing rights for all EU nationals living in Britain and secure reciprocal rights for UK citizens who have chosen to make their lives in EU countries', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will Campaign to protect the rights of the citizens of Gibraltar during negotiations');

INSERT INTO transport (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will review rail ticketing to remove "complexity and perverse" pricing, with a passenger ombudsman introduced', 'Labour: Fares will be capped and free WiFi introduced across the network', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats: Diesel scrappage scheme, bans on sale of diesel cars and small vans by 2025'),
('Conservative party: minimum service levels agreed with train companies and staff during times of industrial action. A pledge to make this mandatory if a deal cannot be reached voluntarily', 'Labour: Railways brought back into public ownership', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will extend ULE zones to 10 towns, all private hire vehicles/diesel buses licensed on low emission fuel'),
('Conservative party will focus on creating extra capacity on the railways to ease overcrowding, bring new lines and stations, and improve existing routes - including for freight', 'Labour: HS2 will be completed and will link with a "Crossrail of the North"', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will establish government-run companies to take over running of Southern Rail and Thameslink'),
('Conservatives will continue investment in High Speed 2, Northern Powerhouse Rail and the expansion of Heathrow Airport, while ensuring these projects develop the skills and careers of British workers', 'Labour: Railways brought back into public ownership', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats oppose expansion of Heathrow, Stansted, Gatwick, allow expansion of Birmingham, Manchester'),
('Conservatives: almost every car and van to be zero-emission by 2050 with £600m investment by 2020 to help achieve it.', 'Labour: HS2 will be completed and will link with a "Crossrail of the North"', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will introduce a 66% discount card for 16-21 year olds on bus travel');

INSERT INTO faffairs (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will offer asylum and refuge "to people in parts of the world affected by conflict and oppression, rather than to those who have made it to Britain."', 'Labour: When the current Trump administration chooses to ignore shared values, whether by discriminating on the basis of religion or breaking its climate change commitments, we will not be afraid to disagree', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats are committed to working on a two-state solution to the Israel-Palestine conflict'),
('Conservatives pledge to review the international legal definition of ''refugee'' to ensure the system is not geared to those who are “young enough, fit enough, and have enough resources to get to Britain”.', 'Labour: Labour will work tirelessly to end the conflict in Syria and get the diplomatic process back on track, while fully supporting international efforts to investigate, prosecute and convict the perpetrators of war crimes', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats want to suspend UK arms sales to Saudi Arabia owing to perceived humanitarian law breaches in Yemen'),
('Conservatives will maintain commitment to spend 0.7% of gross national income on aid, but change the definition of development spending.', 'Labour: Publish a strategy for protecting civilians in conflict, setting out detailed plans for work on conflict prevention and resolution, post-conflict peace-building, and justice for the victims of war crimes', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will work to exert maximum pressure on Russia to stop interference in Eastern Europe'),
('Conservatives will align the aid budget with the sustainable development goals, the aims of which include ending extreme poverty, saving children’s lives and improving access to education for girls.', 'Labour will appoint dedicated global ambassadors for women’s rights, LGBT rights and religious freedom', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will work with others to tackle violent extremism manifested by Daesh and Boko Haram'),
('Conservatives will reframe the rules governing aid spending. Failing that, change the law so that the country can use a “better definition of development spending”.', 'Labour will continue to spend 0.7 per cent of gross national income on overseas development assistance', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will demand humanitarian access in Syria and work to deter use of Chemical/Biological weapons');

INSERT INTO defence (conservative, labour, green, snp, libdem)
VALUES
('Conservatives will continue to help maintain the UN and Nato', 'Labour is committed to a responsive, high tech armed forces', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will commit to meeting NATO guidelines by spending 2% of GDP on defence'),
('Conservatives will meet Nato target of at least 2% of GDP on defence and increase budget by at least 0.5% above inflation in every year of the new parliament', 'Labour is committed to effective UN peacekeeping, including support for a UN Emergency Peace Service', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will recruit STEM graduates as armed-forces engineers through golden handshake of up to £10000'),
('Conservatives will retain Trident', 'Labour wants at least 2% GDP to be spent on defence', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats would recognise of cyber-warfare through security/intelligence services, develop countering abilities'),
('Conservatives will invest £178bn in new military equipment for the armed forces over the next decade', 'Labour supports renewal of Trident', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats: Maintenance of Dreadnought nuclear deterrent, but procuring three submarines instead of four'),
('Conservatives will complete the Astute class of hunter-killer submarines', 'Labour: Personnel who are injured while serving should have prompt access to support and compensation and Labour will resist proposals to abolish the right to seek legal redress against the MoD where compensation claims cannot be otherwise settled', 'Green Party points coming soon', 'SNP points coming soon', 'Liberal Democrats will work to lead international multi-lateral nuclear disarmament efforts');

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
