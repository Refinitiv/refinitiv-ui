export const nestedData = [
  {
    'value': 'AFR',
    'label': 'Africa',
    'items': [
      {
        'value': 'CAF',
        'label': 'Central African Republic'
      },
      {
        'value': 'TCD',
        'label': 'Chad'
      },
      {
        'value': 'COM',
        'label': 'Comoros'
      },
      {
        'value': 'COG',
        'label': 'Republic of the Congo'
      },
      {
        'value': 'COD',
        'label': 'Democratic Republic of the Congo'
      },
      {
        'value': 'DJI',
        'label': 'Djibouti'
      },
      {
        'value': 'EGY',
        'label': 'Egypt'
      },
      {
        'value': 'GNQ',
        'label': 'Equatorial Guinea'
      },
      {
        'value': 'ERI',
        'label': 'Eritrea'
      },
      {
        'value': 'ETH',
        'label': 'Ethiopia'
      },
      {
        'value': 'ATF',
        'label': 'French Southern and Antarctic Lands'
      },
      {
        'value': 'GAB',
        'label': 'Gabon'
      },
      {
        'value': 'GMB',
        'label': 'The Gambia'
      },
      {
        'value': 'GHA',
        'label': 'Ghana'
      },
      {
        'value': 'GIN',
        'label': 'Guinea'
      },
      {
        'value': 'GNB',
        'label': 'Guinea-Bissau'
      },
      {
        'value': 'CIV',
        'label': 'Ivory Coast'
      },
      {
        'value': 'KEN',
        'label': 'Kenya'
      },
      {
        'value': 'LSO',
        'label': 'Lesotho'
      },
      {
        'value': 'LBR',
        'label': 'Liberia'
      },
      {
        'value': 'LBY',
        'label': 'Libya'
      },
      {
        'value': 'MDG',
        'label': 'Madagascar'
      },
      {
        'value': 'MWI',
        'label': 'Malawi'
      },
      {
        'value': 'MLI',
        'label': 'Mali'
      },
      {
        'value': 'MRT',
        'label': 'Mauritania'
      }
    ]
  },
  {
    'value': 'EUR',
    'label': 'Europe',
    'items': [
      {
        'value': 'ALA',
        'label': 'Åland Islands'
      },
      {
        'value': 'ALB',
        'label': 'Albania'
      },
      {
        'value': 'AND',
        'label': 'Andorra'
      },
      {
        'value': 'AUT',
        'label': 'Austria'
      },
      {
        'value': 'BLR',
        'label': 'Belarus'
      },
      {
        'value': 'BEL',
        'label': 'Belgium'
      },
      {
        'value': 'BIH',
        'label': 'Bosnia and Herzegovina'
      },
      {
        'value': 'BGR',
        'label': 'Bulgaria'
      },
      {
        'value': 'HRV',
        'label': 'Croatia'
      },
      {
        'value': 'CYP',
        'label': 'Cyprus'
      },
      {
        'value': 'CZE',
        'label': 'Czech Republic'
      },
      {
        'value': 'DNK',
        'label': 'Denmark'
      },
      {
        'value': 'EST',
        'label': 'Estonia'
      },
      {
        'value': 'FRO',
        'label': 'Faroe Islands'
      },
      {
        'value': 'FIN',
        'label': 'Finland'
      },
      {
        'value': 'FRA',
        'label': 'France'
      },
      {
        'value': 'DEU',
        'label': 'Germany'
      },
      {
        'value': 'GIB',
        'label': 'Gibraltar'
      },
      {
        'value': 'GRC',
        'label': 'Greece'
      },
      {
        'value': 'GGY',
        'label': 'Guernsey'
      },
      {
        'value': 'VAT',
        'label': 'Holy See'
      },
      {
        'value': 'HUN',
        'label': 'Hungary'
      },
      {
        'value': 'ISL',
        'label': 'Iceland'
      },
      {
        'value': 'IRL',
        'label': 'Republic of Ireland'
      },
      {
        'value': 'IMN',
        'label': 'Isle of Man'
      },
      {
        'value': 'ITA',
        'label': 'Italy'
      },
      {
        'value': 'JEY',
        'label': 'Jersey'
      },
      {
        'value': 'LVA',
        'label': 'Latvia'
      },
      {
        'value': 'LIE',
        'label': 'Liechtenstein'
      },
      {
        'value': 'LTU',
        'label': 'Lithuania'
      },
      {
        'value': 'LUX',
        'label': 'Luxembourg'
      },
      {
        'value': 'MKD',
        'label': 'Republic of Macedonia'
      }
    ]
  }
];

export const nestedSelection = [
  nestedData[0].items[0],
  nestedData[0].items[3],
  nestedData[0].items[5],
  nestedData[1].items[5],
  nestedData[1].items[2],
  nestedData[1].items[3],
];

export const selectableCount = nestedData[0].items.length + nestedData[1].items.length;
