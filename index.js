#!/usr/bin/env node

const FS = require('fs-extra')
const args = require('yargs')
    .option('out', {
        alias: 'o',
        describe: 'The path to your Dockerfile, e.g. Dockerfile.dev',
        default: './Dockerfile'
    })
    .option('node', {
        describe: 'The version of Node to run in Docker',
        default: 'latest'
    })
    .option('env', {
        describe: 'The NODE_ENV value: e.g. production, staging, development',
        default: 'development'
    })
    .help('help')
    .argv


const dockerfileTemplate = ({
    nodeTag = 'latest',
    env = 'development'
}) => (
`FROM node:${nodeTag}

ENV NODE_ENV ${env}
`
)

FS.outputFile(args.out, dockerfileTemplate({
    nodeTag: args.node,
    env: args.env
}))
.catch(error => {
    console.error(error)
})

