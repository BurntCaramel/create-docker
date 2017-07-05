// See: https://gist.github.com/aranajhonny/a800050a86682b8870d7cda716838e59

const make = ({
  name = 'swift-server',
  swiftVersion = 'latest',
  port = 8080,
}) => `
FROM ibmcom/swift-ubuntu:${swiftVersion}
LABEL name ${name}

RUN mkdir /App

WORKDIR /App
COPY . /App

RUN swift build

EXPOSE ${port}

USER root

CMD [".build/debug/Run"]
`.trim()

module.exports = make