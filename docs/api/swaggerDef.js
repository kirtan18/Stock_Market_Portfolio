module.exports = {
  info: {
    title: 'Trend Finder Service',
    version: '0.0.1',
    description: 'Trend Finder API documentation',
    termsOfService: 'https://zuru.tech/terms',
    contact: {
      email: 'apiteam@zuru.tech',
    },
    license: {
      name: 'Dreamcatcher license',
      url: 'https://zuru.tech/Dreamcatcher/licenses/LICENSE.html',
    },
  },
  host: 'localhost:3002',
  // host: 'localhost:7778',
  basePath: '/',
  apis: [ './src/component/**/*.route.js' ],
  schemes: [ 'http' ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
};
