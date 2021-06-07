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
        'selected': false,
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
        'selected': false,
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
        'selected': false,
        'items': []
      },
      {
        'value': 'BEN',
        'label': 'Benin',
        'selected': false,
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
        'selected': false,
        'items': []
      },
      {
        'value': 'BFA',
        'label': 'Burkina Faso',
        'selected': false,
        'items': []
      },
      {
        'value': 'BDI',
        'label': 'Burundi',
        'selected': false,
        'items': []
      },
      {
        'value': 'CMR',
        'label': 'Cameroon',
        'selected': false,
        'items': []
      },
      {
        'value': 'CPV',
        'label': 'Cabo Verde',
        'selected': false,
        'items': []
      },
      {
        'value': 'CAF',
        'label': 'Central African Republic',
        'selected': false,
        'items': []
      },
      {
        'value': 'TCD',
        'label': 'Chad',
        'selected': false,
        'items': []
      },
      {
        'value': 'COM',
        'label': 'Comoros',
        'selected': false,
        'items': []
      },
      {
        'value': 'COG',
        'label': 'Republic of the Congo',
        'selected': false,
        'items': []
      },
      {
        'value': 'COD',
        'label': 'Democratic Republic of the Congo',
        'selected': false,
        'items': []
      },
      {
        'value': 'DJI',
        'label': 'Djibouti',
        'selected': false,
        'items': []
      },
      {
        'value': 'EGY',
        'label': 'Egypt',
        'selected': false,
        'items': []
      },
      {
        'value': 'GNQ',
        'label': 'Equatorial Guinea',
        'selected': false,
        'items': []
      },
      {
        'value': 'ERI',
        'label': 'Eritrea',
        'selected': false,
        'items': []
      },
      {
        'value': 'ETH',
        'label': 'Ethiopia',
        'selected': false,
        'items': []
      },
      {
        'value': 'ATF',
        'label': 'French Southern and Antarctic Lands',
        'selected': false,
        'items': []
      },
      {
        'value': 'GAB',
        'label': 'Gabon',
        'selected': false,
        'items': []
      },
      {
        'value': 'GMB',
        'label': 'The Gambia',
        'selected': false,
        'items': []
      },
      {
        'value': 'GHA',
        'label': 'Ghana',
        'selected': false,
        'items': []
      },
      {
        'value': 'GIN',
        'label': 'Guinea',
        'selected': false,
        'items': []
      },
      {
        'value': 'GNB',
        'label': 'Guinea-Bissau',
        'selected': false,
        'items': []
      },
      {
        'value': 'CIV',
        'label': 'Ivory Coast',
        'selected': false,
        'items': []
      },
      {
        'value': 'KEN',
        'label': 'Kenya',
        'selected': false,
        'items': []
      },
      {
        'value': 'LSO',
        'label': 'Lesotho',
        'selected': false,
        'items': []
      },
      {
        'value': 'LBR',
        'label': 'Liberia',
        'selected': false,
        'items': []
      },
      {
        'value': 'LBY',
        'label': 'Libya',
        'selected': false,
        'items': []
      },
      {
        'value': 'MDG',
        'label': 'Madagascar',
        'selected': false,
        'items': []
      },
      {
        'value': 'MWI',
        'label': 'Malawi',
        'selected': false,
        'items': []
      },
      {
        'value': 'MLI',
        'label': 'Mali',
        'selected': false,
        'items': []
      },
      {
        'value': 'MRT',
        'label': 'Mauritania',
        'selected': false,
        'items': []
      },
      {
        'value': 'MUS',
        'label': 'Mauritius',
        'selected': false,
        'items': []
      },
      {
        'value': 'MYT',
        'label': 'Mayotte',
        'selected': false,
        'items': []
      },
      {
        'value': 'MAR',
        'label': 'Morocco',
        'selected': false,
        'items': []
      },
      {
        'value': 'MOZ',
        'label': 'Mozambique',
        'selected': false,
        'items': []
      },
      {
        'value': 'NAM',
        'label': 'Namibia',
        'selected': false,
        'items': []
      },
      {
        'value': 'NER',
        'label': 'Niger',
        'selected': false,
        'items': []
      },
      {
        'value': 'NGA',
        'label': 'Nigeria',
        'selected': false,
        'items': []
      },
      {
        'value': 'REU',
        'label': 'Réunion',
        'selected': false,
        'items': []
      },
      {
        'value': 'RWA',
        'label': 'Rwanda',
        'selected': false,
        'items': []
      },
      {
        'value': 'SHN',
        'label': 'Saint Helena',
        'selected': false,
        'items': []
      },
      {
        'value': 'STP',
        'label': 'São Tomé and Príncipe',
        'selected': false,
        'items': []
      },
      {
        'value': 'SEN',
        'label': 'Senegal',
        'selected': false,
        'items': []
      },
      {
        'value': 'SYC',
        'label': 'Seychelles',
        'selected': false,
        'items': []
      },
      {
        'value': 'SLE',
        'label': 'Sierra Leone',
        'selected': false,
        'items': []
      },
      {
        'value': 'SOM',
        'label': 'Somalia',
        'selected': false,
        'items': []
      },
      {
        'value': 'ZAF',
        'label': 'South Africa',
        'selected': false,
        'items': []
      },
      {
        'value': 'SSD',
        'label': 'South Sudan',
        'selected': false,
        'items': []
      },
      {
        'value': 'SDN',
        'label': 'Sudan',
        'selected': false,
        'items': []
      },
      {
        'value': 'SWZ',
        'label': 'Swaziland',
        'selected': false,
        'items': []
      },
      {
        'value': 'TZA',
        'label': 'Tanzania',
        'selected': false,
        'items': []
      },
      {
        'value': 'TGO',
        'label': 'Togo',
        'selected': false,
        'items': []
      },
      {
        'value': 'TUN',
        'label': 'Tunisia',
        'selected': false,
        'items': []
      },
      {
        'value': 'UGA',
        'label': 'Uganda',
        'selected': false,
        'items': []
      },
      {
        'value': 'ESH',
        'label': 'Western Sahara',
        'selected': false,
        'items': []
      },
      {
        'value': 'ZMB',
        'label': 'Zambia',
        'selected': false,
        'items': []
      },
      {
        'value': 'ZWE',
        'label': 'Zimbabwe',
        'selected': false,
        'items': []
      }
    ]
  },
  {
    'value': 'EUR',
    'label': 'Europe',
    'selected': false,
    'items': [
      {
        'value': 'ALA',
        'label': 'Åland Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'ALB',
        'label': 'Albania',
        'selected': false,
        'items': []
      },
      {
        'value': 'AND',
        'label': 'Andorra',
        'selected': false,
        'items': []
      },
      {
        'value': 'AUT',
        'label': 'Austria',
        'selected': false,
        'items': []
      },
      {
        'value': 'BLR',
        'label': 'Belarus',
        'selected': false,
        'items': []
      },
      {
        'value': 'BEL',
        'label': 'Belgium',
        'selected': false,
        'items': []
      },
      {
        'value': 'BIH',
        'label': 'Bosnia and Herzegovina',
        'selected': false,
        'items': []
      },
      {
        'value': 'BGR',
        'label': 'Bulgaria',
        'selected': false,
        'items': []
      },
      {
        'value': 'HRV',
        'label': 'Croatia',
        'selected': false,
        'items': []
      },
      {
        'value': 'CYP',
        'label': 'Cyprus',
        'selected': false,
        'items': []
      },
      {
        'value': 'CZE',
        'label': 'Czech Republic',
        'selected': false,
        'items': []
      },
      {
        'value': 'DNK',
        'label': 'Denmark',
        'selected': false,
        'items': []
      },
      {
        'value': 'EST',
        'label': 'Estonia',
        'selected': false,
        'items': []
      },
      {
        'value': 'FRO',
        'label': 'Faroe Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'FIN',
        'label': 'Finland',
        'selected': false,
        'items': []
      },
      {
        'value': 'FRA',
        'label': 'France',
        'selected': false,
        'items': []
      },
      {
        'value': 'DEU',
        'label': 'Germany',
        'selected': false,
        'items': []
      },
      {
        'value': 'GIB',
        'label': 'Gibraltar',
        'selected': false,
        'items': []
      },
      {
        'value': 'GRC',
        'label': 'Greece',
        'selected': false,
        'items': []
      },
      {
        'value': 'GGY',
        'label': 'Guernsey',
        'selected': false,
        'items': []
      },
      {
        'value': 'VAT',
        'label': 'Holy See',
        'selected': false,
        'items': []
      },
      {
        'value': 'HUN',
        'label': 'Hungary',
        'selected': false,
        'items': []
      },
      {
        'value': 'ISL',
        'label': 'Iceland',
        'selected': false,
        'items': []
      },
      {
        'value': 'IRL',
        'label': 'Republic of Ireland',
        'selected': false,
        'items': []
      },
      {
        'value': 'IMN',
        'label': 'Isle of Man',
        'selected': false,
        'items': []
      },
      {
        'value': 'ITA',
        'label': 'Italy',
        'selected': false,
        'items': []
      },
      {
        'value': 'JEY',
        'label': 'Jersey',
        'selected': false,
        'items': []
      },
      {
        'value': 'LVA',
        'label': 'Latvia',
        'selected': false,
        'items': []
      },
      {
        'value': 'LIE',
        'label': 'Liechtenstein',
        'selected': false,
        'items': []
      },
      {
        'value': 'LTU',
        'label': 'Lithuania',
        'selected': false,
        'items': []
      },
      {
        'value': 'LUX',
        'label': 'Luxembourg',
        'selected': false,
        'items': []
      },
      {
        'value': 'MKD',
        'label': 'Republic of Macedonia',
        'selected': false,
        'items': []
      },
      {
        'value': 'MLT',
        'label': 'Malta',
        'selected': false,
        'items': []
      },
      {
        'value': 'MDA',
        'label': 'Moldova',
        'selected': false,
        'items': []
      },
      {
        'value': 'MCO',
        'label': 'Monaco',
        'selected': false,
        'items': []
      },
      {
        'value': 'MNE',
        'label': 'Montenegro',
        'selected': false,
        'items': []
      },
      {
        'value': 'NLD',
        'label': 'Netherlands',
        'selected': false,
        'items': []
      },
      {
        'value': 'NOR',
        'label': 'Norway',
        'selected': false,
        'items': []
      },
      {
        'value': 'POL',
        'label': 'Poland',
        'selected': false,
        'items': []
      },
      {
        'value': 'PRT',
        'label': 'Portugal',
        'selected': false,
        'items': []
      },
      {
        'value': 'KOS',
        'label': 'Republic of Kosovo',
        'selected': false,
        'items': []
      },
      {
        'value': 'ROU',
        'label': 'Romania',
        'selected': false,
        'items': []
      },
      {
        'value': 'RUS',
        'label': 'Russia',
        'selected': false,
        'items': []
      },
      {
        'value': 'SMR',
        'label': 'San Marino',
        'selected': false,
        'items': []
      },
      {
        'value': 'SRB',
        'label': 'Serbia',
        'selected': false,
        'items': []
      },
      {
        'value': 'SVK',
        'label': 'Slovakia',
        'selected': false,
        'items': []
      },
      {
        'value': 'SVN',
        'label': 'Slovenia',
        'selected': false,
        'items': []
      },
      {
        'value': 'ESP',
        'label': 'Spain',
        'selected': false,
        'items': []
      },
      {
        'value': 'SJM',
        'label': 'Svalbard and Jan Mayen',
        'selected': false,
        'items': []
      },
      {
        'value': 'SWE',
        'label': 'Sweden',
        'selected': false,
        'items': []
      },
      {
        'value': 'CHE',
        'label': 'Switzerland',
        'selected': false,
        'items': []
      },
      {
        'value': 'UKR',
        'label': 'Ukraine',
        'selected': false,
        'items': []
      },
      {
        'value': 'GBR',
        'label': 'United Kingdom',
        'selected': false,
        'items': []
      }
    ]
  },
  {
    'value': 'ASA',
    'label': 'Asia',
    'selected': false,
    'items': [
      {
        'value': 'AFG',
        'label': 'Afghanistan',
        'selected': false,
        'items': []
      },
      {
        'value': 'ARM',
        'label': 'Armenia',
        'selected': false,
        'items': []
      },
      {
        'value': 'AZE',
        'label': 'Azerbaijan',
        'selected': false,
        'items': []
      },
      {
        'value': 'BHR',
        'label': 'Bahrain',
        'selected': false,
        'items': []
      },
      {
        'value': 'BGD',
        'label': 'Bangladesh',
        'selected': false,
        'items': []
      },
      {
        'value': 'BTN',
        'label': 'Bhutan',
        'selected': false,
        'items': []
      },
      {
        'value': 'BRN',
        'label': 'Brunei',
        'selected': false,
        'items': []
      },
      {
        'value': 'KHM',
        'label': 'Cambodia',
        'selected': false,
        'items': []
      },
      {
        'value': 'CHN',
        'label': 'China',
        'selected': false,
        'items': []
      },
      {
        'value': 'GEO',
        'label': 'Georgia',
        'selected': false,
        'items': []
      },
      {
        'value': 'HKG',
        'label': 'Hong Kong',
        'selected': false,
        'items': []
      },
      {
        'value': 'IND',
        'label': 'India',
        'selected': false,
        'items': []
      },
      {
        'value': 'IDN',
        'label': 'Indonesia',
        'selected': false,
        'items': []
      },
      {
        'value': 'IRN',
        'label': 'Iran',
        'selected': false,
        'items': []
      },
      {
        'value': 'IRQ',
        'label': 'Iraq',
        'selected': false,
        'items': []
      },
      {
        'value': 'ISR',
        'label': 'Israel',
        'selected': false,
        'items': []
      },
      {
        'value': 'JPN',
        'label': 'Japan',
        'selected': false,
        'items': []
      },
      {
        'value': 'JOR',
        'label': 'Jordan',
        'selected': false,
        'items': []
      },
      {
        'value': 'KAZ',
        'label': 'Kazakhstan',
        'selected': false,
        'items': []
      },
      {
        'value': 'KWT',
        'label': 'Kuwait',
        'selected': false,
        'items': []
      },
      {
        'value': 'KGZ',
        'label': 'Kyrgyzstan',
        'selected': false,
        'items': []
      },
      {
        'value': 'LAO',
        'label': 'Laos',
        'selected': false,
        'items': []
      },
      {
        'value': 'LBN',
        'label': 'Lebanon',
        'selected': false,
        'items': []
      },
      {
        'value': 'MAC',
        'label': 'Macau',
        'selected': false,
        'items': []
      },
      {
        'value': 'MYS',
        'label': 'Malaysia',
        'selected': false,
        'items': []
      },
      {
        'value': 'MDV',
        'label': 'Maldives',
        'selected': false,
        'items': []
      },
      {
        'value': 'MNG',
        'label': 'Mongolia',
        'selected': false,
        'items': []
      },
      {
        'value': 'MMR',
        'label': 'Myanmar',
        'selected': false,
        'items': []
      },
      {
        'value': 'NPL',
        'label': 'Nepal',
        'selected': false,
        'items': []
      },
      {
        'value': 'PRK',
        'label': 'North Korea',
        'selected': false,
        'items': []
      },
      {
        'value': 'OMN',
        'label': 'Oman',
        'selected': false,
        'items': []
      },
      {
        'value': 'PAK',
        'label': 'Pakistan',
        'selected': false,
        'items': []
      },
      {
        'value': 'PSE',
        'label': 'Palestine',
        'selected': false,
        'items': []
      },
      {
        'value': 'PHL',
        'label': 'Philippines',
        'selected': false,
        'items': []
      },
      {
        'value': 'QAT',
        'label': 'Qatar',
        'selected': false,
        'items': []
      },
      {
        'value': 'SAU',
        'label': 'Saudi Arabia',
        'selected': false,
        'items': []
      },
      {
        'value': 'SGP',
        'label': 'Singapore',
        'selected': false,
        'items': []
      },
      {
        'value': 'KOR',
        'label': 'South Korea',
        'selected': false,
        'items': []
      },
      {
        'value': 'LKA',
        'label': 'Sri Lanka',
        'selected': false,
        'items': []
      },
      {
        'value': 'SYR',
        'label': 'Syria',
        'selected': false,
        'items': []
      },
      {
        'value': 'TWN',
        'label': 'Taiwan',
        'selected': false,
        'items': []
      },
      {
        'value': 'TJK',
        'label': 'Tajikistan',
        'selected': false,
        'items': []
      },
      {
        'value': 'THA',
        'label': 'Thailand',
        'selected': false,
        'items': []
      },
      {
        'value': 'TLS',
        'label': 'East Timor',
        'selected': false,
        'items': []
      },
      {
        'value': 'TUR',
        'label': 'Turkey',
        'selected': false,
        'items': []
      },
      {
        'value': 'TKM',
        'label': 'Turkmenistan',
        'selected': false,
        'items': []
      },
      {
        'value': 'ARE',
        'label': 'United Arab Emirates',
        'selected': false,
        'items': []
      },
      {
        'value': 'UZB',
        'label': 'Uzbekistan',
        'selected': false,
        'items': []
      },
      {
        'value': 'VNM',
        'label': 'Vietnam',
        'selected': false,
        'items': []
      },
      {
        'value': 'YEM',
        'label': 'Yemen',
        'selected': false,
        'items': []
      }
    ]
  },
  {
    'value': 'AME',
    'label': 'Americas',
    'selected': false,
    'items': [
      {
        'value': 'AIA',
        'label': 'Anguilla',
        'selected': false,
        'items': []
      },
      {
        'value': 'ATG',
        'label': 'Antigua and Barbuda',
        'selected': false,
        'items': []
      },
      {
        'value': 'ARG',
        'label': 'Argentina',
        'selected': false,
        'items': []
      },
      {
        'value': 'ABW',
        'label': 'Aruba',
        'selected': false,
        'items': []
      },
      {
        'value': 'BHS',
        'label': 'The Bahamas',
        'selected': false,
        'items': []
      },
      {
        'value': 'BRB',
        'label': 'Barbados',
        'selected': false,
        'items': []
      },
      {
        'value': 'BLZ',
        'label': 'Belize',
        'selected': false,
        'items': []
      },
      {
        'value': 'BMU',
        'label': 'Bermuda',
        'selected': false,
        'items': []
      },
      {
        'value': 'BOL',
        'label': 'Bolivia',
        'selected': false,
        'items': []
      },
      {
        'value': 'BES',
        'label': 'Bonaire',
        'selected': false,
        'items': []
      },
      {
        'value': 'BRA',
        'label': 'Brazil',
        'selected': false,
        'items': []
      },
      {
        'value': 'UMI',
        'label': 'United States Minor Outlying Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'VGB',
        'label': 'Virgin Islands (British)',
        'selected': false,
        'items': []
      },
      {
        'value': 'VIR',
        'label': 'Virgin Islands (U.S.)',
        'selected': false,
        'items': []
      },
      {
        'value': 'CAN',
        'label': 'Canada',
        'selected': false,
        'items': []
      },
      {
        'value': 'CYM',
        'label': 'Cayman Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'CHL',
        'label': 'Chile',
        'selected': false,
        'items': []
      },
      {
        'value': 'COL',
        'label': 'Colombia',
        'selected': false,
        'items': []
      },
      {
        'value': 'CRI',
        'label': 'Costa Rica',
        'selected': false,
        'items': []
      },
      {
        'value': 'CUB',
        'label': 'Cuba',
        'selected': false,
        'items': []
      },
      {
        'value': 'CUW',
        'label': 'Curaçao',
        'selected': false,
        'items': []
      },
      {
        'value': 'DMA',
        'label': 'Dominica',
        'selected': false,
        'items': []
      },
      {
        'value': 'DOM',
        'label': 'Dominican Republic',
        'selected': false,
        'items': []
      },
      {
        'value': 'ECU',
        'label': 'Ecuador',
        'selected': false,
        'items': []
      },
      {
        'value': 'SLV',
        'label': 'El Salvador',
        'selected': false,
        'items': []
      },
      {
        'value': 'FLK',
        'label': 'Falkland Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'GUF',
        'label': 'French Guiana',
        'selected': false,
        'items': []
      },
      {
        'value': 'GRL',
        'label': 'Greenland',
        'selected': false,
        'items': []
      },
      {
        'value': 'GRD',
        'label': 'Grenada',
        'selected': false,
        'items': []
      },
      {
        'value': 'GLP',
        'label': 'Guadeloupe',
        'selected': false,
        'items': []
      },
      {
        'value': 'GTM',
        'label': 'Guatemala',
        'selected': false,
        'items': []
      },
      {
        'value': 'GUY',
        'label': 'Guyana',
        'selected': false,
        'items': []
      },
      {
        'value': 'HTI',
        'label': 'Haiti',
        'selected': false,
        'items': []
      },
      {
        'value': 'HND',
        'label': 'Honduras',
        'selected': false,
        'items': []
      },
      {
        'value': 'JAM',
        'label': 'Jamaica',
        'selected': false,
        'items': []
      },
      {
        'value': 'MTQ',
        'label': 'Martinique',
        'selected': false,
        'items': []
      },
      {
        'value': 'MEX',
        'label': 'Mexico',
        'selected': false,
        'items': []
      },
      {
        'value': 'MSR',
        'label': 'Montserrat',
        'selected': false,
        'items': []
      },
      {
        'value': 'NIC',
        'label': 'Nicaragua',
        'selected': false,
        'items': []
      },
      {
        'value': 'PAN',
        'label': 'Panama',
        'selected': false,
        'items': []
      },
      {
        'value': 'PRY',
        'label': 'Paraguay',
        'selected': false,
        'items': []
      },
      {
        'value': 'PER',
        'label': 'Peru',
        'selected': false,
        'items': []
      },
      {
        'value': 'PRI',
        'label': 'Puerto Rico',
        'selected': false,
        'items': []
      },
      {
        'value': 'BLM',
        'label': 'Saint Barthélemy',
        'selected': false,
        'items': []
      },
      {
        'value': 'KNA',
        'label': 'Saint Kitts and Nevis',
        'selected': false,
        'items': []
      },
      {
        'value': 'LCA',
        'label': 'Saint Lucia',
        'selected': false,
        'items': []
      },
      {
        'value': 'MAF',
        'label': 'Saint Martin',
        'selected': false,
        'items': []
      },
      {
        'value': 'SPM',
        'label': 'Saint Pierre and Miquelon',
        'selected': false,
        'items': []
      },
      {
        'value': 'VCT',
        'label': 'Saint Vincent and the Grenadines',
        'selected': false,
        'items': []
      },
      {
        'value': 'SXM',
        'label': 'Sint Maarten',
        'selected': false,
        'items': []
      },
      {
        'value': 'SGS',
        'label': 'South Georgia',
        'selected': false,
        'items': []
      },
      {
        'value': 'SUR',
        'label': 'Suriname',
        'selected': false,
        'items': []
      },
      {
        'value': 'TTO',
        'label': 'Trinvaluead and Tobago',
        'selected': false,
        'items': []
      },
      {
        'value': 'TCA',
        'label': 'Turks and Caicos Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'USA',
        'label': 'United States',
        'selected': false,
        'items': []
      },
      {
        'value': 'URY',
        'label': 'Uruguay',
        'selected': false,
        'items': []
      },
      {
        'value': 'VEN',
        'label': 'Venezuela',
        'selected': false,
        'items': []
      }
    ]
  },
  {
    'value': 'OCE',
    'label': 'Oceania',
    'selected': false,
    'items': [
      {
        'value': 'ASM',
        'label': 'American Samoa',
        'selected': false,
        'items': []
      },
      {
        'value': 'AUS',
        'label': 'Australia',
        'selected': false,
        'items': []
      },
      {
        'value': 'CXR',
        'label': 'Christmas Island',
        'selected': false,
        'items': []
      },
      {
        'value': 'CCK',
        'label': 'Cocos (Keeling) Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'COK',
        'label': 'Cook Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'FJI',
        'label': 'Fiji',
        'selected': false,
        'items': []
      },
      {
        'value': 'PYF',
        'label': 'French Polynesia',
        'selected': false,
        'items': []
      },
      {
        'value': 'GUM',
        'label': 'Guam',
        'selected': false,
        'items': []
      },
      {
        'value': 'KIR',
        'label': 'Kiribati',
        'selected': false,
        'items': []
      },
      {
        'value': 'MHL',
        'label': 'Marshall Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'FSM',
        'label': 'Federated States of Micronesia',
        'selected': false,
        'items': []
      },
      {
        'value': 'NRU',
        'label': 'Nauru',
        'selected': false,
        'items': []
      },
      {
        'value': 'NCL',
        'label': 'New Caledonia',
        'selected': false,
        'items': []
      },
      {
        'value': 'NZL',
        'label': 'New Zealand',
        'selected': false,
        'items': []
      },
      {
        'value': 'NIU',
        'label': 'Niue',
        'selected': false,
        'items': []
      },
      {
        'value': 'NFK',
        'label': 'Norfolk Island',
        'selected': false,
        'items': []
      },
      {
        'value': 'MNP',
        'label': 'Northern Mariana Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'PLW',
        'label': 'Palau',
        'selected': false,
        'items': []
      },
      {
        'value': 'PNG',
        'label': 'Papua New Guinea',
        'selected': false,
        'items': []
      },
      {
        'value': 'PCN',
        'label': 'Pitcairn Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'WSM',
        'label': 'Samoa',
        'selected': false,
        'items': []
      },
      {
        'value': 'SLB',
        'label': 'Solomon Islands',
        'selected': false,
        'items': []
      },
      {
        'value': 'TKL',
        'label': 'Tokelau',
        'selected': false,
        'items': []
      },
      {
        'value': 'TON',
        'label': 'Tonga',
        'selected': false,
        'items': []
      },
      {
        'value': 'TUV',
        'label': 'Tuvalu',
        'selected': false,
        'items': []
      },
      {
        'value': 'VUT',
        'label': 'Vanuatu',
        'selected': false,
        'items': []
      },
      {
        'value': 'WLF',
        'label': 'Wallis and Futuna',
        'selected': false,
        'items': []
      }
    ]
  }
];
/* eslint-enable */
