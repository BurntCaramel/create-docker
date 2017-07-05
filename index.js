#!/usr/bin/env node

const makeNodeJSTemplate = require('./templates/nodejs')
const makeSwiftTemplate = require('./templates/swift')

const FS = require('fs-extra')

require('yargs')
    .option('out', {
        alias: 'o',
        describe: 'The path to your Dockerfile, e.g. Dockerfile.dev',
        default: './Dockerfile'
    })
    .option('node', {
        describe: 'The version of Node to run in Docker',
        default: 'latest'
    })
    .option('swift', {
        describe: 'The version of Swift to run in Docker',
        default: 'latest'
    })
    .option('env', {
        describe: 'The NODE_ENV value: e.g. production, staging, development',
        default: 'development'
    })
    .option('port', {
        describe: 'The port to expose',
        default: '8080'
    })
    .option('name', {
        describe: 'The name to label with'
    })
    .command({
        command: 'node',
        desc: 'Creates a Node.js server Dockerfile',
        handler(args) {
            FS.outputFile(args.out, makeNodeJSTemplate({
                name: args.name,
                nodeVersion: args.node,
                env: args.env
            }))
            .then(() => {
                console.log('Created Node.js Dockerfile at', args.out)
            })
            .catch(error => {
                console.error(error)
            })
        }
    })
    .command({
        command: 'swift',
        desc: 'Creates a Swift server Dockerfile',
        handler(args) {
            FS.outputFile(args.out, makeSwiftTemplate({
                name: args.name,
                swiftVersion: args.swift,
                port: args.port
                //env: args.env
            }))
            .then(() => {
                console.log('Created Swift Dockerfile at', args.out)
            })
            .catch(error => {
                console.error(error)
            })
        }
    })
    .demandCommand(1)
    .help('help')
    .argv
