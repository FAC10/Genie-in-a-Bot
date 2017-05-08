const request = require('request');

function getPostcode(latitude, longtitude) {
  const url = `https://api.postcodes.io/postcodes?lon=${longtitude}&lat=${latitude}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }

    const parsedBody = JSON.parse(body);
    console.log(parsedBody);
    console.log(parsedBody.result);
  });
}

module.exports = getPostcode;


// { status: 200,
// 2017-05-08T16:14:18.398381+00:00 app[web.1]:   result:
// 2017-05-08T16:14:18.398382+00:00 app[web.1]:    [ { postcode: 'E2 0SY',
// 2017-05-08T16:14:18.398383+00:00 app[web.1]:        quality: 1,
// 2017-05-08T16:14:18.398384+00:00 app[web.1]:        eastings: 535895,
// 2017-05-08T16:14:18.398384+00:00 app[web.1]:        northings: 182998,
// 2017-05-08T16:14:18.398385+00:00 app[web.1]:        country: 'England',
// 2017-05-08T16:14:18.398385+00:00 app[web.1]:        nhs_ha: 'London',
// 2017-05-08T16:14:18.398387+00:00 app[web.1]:        longitude: -0.0423161603498166,
// 2017-05-08T16:14:18.398387+00:00 app[web.1]:        latitude: 51.5295460939963,
// 2017-05-08T16:14:18.398388+00:00 app[web.1]:        parliamentary_constituency: 'Bethnal Green and Bow',
// 2017-05-08T16:14:18.398389+00:00 app[web.1]:        european_electoral_region: 'London',
// 2017-05-08T16:14:18.398389+00:00 app[web.1]:        primary_care_trust: 'Tower Hamlets',
// 2017-05-08T16:14:18.398390+00:00 app[web.1]:        region: 'London',
// 2017-05-08T16:14:18.398390+00:00 app[web.1]:        lsoa: 'Tower Hamlets 010E',
// 2017-05-08T16:14:18.398391+00:00 app[web.1]:        msoa: 'Tower Hamlets 010',
// 2017-05-08T16:14:18.398391+00:00 app[web.1]:        incode: '0SY',
// 2017-05-08T16:14:18.398392+00:00 app[web.1]:        outcode: 'E2',
// 2017-05-08T16:14:18.398393+00:00 app[web.1]:        distance: 5.882567605,
// 2017-05-08T16:14:18.398393+00:00 app[web.1]:        admin_district: 'Tower Hamlets',
// 2017-05-08T16:14:18.398394+00:00 app[web.1]:        parish: 'Tower Hamlets, unparished area',
// 2017-05-08T16:14:18.398394+00:00 app[web.1]:        admin_county: null,
// 2017-05-08T16:14:18.398395+00:00 app[web.1]:        admin_ward: 'Bethnal Green',
// 2017-05-08T16:14:18.398395+00:00 app[web.1]:        ccg: 'NHS Tower Hamlets',
// 2017-05-08T16:14:18.398396+00:00 app[web.1]:        nuts: 'Tower Hamlets',
// 2017-05-08T16:14:18.398396+00:00 app[web.1]:        codes: [Object] },
// 2017-05-08T16:14:18.398397+00:00 app[web.1]:      { postcode: 'E2 0SP',
// 2017-05-08T16:14:18.398397+00:00 app[web.1]:        quality: 1,
// 2017-05-08T16:14:18.398398+00:00 app[web.1]:        eastings: 535871,
// 2017-05-08T16:14:18.398398+00:00 app[web.1]:        northings: 182988,
// 2017-05-08T16:14:18.398399+00:00 app[web.1]:        country: 'England',
// 2017-05-08T16:14:18.398399+00:00 app[web.1]:        nhs_ha: 'London',
// 2017-05-08T16:14:18.398400+00:00 app[web.1]:        longitude: -0.042665784082664,
// 2017-05-08T16:14:18.398400+00:00 app[web.1]:        latitude: 51.5294620031734,
// 2017-05-08T16:14:18.398401+00:00 app[web.1]:        parliamentary_constituency: 'Bethnal Green and Bow',
// 2017-05-08T16:14:18.398401+00:00 app[web.1]:        european_electoral_region: 'London',
// 2017-05-08T16:14:18.398402+00:00 app[web.1]:        primary_care_trust: 'Tower Hamlets',
// 2017-05-08T16:14:18.398403+00:00 app[web.1]:        region: 'London',
// 2017-05-08T16:14:18.398403+00:00 app[web.1]:        lsoa: 'Tower Hamlets 010E',
// 2017-05-08T16:14:18.398404+00:00 app[web.1]:        msoa: 'Tower Hamlets 010',
// 2017-05-08T16:14:18.398404+00:00 app[web.1]:        incode: '0SP',
// 2017-05-08T16:14:18.398405+00:00 app[web.1]:        outcode: 'E2',
// 2017-05-08T16:14:18.398405+00:00 app[web.1]:        distance: 20.93789591,
