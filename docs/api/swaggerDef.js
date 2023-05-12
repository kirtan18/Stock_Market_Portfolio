module.exports = {
  info: {
    title: 'Stock Market Service',
    version: '0.0.1',
    description: 'Stock Market API documentation',
    termsOfService: 'https://zuru.tech/terms',
    contact: {
      email: 'apiteam@zuru.tech',
    },
    license: {
      name: 'Dreamcatcher license',
      url: 'https://zuru.tech/Dreamcatcher/licenses/LICENSE.html',
    },
  },
  host: 'localhost:8000',
  basePath: '/',
  apis: ['./src/component/**/*.route.js'],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
