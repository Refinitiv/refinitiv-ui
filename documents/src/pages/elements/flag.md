<!--
type: page
title: Flag
location: ./elements/flag
layout: default
-->

# Flag

::
```javascript
::flag::
```
```css
ef-flag {
  font-size: 4em;
}
```
```html
<ef-flag flag="us"></ef-flag>
<ef-flag flag="gb"></ef-flag>
<ef-flag flag="jp"></ef-flag>
<ef-flag flag="th"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/bo.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/pe.svg"></ef-flag>
```
::

`ef-flag` provides a collection of country flags.

### Usage

You can set a flag's code via the `flag` attribute to display the flag. Alternatively, instead of using the `flag` attribute, you can manually provide the url of an svg flag using the `src` attribute.

```html
<ef-flag flag="br"></ef-flag>
<ef-flag flag="ar"></ef-flag>
<ef-flag flag="co"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/bo.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/pe.svg"></ef-flag>
```

### Changing size

Flags are displayed in 4:3 aspect ratio. Flag size can be set using `font-size`.

```css
<style>
.small {
  font-size: 1em;
}
.medium {
  font-size: 2em;
}
.large {
  font-size: 60px;
}
</style>
```

```html
<ef-flag class="small" flag="gb"></ef-flag>
<ef-flag class="medium" flag="gb"></ef-flag>
<ef-flag class="large" flag="gb"></ef-flag>
```

### Preloading

`ef-flag` has the helper function to preload a set of flags. It could help to load flags faster if you have a known set of flags for use in the app. It accepts both flag name or svg location, either single flag or multiple.

Preload of flags will be deferred until the first `ef-flag` component created.

```javascript
import { preload } from "@refinitiv-ui/elements/flag";

preload("us");
preload("au", "nz");
preload(
  "https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/au.svg",
  "https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/nz.svg",
);
```


### Flag list

Below is a list of available flags in the Halo theme. You can use them with the `ef-flag`.

