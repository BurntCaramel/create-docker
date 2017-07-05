const make = ({
  name = 'node-server',
  nodeVersion = 'latest',
  env = 'development'
}) => `
FROM node:${nodeVersion}
LABEL name ${name}

ENV NODE_ENV ${env}
`.trim()

module.exports = make