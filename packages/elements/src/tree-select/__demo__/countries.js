/* eslint-disable */
const treeCollection = [
  {
    'value': 'AFR',
    'label': 'Africa',
    'expanded': true,
    'items': [
      {
        'value': 'DZA',
        'label': 'Algeria',
        'items': [{
          'value': 'ADR',
          'label': 'Adrar',
          'selected': false,
          'items': []
        },
          {
            'value': 'TAM',
            'label': 'Tamanghasset',
            'selected': false,
            'items': [
              {
                'value': 'z1',
                'label': 'Zone 1',
                'selected': false,
                'items': [
                  {
                    'value': 'sz1',
                    'label': 'Sub Zone 1',
                    'selected': false,
                    'items': [
                      {
                        'value': 'sza',
                        'label': 'Sub Zone 1a (disabled)',
                        'disabled': true,
                        'selected': false,
                        'items': []
                      },
                      {
                        'value': 'szc',
                        'label': 'Sub Zone 1c',
                        'selected': false,
                        'items': []
                      },
                      {
                        'value': 'szcr',
                        'label': 'Sub Zone 1c - readonly',
                        'readonly': true,
                        'selected': false,
                        'items': []
                      }
                    ]
                  }
                ]
              },
              {
                'value': 'z2',
                'label': 'Zone 2',
                'selected': false,
                'items': []
              }
            ]
          },
          {
            'value': 'GUE',
            'label': 'Guelma',
            'selected': false,
            'items': []
          }]
      },
      {
        'value': 'IMG',
        'label': 'Hvalueden Land',
        'tooltip': 'The Hvalueden land',
        'items': [
          {
            'value': 'HID1',
            'label': 'Hvalueden One',
            'selected': false,
            'items': []
          },
          {
            'value': 'GUE2',
            'label': 'Guelma Extra',
            'selected': false,
            'items': []
          }
        ]
      },
      {
        'value': 'AGO',
        'label': 'Angola',
        'items': []
      },
      {
        'value': 'BEN',
        'label': 'Benin',
        'items': []
      },
      {
        'value': 'BWA',
        'label': 'Botswana - should be selected',
        'selected': true,
        'items': []
      },
      {
        'value': 'IOT',
        'label': 'British Indian Ocean Territory',
        'items': []
      },
      {
        'value': 'BFA',
        'label': 'Burkina Faso',
        'items': []
      },
      {
        'value': 'BDI',
        'label': 'Burundi',
        'items': []
      },
      {
        'value': 'CMR',
        'label': 'Cameroon',
        'items': []
      },
      {
        'value': 'CPV',
        'label': 'Cabo Verde',
        'items': []
      },
      {
        'value': 'CAF',
        'label': 'Central African Republic',
        'items': []
      },
      {
        'value': 'TCD',
        'label': 'Chad',
        'items': []
      },
      {
        'value': 'COM',
        'label': 'Comoros',
        'items': []
      },
      {
        'value': 'COG',
        'label': 'Republic of the Congo',
        'items': []
      },
      {
        'value': 'COD',
        'label': 'Democratic Republic of the Congo',
        'items': []
      },
      {
        'value': 'DJI',
        'label': 'Djibouti',
        'items': []
      },
      {
        'value': 'EGY',
        'label': 'Egypt',
        'items': []
      },
      {
        'value': 'GNQ',
        'label': 'Equatorial Guinea',
        'items': []
      },
      {
        'value': 'ERI',
        'label': 'Eritrea',
        'items': []
      },
      {
        'value': 'ETH',
        'label': 'Ethiopia',
        'items': []
      },
      {
        'value': 'ATF',
        'label': 'French Southern and Antarctic Lands',
        'items': []
      },
      {
        'value': 'GAB',
        'label': 'Gabon',
        'items': []
      },
      {
        'value': 'GMB',
        'label': 'The Gambia',
        'items': []
      },
      {
        'value': 'GHA',
        'label': 'Ghana',
        'items': []
      },
      {
        'value': 'GIN',
        'label': 'Guinea',
        'items': []
      },
      {
        'value': 'GNB',
        'label': 'Guinea-Bissau',
        'items': []
      },
      {
        'value': 'CIV',
        'label': 'Ivory Coast',
        'items': []
      },
      {
        'value': 'KEN',
        'label': 'Kenya',
        'items': []
      },
      {
        'value': 'LSO',
        'label': 'Lesotho',
        'items': []
      },
      {
        'value': 'LBR',
        'label': 'Liberia',
        'items': []
      },
      {
        'value': 'LBY',
        'label': 'Libya',
        'items': []
      },
      {
        'value': 'MDG',
        'label': 'Madagascar',
        'items': []
      },
      {
        'value': 'MWI',
        'label': 'Malawi',
        'items': []
      },
      {
        'value': 'MLI',
        'label': 'Mali',
        'items': []
      },
      {
        'value': 'MRT',
        'label': 'Mauritania',
        'items': []
      },
      {
        'value': 'MUS',
        'label': 'Mauritius',
        'items': []
      },
      {
        'value': 'MYT',
        'label': 'Mayotte',
        'items': []
      },
      {
        'value': 'MAR',
        'label': 'Morocco',
        'items': []
      },
      {
        'value': 'MOZ',
        'label': 'Mozambique',
        'items': []
      },
      {
        'value': 'NAM',
        'label': 'Namibia',
        'items': []
      },
      {
        'value': 'NER',
        'label': 'Niger',
        'items': []
      },
      {
        'value': 'NGA',
        'label': 'Nigeria',
        'items': []
      },
      {
        'value': 'REU',
        'label': 'Réunion',
        'items': []
      },
      {
        'value': 'RWA',
        'label': 'Rwanda',
        'items': []
      },
      {
        'value': 'SHN',
        'label': 'Saint Helena',
        'items': []
      },
      {
        'value': 'STP',
        'label': 'São Tomé and Príncipe',
        'items': []
      },
      {
        'value': 'SEN',
        'label': 'Senegal',
        'items': []
      },
      {
        'value': 'SYC',
        'label': 'Seychelles',
        'items': []
      },
      {
        'value': 'SLE',
        'label': 'Sierra Leone',
        'items': []
      },
      {
        'value': 'SOM',
        'label': 'Somalia',
        'items': []
      },
      {
        'value': 'ZAF',
        'label': 'South Africa',
        'items': []
      },
      {
        'value': 'SSD',
        'label': 'South Sudan',
        'items': []
      },
      {
        'value': 'SDN',
        'label': 'Sudan',
        'items': []
      },
      {
        'value': 'SWZ',
        'label': 'Swaziland',
        'items': []
      },
      {
        'value': 'TZA',
        'label': 'Tanzania',
        'items': []
      },
      {
        'value': 'TGO',
        'label': 'Togo',
        'items': []
      },
      {
        'value': 'TUN',
        'label': 'Tunisia',
        'items': []
      },
      {
        'value': 'UGA',
        'label': 'Uganda',
        'items': []
      },
      {
        'value': 'ESH',
        'label': 'Western Sahara',
        'items': []
      },
      {
        'value': 'ZMB',
        'label': 'Zambia',
        'items': []
      },
      {
        'value': 'ZWE',
        'label': 'Zimbabwe',
        'items': []
      }
    ]
  },
  {
    'value': 'EUR',
    'label': 'Europe',
    'items': [
      {
        'value': 'ALA',
        'label': 'Åland Islands',
        'items': []
      },
      {
        'value': 'ALB',
        'label': 'Albania',
        'items': []
      },
      {
        'value': 'AND',
        'label': 'Andorra',
        'items': []
      },
      {
        'value': 'AUT',
        'label': 'Austria',
        'items': []
      },
      {
        'value': 'BLR',
        'label': 'Belarus',
        'items': []
      },
      {
        'value': 'BEL',
        'label': 'Belgium',
        'items': []
      },
      {
        'value': 'BIH',
        'label': 'Bosnia and Herzegovina',
        'items': []
      },
      {
        'value': 'BGR',
        'label': 'Bulgaria',
        'items': []
      },
      {
        'value': 'HRV',
        'label': 'Croatia',
        'items': []
      },
      {
        'value': 'CYP',
        'label': 'Cyprus',
        'items': []
      },
      {
        'value': 'CZE',
        'label': 'Czech Republic',
        'items': []
      },
      {
        'value': 'DNK',
        'label': 'Denmark',
        'items': []
      },
      {
        'value': 'EST',
        'label': 'Estonia',
        'items': []
      },
      {
        'value': 'FRO',
        'label': 'Faroe Islands',
        'items': []
      },
      {
        'value': 'FIN',
        'label': 'Finland',
        'items': []
      },
      {
        'value': 'FRA',
        'label': 'France',
        'items': []
      },
      {
        'value': 'DEU',
        'label': 'Germany',
        'items': []
      },
      {
        'value': 'GIB',
        'label': 'Gibraltar',
        'items': []
      },
      {
        'value': 'GRC',
        'label': 'Greece',
        'items': []
      },
      {
        'value': 'GGY',
        'label': 'Guernsey',
        'items': []
      },
      {
        'value': 'VAT',
        'label': 'Holy See',
        'items': []
      },
      {
        'value': 'HUN',
        'label': 'Hungary',
        'items': []
      },
      {
        'value': 'ISL',
        'label': 'Iceland',
        'items': []
      },
      {
        'value': 'IRL',
        'label': 'Republic of Ireland',
        'items': []
      },
      {
        'value': 'IMN',
        'label': 'Isle of Man',
        'items': []
      },
      {
        'value': 'ITA',
        'label': 'Italy',
        'items': []
      },
      {
        'value': 'JEY',
        'label': 'Jersey',
        'items': []
      },
      {
        'value': 'LVA',
        'label': 'Latvia',
        'items': []
      },
      {
        'value': 'LIE',
        'label': 'Liechtenstein',
        'items': []
      },
      {
        'value': 'LTU',
        'label': 'Lithuania',
        'items': []
      },
      {
        'value': 'LUX',
        'label': 'Luxembourg',
        'items': []
      },
      {
        'value': 'MKD',
        'label': 'Republic of Macedonia',
        'items': []
      },
      {
        'value': 'MLT',
        'label': 'Malta',
        'items': []
      },
      {
        'value': 'MDA',
        'label': 'Moldova',
        'items': []
      },
      {
        'value': 'MCO',
        'label': 'Monaco',
        'items': []
      },
      {
        'value': 'MNE',
        'label': 'Montenegro',
        'items': []
      },
      {
        'value': 'NLD',
        'label': 'Netherlands',
        'items': []
      },
      {
        'value': 'NOR',
        'label': 'Norway',
        'items': []
      },
      {
        'value': 'POL',
        'label': 'Poland',
        'items': []
      },
      {
        'value': 'PRT',
        'label': 'Portugal',
        'items': []
      },
      {
        'value': 'KOS',
        'label': 'Republic of Kosovo',
        'items': []
      },
      {
        'value': 'ROU',
        'label': 'Romania',
        'items': []
      },
      {
        'value': 'RUS',
        'label': 'Russia',
        'items': []
      },
      {
        'value': 'SMR',
        'label': 'San Marino',
        'items': []
      },
      {
        'value': 'SRB',
        'label': 'Serbia',
        'items': []
      },
      {
        'value': 'SVK',
        'label': 'Slovakia',
        'items': []
      },
      {
        'value': 'SVN',
        'label': 'Slovenia',
        'items': []
      },
      {
        'value': 'ESP',
        'label': 'Spain',
        'items': []
      },
      {
        'value': 'SJM',
        'label': 'Svalbard and Jan Mayen',
        'items': []
      },
      {
        'value': 'SWE',
        'label': 'Sweden',
        'items': []
      },
      {
        'value': 'CHE',
        'label': 'Switzerland',
        'items': []
      },
      {
        'value': 'UKR',
        'label': 'Ukraine',
        'items': []
      },
      {
        'value': 'GBR',
        'label': 'United Kingdom',
        'items': []
      }
    ]
  },
  {
    'value': 'ASA',
    'label': 'Asia',
    'items': [
      {
        'value': 'AFG',
        'label': 'Afghanistan',
        'items': []
      },
      {
        'value': 'ARM',
        'label': 'Armenia',
        'items': []
      },
      {
        'value': 'AZE',
        'label': 'Azerbaijan',
        'items': []
      },
      {
        'value': 'BHR',
        'label': 'Bahrain',
        'items': []
      },
      {
        'value': 'BGD',
        'label': 'Bangladesh',
        'items': []
      },
      {
        'value': 'BTN',
        'label': 'Bhutan',
        'items': []
      },
      {
        'value': 'BRN',
        'label': 'Brunei',
        'items': []
      },
      {
        'value': 'KHM',
        'label': 'Cambodia',
        'items': []
      },
      {
        'value': 'CHN',
        'label': 'China',
        'items': []
      },
      {
        'value': 'GEO',
        'label': 'Georgia',
        'items': []
      },
      {
        'value': 'HKG',
        'label': 'Hong Kong',
        'items': []
      },
      {
        'value': 'IND',
        'label': 'India',
        'items': []
      },
      {
        'value': 'IDN',
        'label': 'Indonesia',
        'items': []
      },
      {
        'value': 'IRN',
        'label': 'Iran',
        'items': []
      },
      {
        'value': 'IRQ',
        'label': 'Iraq',
        'items': []
      },
      {
        'value': 'ISR',
        'label': 'Israel',
        'items': []
      },
      {
        'value': 'JPN',
        'label': 'Japan',
        'items': []
      },
      {
        'value': 'JOR',
        'label': 'Jordan',
        'items': []
      },
      {
        'value': 'KAZ',
        'label': 'Kazakhstan',
        'items': []
      },
      {
        'value': 'KWT',
        'label': 'Kuwait',
        'items': []
      },
      {
        'value': 'KGZ',
        'label': 'Kyrgyzstan',
        'items': []
      },
      {
        'value': 'LAO',
        'label': 'Laos',
        'items': []
      },
      {
        'value': 'LBN',
        'label': 'Lebanon',
        'items': []
      },
      {
        'value': 'MAC',
        'label': 'Macau',
        'items': []
      },
      {
        'value': 'MYS',
        'label': 'Malaysia',
        'items': []
      },
      {
        'value': 'MDV',
        'label': 'Maldives',
        'items': []
      },
      {
        'value': 'MNG',
        'label': 'Mongolia',
        'items': []
      },
      {
        'value': 'MMR',
        'label': 'Myanmar',
        'items': []
      },
      {
        'value': 'NPL',
        'label': 'Nepal',
        'items': []
      },
      {
        'value': 'PRK',
        'label': 'North Korea',
        'items': []
      },
      {
        'value': 'OMN',
        'label': 'Oman',
        'items': []
      },
      {
        'value': 'PAK',
        'label': 'Pakistan',
        'items': []
      },
      {
        'value': 'PSE',
        'label': 'Palestine',
        'items': []
      },
      {
        'value': 'PHL',
        'label': 'Philippines',
        'items': []
      },
      {
        'value': 'QAT',
        'label': 'Qatar',
        'items': []
      },
      {
        'value': 'SAU',
        'label': 'Saudi Arabia',
        'items': []
      },
      {
        'value': 'SGP',
        'label': 'Singapore',
        'items': []
      },
      {
        'value': 'KOR',
        'label': 'South Korea',
        'items': []
      },
      {
        'value': 'LKA',
        'label': 'Sri Lanka',
        'items': []
      },
      {
        'value': 'SYR',
        'label': 'Syria',
        'items': []
      },
      {
        'value': 'TWN',
        'label': 'Taiwan',
        'items': []
      },
      {
        'value': 'TJK',
        'label': 'Tajikistan',
        'items': []
      },
      {
        'value': 'THA',
        'label': 'Thailand',
        'items': []
      },
      {
        'value': 'TLS',
        'label': 'East Timor',
        'items': []
      },
      {
        'value': 'TUR',
        'label': 'Turkey',
        'items': []
      },
      {
        'value': 'TKM',
        'label': 'Turkmenistan',
        'items': []
      },
      {
        'value': 'ARE',
        'label': 'United Arab Emirates',
        'items': []
      },
      {
        'value': 'UZB',
        'label': 'Uzbekistan',
        'items': []
      },
      {
        'value': 'VNM',
        'label': 'Vietnam',
        'items': []
      },
      {
        'value': 'YEM',
        'label': 'Yemen',
        'items': []
      }
    ]
  },
  {
    'value': 'AME',
    'label': 'Americas',
    'items': [
      {
        'value': 'AIA',
        'label': 'Anguilla',
        'items': []
      },
      {
        'value': 'ATG',
        'label': 'Antigua and Barbuda',
        'items': []
      },
      {
        'value': 'ARG',
        'label': 'Argentina',
        'items': []
      },
      {
        'value': 'ABW',
        'label': 'Aruba',
        'items': []
      },
      {
        'value': 'BHS',
        'label': 'The Bahamas',
        'items': []
      },
      {
        'value': 'BRB',
        'label': 'Barbados',
        'items': []
      },
      {
        'value': 'BLZ',
        'label': 'Belize',
        'items': []
      },
      {
        'value': 'BMU',
        'label': 'Bermuda',
        'items': []
      },
      {
        'value': 'BOL',
        'label': 'Bolivia',
        'items': []
      },
      {
        'value': 'BES',
        'label': 'Bonaire',
        'items': []
      },
      {
        'value': 'BRA',
        'label': 'Brazil',
        'items': []
      },
      {
        'value': 'UMI',
        'label': 'United States Minor Outlying Islands',
        'items': []
      },
      {
        'value': 'VGB',
        'label': 'Virgin Islands (British)',
        'items': []
      },
      {
        'value': 'VIR',
        'label': 'Virgin Islands (U.S.)',
        'items': []
      },
      {
        'value': 'CAN',
        'label': 'Canada',
        'items': []
      },
      {
        'value': 'CYM',
        'label': 'Cayman Islands',
        'items': []
      },
      {
        'value': 'CHL',
        'label': 'Chile',
        'items': []
      },
      {
        'value': 'COL',
        'label': 'Colombia',
        'items': []
      },
      {
        'value': 'CRI',
        'label': 'Costa Rica',
        'items': []
      },
      {
        'value': 'CUB',
        'label': 'Cuba',
        'items': []
      },
      {
        'value': 'CUW',
        'label': 'Curaçao',
        'items': []
      },
      {
        'value': 'DMA',
        'label': 'Dominica',
        'items': []
      },
      {
        'value': 'DOM',
        'label': 'Dominican Republic',
        'items': []
      },
      {
        'value': 'ECU',
        'label': 'Ecuador',
        'items': []
      },
      {
        'value': 'SLV',
        'label': 'El Salvador',
        'items': []
      },
      {
        'value': 'FLK',
        'label': 'Falkland Islands',
        'items': []
      },
      {
        'value': 'GUF',
        'label': 'French Guiana',
        'items': []
      },
      {
        'value': 'GRL',
        'label': 'Greenland',
        'items': []
      },
      {
        'value': 'GRD',
        'label': 'Grenada',
        'items': []
      },
      {
        'value': 'GLP',
        'label': 'Guadeloupe',
        'items': []
      },
      {
        'value': 'GTM',
        'label': 'Guatemala',
        'items': []
      },
      {
        'value': 'GUY',
        'label': 'Guyana',
        'items': []
      },
      {
        'value': 'HTI',
        'label': 'Haiti',
        'items': []
      },
      {
        'value': 'HND',
        'label': 'Honduras',
        'items': []
      },
      {
        'value': 'JAM',
        'label': 'Jamaica',
        'items': []
      },
      {
        'value': 'MTQ',
        'label': 'Martinique',
        'items': []
      },
      {
        'value': 'MEX',
        'label': 'Mexico',
        'items': []
      },
      {
        'value': 'MSR',
        'label': 'Montserrat',
        'items': []
      },
      {
        'value': 'NIC',
        'label': 'Nicaragua',
        'items': []
      },
      {
        'value': 'PAN',
        'label': 'Panama',
        'items': []
      },
      {
        'value': 'PRY',
        'label': 'Paraguay',
        'items': []
      },
      {
        'value': 'PER',
        'label': 'Peru',
        'items': []
      },
      {
        'value': 'PRI',
        'label': 'Puerto Rico',
        'items': []
      },
      {
        'value': 'BLM',
        'label': 'Saint Barthélemy',
        'items': []
      },
      {
        'value': 'KNA',
        'label': 'Saint Kitts and Nevis',
        'items': []
      },
      {
        'value': 'LCA',
        'label': 'Saint Lucia',
        'items': []
      },
      {
        'value': 'MAF',
        'label': 'Saint Martin',
        'items': []
      },
      {
        'value': 'SPM',
        'label': 'Saint Pierre and Miquelon',
        'items': []
      },
      {
        'value': 'VCT',
        'label': 'Saint Vincent and the Grenadines',
        'items': []
      },
      {
        'value': 'SXM',
        'label': 'Sint Maarten',
        'items': []
      },
      {
        'value': 'SGS',
        'label': 'South Georgia',
        'items': []
      },
      {
        'value': 'SUR',
        'label': 'Suriname',
        'items': []
      },
      {
        'value': 'TTO',
        'label': 'Trinvaluead and Tobago',
        'items': []
      },
      {
        'value': 'TCA',
        'label': 'Turks and Caicos Islands',
        'items': []
      },
      {
        'value': 'USA',
        'label': 'United States',
        'items': []
      },
      {
        'value': 'URY',
        'label': 'Uruguay',
        'items': []
      },
      {
        'value': 'VEN',
        'label': 'Venezuela',
        'items': []
      }
    ]
  },
  {
    'value': 'OCE',
    'label': 'Oceania',
    'items': [
      {
        'value': 'ASM',
        'label': 'American Samoa',
        'items': []
      },
      {
        'value': 'AUS',
        'label': 'Australia',
        'items': []
      },
      {
        'value': 'CXR',
        'label': 'Christmas Island',
        'items': []
      },
      {
        'value': 'CCK',
        'label': 'Cocos (Keeling) Islands',
        'items': []
      },
      {
        'value': 'COK',
        'label': 'Cook Islands',
        'items': []
      },
      {
        'value': 'FJI',
        'label': 'Fiji',
        'items': []
      },
      {
        'value': 'PYF',
        'label': 'French Polynesia',
        'items': []
      },
      {
        'value': 'GUM',
        'label': 'Guam',
        'items': []
      },
      {
        'value': 'KIR',
        'label': 'Kiribati',
        'items': []
      },
      {
        'value': 'MHL',
        'label': 'Marshall Islands',
        'items': []
      },
      {
        'value': 'FSM',
        'label': 'Federated States of Micronesia',
        'items': []
      },
      {
        'value': 'NRU',
        'label': 'Nauru',
        'items': []
      },
      {
        'value': 'NCL',
        'label': 'New Caledonia',
        'items': []
      },
      {
        'value': 'NZL',
        'label': 'New Zealand',
        'items': []
      },
      {
        'value': 'NIU',
        'label': 'Niue',
        'items': []
      },
      {
        'value': 'NFK',
        'label': 'Norfolk Island',
        'items': []
      },
      {
        'value': 'MNP',
        'label': 'Northern Mariana Islands',
        'items': []
      },
      {
        'value': 'PLW',
        'label': 'Palau',
        'items': []
      },
      {
        'value': 'PNG',
        'label': 'Papua New Guinea',
        'items': []
      },
      {
        'value': 'PCN',
        'label': 'Pitcairn Islands',
        'items': []
      },
      {
        'value': 'WSM',
        'label': 'Samoa',
        'items': []
      },
      {
        'value': 'SLB',
        'label': 'Solomon Islands',
        'items': []
      },
      {
        'value': 'TKL',
        'label': 'Tokelau',
        'items': []
      },
      {
        'value': 'TON',
        'label': 'Tonga',
        'items': []
      },
      {
        'value': 'TUV',
        'label': 'Tuvalu',
        'items': []
      },
      {
        'value': 'VUT',
        'label': 'Vanuatu',
        'items': []
      },
      {
        'value': 'WLF',
        'label': 'Wallis and Futuna',
        'items': []
      }
    ]
  }
];
/* eslint-enable */
