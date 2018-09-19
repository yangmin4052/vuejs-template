'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  RUN_ENV: '"localTest"',
  NODE_ENV: '"testing"'
})
