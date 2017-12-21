# Shapeshift Core &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![Build Stats](https://travis-ci.org/shapeshiftjs/shapeshift-core.svg?branch=master)](https://travis-ci.org/shapeshiftjs/shapeshift-core) [![Coverage Status](https://coveralls.io/repos/github/shapeshiftjs/shapeshift-core/badge.svg)](https://coveralls.io/github/shapeshiftjs/shapeshift-core)

[![Greenkeeper badge](https://badges.greenkeeper.io/shapeshiftjs/shapeshift-core.svg)](https://greenkeeper.io/)
[![Dependency Status](https://david-dm.org/shapeshiftjs/shapeshift-core.svg)](https://david-dm.org/shapeshiftjs/shapeshift-core)
[![devDependency Status](https://david-dm.org/shapeshiftjs/shapeshift-core/dev-status.svg)](https://david-dm.org/shapeshiftjs/shapeshift-core#info=devDependencies)

The base JSON Schema and UI Schema parser. Contains iterators and validators for traversing and verifying json data. This library can be used for any Javscript project, and UI Schema is purely optional.

You do not need to install this if you are using one of the form components such as vue-shapeshift or the shapeshift-server.

## Installation

```
npm i --save @shapeshift/core
```

## Usage

Iterate through properties of an JSON Schema object
```
shapeshift(schema, uiSchema).forEach(shapeshift => {
    /// Child Property
    shapeshift.schema()
})
```