::
```css
.item {
  width: 96px;
  text-align: center;
  margin: 7px;
  border: solid 1px #aaa;
  padding-top: 20px;
}
.item:hover {
  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: #dddfe4;
}
.flag-name {
  font-size: 13px;
  border-top: solid 1px #aaa;
  margin-bottom: 5px;
  font-weight: 500;
}
.flag-fullname {
  padding: 5px;
  font-size: 13px;
  height: 50px;
}
#content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.no-content {
  justify-content: center;
  align-items: center;
  color: #8a8a96;
  background-color: #fdfdfd;
}
ef-flag {
  font-size: 30px;
}
#loader-content {
  display: flex;
  flex-wrap: wrap;
}
#loader-content .item {
  height: 73px;
  width: 73px;
  margin: 3px;
  background-color: #f3f3f3;
}
```
```html
<div id="loader-content"></div>
<div id="content"></div>
```
```javascript
::flag::

const FLAG_URL = 'https://cdn.refinitiv.com/public/libs/elf/info.json';
const content = document.getElementById('content');
const theme = 'halo';
const flagFullname = {
  "af": "Afghanistan",
  "ax": "Åland Islands",
  "al": "Albania",
  "dz": "Algeria",
  "as": "American Samoa",
  "ad": "Andorra",
  "ao": "Angola",
  "ai": "Anguilla",
  "aq": "Antarctica",
  "ag": "Antigua and Barbuda",
  "ar": "Argentina",
  "am": "Armenia",
  "aw": "Aruba",
  "au": "Australia",
  "at": "Austria",
  "az": "Azerbaijan",
  "bs": "Bahamas",
  "bh": "Bahrain",
  "bd": "Bangladesh",
  "bb": "Barbados",
  "by": "Belarus",
  "be": "Belgium",
  "bz": "Belize",
  "bj": "Benin",
  "bm": "Bermuda",
  "bt": "Bhutan",
  "bo": "Bolivia",
  "bq": "Bonaire, Sint Eustatius and Saba",
  "ba": "Bosnia and Herzegovina",
  "bw": "Botswana",
  "bv": "Bouvet Island",
  "br": "Brazil",
  "io": "British Indian Ocean Territory",
  "bn": "Brunei Darussalam",
  "bg": "Bulgaria",
  "bf": "Burkina Faso",
  "bi": "Burundi",
  "cv": "Cabo Verde",
  "kh": "Cambodia",
  "cm": "Cameroon",
  "ca": "Canada",
  "ky": "Cayman Islands",
  "cf": "Central African Republic",
  "td": "Chad",
  "cl": "Chile",
  "cn": "China",
  "cx": "Christmas Island",
  "cc": "Cocos (Keeling) Islands",
  "co": "Colombia",
  "km": "Comoros",
  "cd": "DR Congo",
  "cg": "Congo",
  "ck": "Cook Islands",
  "cr": "Costa Rica",
  "ci": "Côte d'Ivoire",
  "hr": "Croatia",
  "cu": "Cuba",
  "cw": "Curaçao",
  "cy": "Cyprus",
  "cz": "Czechia",
  "dk": "Denmark",
  "dj": "Djibouti",
  "dm": "Dominica",
  "do": "Dominican Republic",
  "ec": "Ecuador",
  "eg": "Egypt",
  "sv": "El Salvador",
  "gq": "Equatorial Guinea",
  "er": "Eritrea",
  "ee": "Estonia",
  "et": "Ethiopia",
  "eu": "European Union",
  "fk": "Falkland Islands [Malvinas]",
  "fo": "Faroe Islands",
  "fj": "Fiji",
  "fi": "Finland",
  "fr": "France",
  "gf": "French Guiana",
  "pf": "French Polynesia",
  "tf": "French Southern Territories",
  "ga": "Gabon",
  "gm": "Gambia",
  "ge": "Georgia",
  "de": "Germany",
  "gh": "Ghana",
  "gi": "Gibraltar",
  "gr": "Greece",
  "gl": "Greenland",
  "gd": "Grenada",
  "gp": "Guadeloupe",
  "gu": "Guam",
  "gt": "Guatemala",
  "gg": "Guernsey",
  "gn": "Guinea",
  "gw": "Guinea-Bissau",
  "gy": "Guyana",
  "ht": "Haiti",
  "hm": "Heard Island and McDonald Islands",
  "va": "Holy See",
  "hn": "Honduras",
  "hk": "Hong Kong",
  "hu": "Hungary",
  "is": "Iceland",
  "in": "India",
  "id": "Indonesia",
  "ir": "Iran",
  "iq": "Iraq",
  "ie": "Ireland",
  "im": "Isle of Man",
  "il": "Israel",
  "it": "Italy",
  "jm": "Jamaica",
  "jp": "Japan",
  "je": "Jersey",
  "jo": "Jordan",
  "kz": "Kazakhstan",
  "ke": "Kenya",
  "ki": "Kiribati",
  "kp": "North Korea",
  "kr": "South Korea",
  "kw": "Kuwait",
  "kg": "Kyrgyzstan",
  "la": "Laos",
  "lv": "Latvia",
  "lb": "Lebanon",
  "ls": "Lesotho",
  "lr": "Liberia",
  "ly": "Libya",
  "li": "Liechtenstein",
  "lt": "Lithuania",
  "lu": "Luxembourg",
  "mo": "Macao",
  "mk": "Macedonia",
  "mg": "Madagascar",
  "mw": "Malawi",
  "my": "Malaysia",
  "mv": "Maldives",
  "ml": "Mali",
  "mt": "Malta",
  "mh": "Marshall Islands",
  "mq": "Martinique",
  "mr": "Mauritania",
  "mu": "Mauritius",
  "yt": "Mayotte",
  "mx": "Mexico",
  "fm": "Micronesia",
  "md": "Moldova",
  "mc": "Monaco",
  "mn": "Mongolia",
  "me": "Montenegro",
  "ms": "Montserrat",
  "ma": "Morocco",
  "mz": "Mozambique",
  "mm": "Myanmar",
  "na": "Namibia",
  "nr": "Nauru",
  "np": "Nepal",
  "nl": "Netherlands",
  "nc": "New Caledonia",
  "nz": "New Zealand",
  "ni": "Nicaragua",
  "ne": "Niger",
  "ng": "Nigeria",
  "nu": "Niue",
  "nf": "Norfolk Island",
  "mp": "Northern Mariana Islands",
  "no": "Norway",
  "om": "Oman",
  "pk": "Pakistan",
  "pw": "Palau",
  "ps": "Palestine",
  "pa": "Panama",
  "pg": "Papua New Guinea",
  "py": "Paraguay",
  "pe": "Peru",
  "ph": "Philippines",
  "pn": "Pitcairn",
  "pl": "Poland",
  "pt": "Portugal",
  "pr": "Puerto Rico",
  "qa": "Qatar",
  "re": "Réunion",
  "ro": "Romania",
  "ru": "Russia",
  "rw": "Rwanda",
  "bl": "Saint Barthélemy",
  "sh": "Saint Helena, Ascension and Tristan da Cunha",
  "kn": "Saint Kitts and Nevis",
  "lc": "Saint Lucia",
  "mf": "Saint Martin (French part)",
  "pm": "Saint Pierre and Miquelon",
  "vc": "Saint Vincent and the Grenadines",
  "ws": "Samoa",
  "sm": "San Marino",
  "st": "Sao Tome and Principe",
  "sa": "Saudi Arabia",
  "gb-sct": "Scotland",
  "sn": "Senegal",
  "rs": "Serbia",
  "sc": "Seychelles",
  "sl": "Sierra Leone",
  "sg": "Singapore",
  "sx": "Sint Maarten (Dutch part)",
  "sk": "Slovakia",
  "si": "Slovenia",
  "sb": "Solomon Islands",
  "so": "Somalia",
  "za": "South Africa",
  "gs": "South Georgia and the South Sandwich Islands",
  "ss": "South Sudan",
  "es": "Spain",
  "lk": "Sri Lanka",
  "sd": "Sudan",
  "sr": "Suriname",
  "sj": "Svalbard and Jan Mayen",
  "sz": "Swaziland",
  "se": "Sweden",
  "ch": "Switzerland",
  "sy": "Syria",
  "tw": "Taiwan",
  "tj": "Tajikistan",
  "tz": "Tanzania",
  "th": "Thailand",
  "tl": "Timor-Leste",
  "tg": "Togo",
  "tk": "Tokelau",
  "to": "Tonga",
  "tt": "Trinidad and Tobago",
  "tn": "Tunisia",
  "tr": "Turkey",
  "tm": "Turkmenistan",
  "tc": "Turks and Caicos Islands",
  "tv": "Tuvalu",
  "ug": "Uganda",
  "ua": "Ukraine",
  "ae": "United Arab Emirates",
  "gb": "United Kingdom",
  "un": "United Nations",
  "um": "United States Minor Outlying Islands",
  "us": "United States of America",
  "uy": "Uruguay",
  "uz": "Uzbekistan",
  "vu": "Vanuatu",
  "ve": "Venezuela",
  "vn": "Viet Nam",
  "vg": "Virgin Islands (British)",
  "vi": "Virgin Islands (U.S.)",
  "gb-wls": "Wales",
  "wf": "Wallis and Futuna",
  "eh": "Western Sahara",
  "ye": "Yemen",
  "zm": "Zambia",
  "zw": "Zimbabwe",
  "es-ca": "Senyera (Catalonia)",
  "es-ga": "Galicia",
  "gb-eng": "England",
  "gb-nir": "Northern Ireland",
  "xk": "Palau"
};

const displayFlags = data => {
  let flagList = [];

  if (data) {
    if (!data || !data[theme] || !data[theme].flag || !data[theme].flag.length) {
      content.classList.add('no-content');
      content.innerHTML = 'No flag to display';
    }
    else {
      flagList = data[theme].flag;
    }
  }

  for (let i = 0; i < flagList.length; i += 1) {
    const name = flagList[i].name;
    const item = document.createElement('div');
    item.classList.add('item');

    const flag = document.createElement('ef-flag');
    flag.setAttribute('flag', name);

    const flagName = document.createElement('div');
    flagName.classList.add('flag-name');
    flagName.textContent = name;

    const fullname = document.createElement('div');
    fullname.classList.add('flag-fullname');
    fullname.textContent = flagFullname[name] || "";

    item.appendChild(flag);
    item.appendChild(fullname);
    item.appendChild(flagName);

    content.appendChild(item);
  }

  const loader = document.getElementById('loader-content');
  loader.parentNode.removeChild(loader);
}

const displayLoader = () => {
  const loader = document.getElementById('loader-content');
  for (let i = 0; i < 54; i += 1) {
    const item = document.createElement('div');
    item.classList.add('item');
    loader.appendChild(item);
  }
}

displayLoader();
await fetch(FLAG_URL)
  .then(response => response.json())
  .then(data => displayFlags(data));
```
::
