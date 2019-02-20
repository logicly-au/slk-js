const SLK = require("./dist/index.js");

const fixtures = [
  {
    slk: "TEEOH070619541",
    crockford: "82CZ43SSMG3AB42HFC7TVXKBD35N4F7C",
    hex: "4099f20f39a406a590517b0fadf66b68cb523cec"
  },
  {
    slk: "TEEOH070619542",
    crockford: "5PJKG2HX9K97ETGM15B6J1T2R1VKJYCD",
    hex: "2da5380a3d4cd2776a140956690742c07739798d"
  },
  {
    slk: "O22OH070619543",
    crockford: "CQ00PF0BHMMHZA47VXSKCD6A3E5BYWXW",
    hex: "65c00b3c0b8d291fa887df733634ca1b8abf73bc"
  },
  {
    slk: "TEEO2070619549",
    crockford: "24S47HEWM6XK02R2XWSJM9WT6ND6BN6P",
    hex: "113243c5dca1bb300b02ef332a279a355a65d4d6"
  },
  {
    slk: "999OH070619541",
    crockford: "45B4VDJ3RX43A05ASGG26PMVGWBJGRXY",
    hex: "21564db643c7483500aacc20235a9b87172863be"
  },
  {
    slk: "TEE99070619542",
    crockford: "RQPY9ATA9KDQ5E51S9QBF96RVTAGZGX9",
    hex: "c5ede4ab4a4cdb72b8a1ca6eb7a4d8de950fc3a9"
  },
  {
    slk: "99999070619543",
    crockford: "M0DZ0V4F4KDTG0F991NT4ZDQW9C24D02",
    hex: "a01bf06c8f24dba801e9486ba27db7e258223402"
  },
  {
    slk: "TEEOH070619549",
    crockford: "75VMHRKX96JZDW7X4JEW8WZF9ZZDP1TM",
    hex: "397748e27d49a5f6f0fd249dc473ef4ffedb0754"
  },
  {
    slk: "TEEOH070619541",
    crockford: "82CZ43SSMG3AB42HFC7TVXKBD35N4F7C",
    hex: "4099f20f39a406a590517b0fadf66b68cb523cec"
  },
  {
    slk: "TEEOH090999991",
    crockford: "CER7VTWBKBSVFAX51WA1YX4266S99ZD4",
    hex: "63b07deb8b9af3b7aba50f141f748231b294fda4"
  },
  {
    slk: "MEIOH070619543",
    crockford: "AGYE3M2RGDRCEZPS5Z9EA9M5JQ5MY54W",
    hex: "543ce1d0588370c77ed92fd2e5268595cb4f149c"
  },
  {
    slk: "NN2NI131220002",
    crockford: "VK6XCFWS89KE5AJ66HY7Z195P8KNVFKM",
    hex: "dccdd63f994266e2aa46347c7f8525b2275dbe74"
  }
];

let invalid = [
  '33333010120013',
  'AAA99010120016',
  'AA999010120012',
  '99999010119993x',
  '9999901011999',
  '99999999999999'
];

test("slk is what it is expected to be", () => {
  var x = SLK.generate("David", "Bindloss", "1989-01-23", "1");
  expect(x.slk).toBe("INLAV230119891");
});

test("SLK handles missing.", () => {
  var x = SLK.generate("", "Bindloss", "1989-01-23", "1");
  expect(x.slk).toBe("INL99230119891");
  var x = SLK.generate("David", "", "1989-01-23", "1");
  expect(x.slk).toBe("999AV230119891");


});

test("SLK handles short names.", () => {
  var x = SLK.generate("Jo", "Bindloss", "1989-01-23", "1");
  expect(x.slk).toBe("INLO2230119891");
});


test("Invalid SLK date handled correctly.", () => {
  expect(() => {
    SLK.generate("Jo", "Bindloss", "23/01/1989", "1")
  }).toThrowError("Date of birth field for SLK generation");
});

test("invalid characters should still produce valid slk", () => {
  var x = SLK.generate('Jo,hn', 'St\' e-vens', '1954-06-07', '1')
  expect(x.slk).toBe("TEEOH070619541");

})

fixtures.map((x) => {
  test(`${x.slk} slk is valid`, () => {
    expect(SLK.is_valid(x.slk).slk).toBe(true);
    expect(SLK.is_valid(x.slk).date).toBe(true);
  });
  test(`${x.crockford} crockford is valid`, () => {
    expect(SLK.is_valid(x.crockford).crockford).toBe(true);
  });
  test(`${x.hex} hex is valid`, () => {
    expect(SLK.is_valid(x.hex).hex).toBe(true);
  });
});

invalid.map((x) => {
  test(`${x} is an invalid value`, () => {
    let n = Object.values(SLK.is_valid(x)).some(x => x === true);
    expect(n).toBe(false);
  });
})