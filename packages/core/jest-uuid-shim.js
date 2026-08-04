// CommonJS shim for the pure-ESM `uuid` package so Jest spec suites can load it.
// Only `v4` is used in core source, always without arguments; if options
// support is ever needed, this shim must be extended.
// See https://github.com/turkishtechnology/takeoff-ui/issues/547
const { randomUUID } = require('crypto');

module.exports = { v4: randomUUID };
