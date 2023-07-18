const { DockerComposeEnvironment } = require('testcontainers');
require('dotenv').config({ path: '.env.test' });
const path = require('path');

//const { createTable } = require('./utils/dynamo');

module.exports = async () => {
  const composeFilePath = path.resolve(__dirname, '../test');
  const composeFile = 'docker-compose.yml';

  const environment = await new DockerComposeEnvironment(composeFilePath, composeFile).up();
  // eslint-disable-next-line no-underscore-dangle
  global._DOCKER_ENV_ = environment;
  //await createTable();
};