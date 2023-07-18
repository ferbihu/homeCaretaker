module.exports = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await global._DOCKER_ENV_.down();
  };