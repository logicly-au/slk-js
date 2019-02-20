import unorm from "unorm";
import Nibbler from "nibbler-crockford";
import Latin1 from "crypto-js/enc-latin1";
import SHA1 from "crypto-js/sha1";

const SLK_REGEX = /^([A-Z]{3}|[A-Z]{2}2|[A-Z]22|222|999)([A-Z]{2}|[A-Z]2|22|99)([0-9]{8})([1-3]|9)$/;
const HEX_REGEX = /^[0-9A-Fa-f]{40}$/;
const CROCKFORD_REGEX = /^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{32}$/;
const DOB_REGEX = /^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))\d{4}$/;

const VALID_DOB_REGEX = /^\d{4}-(((0)[0-9])|((1)[0-2]))-([0-2][0-9]|(3)[0-1])$/;

const nibbler = new Nibbler({
  dataBits: 8,
  codeBits: 5,
  keyString: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
});

const MISSING_CHAR = "2";
const EMPTY_STRING = "";
const FIRST_NAME_INDICES = [1, 2];
const LAST_NAME_INDICES = [1, 2, 4];

const arrayToString = (x, y = EMPTY_STRING) => x.join(y)
const stringToArray = (x, y = EMPTY_STRING) => x.split(y)

// dobString is expected in iso format yyyy-mm-dd
const generate = (first = "", last = "", dobString, genderId) => {
    first = sliceString(first, FIRST_NAME_INDICES);
    last = sliceString(last, LAST_NAME_INDICES);

    if(!VALID_DOB_REGEX.test(dobString)) {
      throw new Error("Date of birth field for SLK generation must be a string in the format yyyy-mm-dd");
    }

    let dobArray = dobString.split("-");
    dobArray.reverse();
    let dob = dobArray.join(EMPTY_STRING);
    genderId = genderId == "0" && "9" || genderId;
    let slk = [last, first, dob, genderId].join(EMPTY_STRING).toUpperCase();
    let hash = nibbler.encode(SHA1(slk).toString(Latin1));
    return {slk, hash};
}

/**
 * Check if an SLK is valid, one of the formats:
 * 14 char SLK
 * 32 char crockford encoded string
 * 40 character hex string
 * The date value is also checked if the slk is a valid 14 char SLK.
 * @param {String} $slk String to check for validity
 */
const is_valid = $slk => {
  let validations = {
    'slk': SLK_REGEX.test($slk),
    'hex': HEX_REGEX.test($slk),
    'crockford': CROCKFORD_REGEX.test($slk)
  };

  if(validations.slk === true) {
    let date = $slk.slice(5, -1);
    validations.date = DOB_REGEX.test(date);
    if(!validations.date) {
      validations.slk = false;
    }
  }
  return validations;
}

/**
 * Return indices of a given string
 * @param {String} $string  The string that will be sliced
 * @param {Number[]} $indices Array of indices to extract from the string.
 */
const sliceString = ($string, $indices) => {
  let ret = stringToArray("2".repeat($indices.length));

  if(!!$string.length === false) {
    return "9".repeat($indices.length);
  }
  // normalize the name first
  $string = unorm.nfkd($string).replace(/\W/g, EMPTY_STRING);;
  stringToArray($string).map((e, i) => {
    if($indices.includes(i)) {
      ret[ret.indexOf("2")] = e;
    }
  });
  return arrayToString(ret);
}

const exports = {
  generate,
  is_valid
}

if(typeof window !== 'undefined') {
  window.SLK = exports;
}

if(typeof module !== 'undefined' && module.exports) {
  module.exports = exports;
}

export default SLK;
