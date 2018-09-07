'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  RUN_ENV: '"localTest"',
  NODE_ENV: '"development"'
})
