const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('/portfolio/stocks routes', () => {
//   let stockModel,
//     conflictModel;
  describe('Testing /portfolio/stocks/searchStock', () => {
    it(
      'GET /portfolio/stocks/searchStock should successfully return validation error',
      async () => chai.request(app)
        .get('/portfolio/stocks/searchStock')
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('errors').to.be.an('array');
        })
    );

    it(
      'GET /portfolio/stocks/searchStock should successfully return stocks symbol and name',
      async () => chai.request(app)
        .get('/portfolio/stocks/searchStock?symbol=Adani')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
        })
    );
  });

  //   describe('Testing /portfolio/stocks/addStock', () => {
  //     beforeEach(() => {
  //       stockModel = {
  //         companyName: 'AMERICAFIRST SEASONAL ROTATION FUND CLASS I'
  //       };
  //       conflictModel = {
  //         companyName: 'America Movil S.A.B.DE C.V. - Class A'
  //       };
  //     });
  //     it(
  //       'POST /portfolio/stocks/addStock should successfully return validation error',
  //       async () => chai.request(app)
  //         .post('/portfolio/stocks/addStock/xyz')
  //         .send(stockModel)
  //         .then((res) => {
  //           expect(res.status).to.equal(400);
  //           expect(res.body).to.have.property('code');
  //           expect(res.body).to.have.property('message');
  //           expect(res.body).to.have.property('errors').to.be.an('array');
  //         })
  //     );

  //     it(
  //       'POST /portfolio/stocks/addStock should successfully add stock',
  //       async () => chai.request(app)
  //         .post('/portfolio/stocks/addStock/1?symbol=AMC')
  //         .send(stockModel)
  //         .then((res) => {
  //           expect(res.status).to.equal(200);
  //           expect(res.body).to.have.property('message');
  //         })
  //     );

  //     it(
  //       'POST /portfolio/stocks/addStock should successfully return conflict error',
  //       async () => chai.request(app)
  //         .post('/portfolio/stocks/addStock/1?symbol=STQIX')
  //         .send(conflictModel)
  //         .then((res) => {
  //           expect(res.status).to.equal(409);
  //           expect(res.body).to.have.property('code');
  //           expect(res.body).to.have.property('message');
  //         })
  //     );
  //   });

  describe('Testing /portfolio/stocks/stock-chart', () => {
    it(
      'GET /portfolio/stocks/stock-chart should successfully return validation error',
      async () => chai.request(app)
        .get('/portfolio/stocks/stock-chart')
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('errors').to.be.an('array');
        })
    );

    it(
      'GET /portfolio/stocks/stock-chart should successfully return stock chart',
      async () => chai.request(app)
        .get('/portfolio/stocks/stock-chart?symbol=ADANIPOWER.BSE')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
        })
    );
  });
});
