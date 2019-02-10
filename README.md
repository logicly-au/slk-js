# Statistical Linkage Key
[Meteor Definition](https://meteor.aihw.gov.au/content/index.phtml/itemId/349510)

This small library handles both the generation and validation of an SLK.
The library itself exposes two functions:
 - generate
 - is_valid

## generate
The generate function takes 4 arguments:
 - First Name (Full)
 - Last Name (Full)
 - Date of Birth (Given in YYYY-MM-DD format)
 - Gender Identifier given as an integer from the following

| Gender  | Identifier  |
| Male    | 1           |
| Female  | 2           |
| Intersex or Indeterminate | 3 |
| Not stated/inadequately described | 9 |