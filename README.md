# Statistical Linkage Key
[Meteor Definition](https://meteor.aihw.gov.au/content/index.phtml/itemId/349510)

[![Build Status](https://travis-ci.com/strategicdata/slk-js.svg?branch=master)](https://travis-ci.com/strategicdata/slk-js)


This small library handles both the generation and validation of an SLK.
The library itself exposes two functions:
 - generate
 - is_valid

## `SLK.generate`
The `generate` function takes 4 arguments:
 - First Name (Full)
 - Last Name (Full)
 - Date of Birth (Given in YYYY-MM-DD format)
 - Gender Identifier given as an integer from the following

| Gender  | Identifier  |
|---------|-------------|
| Male    | 1           |
| Female  | 2           |
| Intersex or Indeterminate | 3 |
| Not stated/inadequately described | 9 |

## `SLK.is_valid`
This function will validate a given string based off of three separate 'types'

1. A 14 character SLK in the METeOR spec, with the date of birth validated as a true date.
2. A 32 character Crockford encoded string, using a subset of characters to represent a 14 character SLK
3. A 40 character hex encoded string

The return value of the `is_valid` function is an object with key value pairings of passed and
failed validations.


## Installation

To install, simply:

`npm i --save slk-js`

## Usage

The library itself is exposed as a global variable `SLK` which will be accessible anywhere in your application.

```

var SLK = require('slk-js').default;
import SLK from 'slk-js';

// Use the SLK library

console.log(SLK.validate('myslk'));
// false

```



