<!-- 
title: Date & Time
location: ./utils/date-time
type: page
layout: default
-->

::status-complete::

# Date & Time

The utility provides the comprehensive set of tools to manipulate with date/time/datetime strings. It overcomes the problems with JavaScript `Date` implementation, such as:

- string to date parsing is error-prone and can be different in browsers
- Date object is mutable
- daylight saving behavior is unpredictable
- computation APIs are unwieldy or unavailable
- defining and parsing dates in _UTC_, _Local_ or _Developer Defined_ timezones is error-prone

The utility comes with the ability to parse localised dates and has over 40 functions for date manipulation.

```typescript
import { Locale, addUnit } from '@refinitiv-ui/utils/date.js';

// Create locale object for en-GB
const locale = Locale.fromOptions({ dateStyle: 'short', timeStyle: 'short' }, 'en-GB');

// Parse localised date
const date = locale.parse('21/09/2022, 09:21'); // => '2022-09-21T09:21'

// Add 5 months
addUnit(date, 'month', 5); // => '2023-02-21T09:21'
```

## Format Tokens

The utility works with the following selection of `ISO8601` date string formats (called as format tokens).

The developer can use any _date_, _time_ or _datetime_ format tokens. The output value has the same format as the input value.

#### date

| Format | Examples |
| --- | --- |
| `yyyy-MM-dd` | `2020-06-30` &#124; `0030-04-30` &#124; `-0002-12-31` |
| `yyyy-MM` | `2020-06` &#124; `0030-04` &#124; `-0002-12` |
| `yyyy` | `2020` &#124; `0030` &#124; `-0002` |

#### time

| Format | Examples |
| --- | --- |
| `HH:mm` | `00:00` &#124; `23:59` |
| `HH:mm:ss` | `00:00:00` &#124; `23:59:59` |
| `HH:mm:ss.SSS` | `00:00:00.000` &#124; `23:59:59.000` |

#### datetime

| Format | Examples |
| --- | --- |
| `yyyy-MM-dd'T'HH:mm` | `1988-04-21T00:00` &#124; `0030-04-30T23:59` &#124; `-0002-12-31T13:32` |
| `yyyy-MM-dd'T'HH:mm:ss` | `1988-04-21T00:00:00` &#124; `0030-04-30T23:59:59` &#124; `-0002-12-31T13:32:30` |
| `yyyy-MM-dd'T'HH:mm:ss.SSS` | `1988-04-21T00:00:00.000` &#124; `0030-04-30T23:59:59.999` &#124; `-0002-12-31T13:32:30.378` |

## Common Helpers

### addMonths
Add the specified number of months to the given value.

```typescript
import { addMonths } from '@refinitiv-ui/utils/date.js';

// Add 5 months
addMonths('2022-09-30T00:00:00', 5); // => 2023-02-28T00:00:00
```

#### Syntax

```text
addMonths(value, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to be changed |
| amount | Number | the amount of full months to be added |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with the months added |

#### Exceptions

| Description |
| --- |
| Invalid value |

### addOffset
Add an offset in milliseconds to the given value.

```typescript
import { addOffset } from '@refinitiv-ui/utils/date.js';

// Add 1000 milliseconds
addOffset('2022-09-30T00:00:00', 1000); // => 2022-09-30T00:00:01
```

#### Syntax

```text
addOffset(value, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the date string to be changed |
| amount | Number | the number of milliseconds to add |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with the milliseconds added |

#### Exceptions

| Description |
| --- |
| Invalid value |

### addUnit
Add the specified number of units to the given value.

```typescript
import { addUnit } from '@refinitiv-ui/utils/date.js';

// Add 1 year
addUnit('2022-09-30T00:00:00', 'year', 1); // => 2023-09-30T00:00:00

// Substract 5 days
addUnit('2022-09-30T00:00:00', 'day', -5); // => 2022-09-25T00:00:00
```

#### Syntax

```text
addUnit(value, unit, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to be changed |
| unit | Unit | the unit to operate with |
| amount | Number | the amount of units to be added, positive number to increase, negative to decrease |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with units added |

#### Exceptions

| Description |
| --- |
| Invalid value |

### format
Format `Date` or `Segment` to specified format token using user _Local_ time zone.

```typescript
import { format, DateFormat, DateTimeFormat, TimeFormat } from '@refinitiv-ui/utils/date.js';

format(new Date(), DateTimeFormat.yyyMMddTHHmm);

format({
  year: 2022, month: 8, day: 30
}, DateFormat.yyyyMM); // => 2022-09

format({
  hours: 20, minutes: 59, seconds: 48, milliseconds: 123
}, TimeFormat.HHmmssSSS); // => 20:59:48.123
```

#### Syntax

```text
format(value, [format = yyyy-MM-dd'T'HH:mm]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | Date &#124; Segment | the original date or segment |
| format <br> _(optional)_ | String | format token |

#### Returns

| Type | Description |
| --- | --- |
| String | the formatted date or segment |

#### Exceptions

| Description |
| --- |
| Invalid value |
| Invalid format |

### getDaysInMonth

Get number of day in a month.

```typescript
import { getDaysInMonth } from '@refinitiv-ui/utils/date.js';

// Get number of day in February, 2022
getDaysInMonth(2022, 1); // => 28

// Get number of day in February, 2020
getDaysInMonth(2020, 1); // => 29
```

#### Syntax

```text
getDaysInMonth(year, month);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| year | Number | the year to check |
| month | Number | the month to check |

#### Returns

| Type | Description |
| --- | --- |
| Number | the number of days in month |

### getFormat

Try to guess value format token.

```typescript
import { getFormat } from '@refinitiv-ui/utils/date.js';

getFormat('2022-09-30T00:00:00'); // => yyyy-MM-dd'T'HH:mm:ss
getFormat('2022-09'); // => yyyy-MM
getFormat('00:00:00.000'); // => HH:mm:ss.SSS
getFormat('Invalid Date'); // => null
```

#### Syntax

```text
getFormat(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the date value |

#### Returns

| Type | Description |
| --- | --- |
| String &#124; `null` | the format token |

### isAfter
Is the first date after the second one?

```typescript
import { isAfter } from '@refinitiv-ui/utils/date.js';

isAfter('2022-09-30', '1988-02-17'); // => true
isAfter('11:00', '14:00'); // => false
```

#### Syntax

```text
isAfter(value, compare);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value that should be after the other one to return true |
| compare | String | the value to compare with |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is after the compare |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isAM

Check if the value is before the noon, with midnight starting at 12:00 am.

```typescript
import { isAM } from '@refinitiv-ui/utils/date.js';

isAM('2022-09-30T13:00'); // => false
isAM('09:00'); // => true
```

#### Syntax

```text
isAM(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is before the noon |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isBefore

Is the first date before the second one?

```typescript
import { isBefore } from '@refinitiv-ui/utils/date.js';

isBefore('2022-09-30', '1988-02-17'); // => false
isBefore('11:00', '14:00'); // => true
```

#### Syntax

```text
isBefore(value, compare);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value that should be before the other one to return true |
| compare | String | the value to compare with |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is before the compare |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isPM

Check if the value is noon or after the noon, with midnight starting at 12:00 am.

```typescript
import { isPM } from '@refinitiv-ui/utils/date.js';

isPM('2022-09-30T13:00'); // => true
isPM('09:00'); // => false
```

#### Syntax

```text
isPM(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is noon or after the noon |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isSameDay

Are the given dates in the same day?

```typescript
import { isSameDay } from '@refinitiv-ui/utils/date.js';

isSameDay('2022-09-30T12:00', '2022-09-30T19:17'); // => true
isSameDay('2022-09-13', '2022-09-30'); // => false
```

#### Syntax

```text
isSameDay(value, compare);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the first date to check |
| compare | String | the second date to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the dates are in the same day |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isSameMonth

Are the given dates in the same month?

```typescript
import { isSameMonth } from '@refinitiv-ui/utils/date.js';

isSameMonth('2022-09-17', '2022-09-30'); // => true
isSameMonth('2022-09-13', '2022-11-30'); // => false
```

#### Syntax

```text
isSameMonth(value, compare);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the first date to check |
| compare | String | the second date to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the dates are in the same month |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isSameYear

Are the given dates in the same year?

```typescript
import { isSameYear } from '@refinitiv-ui/utils/date.js';

isSameYear('2022-09-13', '2022-11-30'); // => true
isSameYear('2022-09-13', '2024-11-30'); // => false
```

#### Syntax

```text
isSameYear(value, compare);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the first date to check |
| compare | String | the second date to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the dates are in the same year |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isThisMonth

Does the given value falls into current month?

```typescript
import { isThisMonth } from '@refinitiv-ui/utils/date.js';

isThisMonth('2022-09-17');
```

#### Syntax

```text
isThisMonth(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value month is current month |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isThisYear

Does the given value falls into current year?

```typescript
import { isThisYear } from '@refinitiv-ui/utils/date.js';

isThisYear('2022-09-17');
```

#### Syntax

```text
isThisYear(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value year is current year |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isToday

Is the given value today?

```typescript
import { isToday } from '@refinitiv-ui/utils/date.js';

isToday('2022-09-17');
```

#### Syntax

```text
isToday(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is today |

#### Exceptions

| Description |
| --- |
| Invalid value |

### isValidDate

Check if the value confirms the date format.

```typescript
import { isValidDate, DateFormat } from '@refinitiv-ui/utils/date.js';

isValidDate('2022-09-17'); // => true
isValidDate('2022-09'); // => true
isValidDate('2022-09-17T12:00'); // => false
isValidDate('2022-09-17', DateFormat.yyyyMM); // => false
```

#### Syntax

```text
isValidDate(value, [format]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |
| format <br> _(optional)_ | String | one of date formats or try to guess |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is valid date |

### isValidDateTime

Check if the value confirms the datetime format.

```typescript
import { isValidDateTime, DateTimeFormat } from '@refinitiv-ui/utils/date.js';

isValidDateTime('2022-09-17T12:00'); // => true
isValidDateTime('2022-09-17T12:00:45'); // => true
isValidDateTime('2022-09-17'); // => false
isValidDateTime('2022-09-17T12:00:45', DateTimeFormat.yyyMMddTHHmmssSSS); // => false
```

#### Syntax

```text
isValidDateTime(value, [format]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |
| format <br> _(optional)_ | String | one of datetime formats or try to guess |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is valid datetime |

### isValidTime

Check if the value confirms the time format.

```typescript
import { isValidTime, TimeFormat } from '@refinitiv-ui/utils/date.js';

isValidTime('12:00'); // => true
isValidTime('12:00:49'); // => true
isValidTime('2022-09-17T12:00'); // => false
isValidTime('12:00', TimeFormat.HHmmss); // => false
```

#### Syntax

```text
isValidTime(value, [format]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |
| format <br> _(optional)_ | String | one of time formats or try to guess |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is valid time |

### isWeekend

Does the given date falls on a weekend, assuming that weekend is Saturday and Sunday?

```typescript
import { isWeekend } from '@refinitiv-ui/utils/date.js';

isWeekend('2022-09-17');
```

#### Syntax

```text
isWeekend(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to check |

#### Returns

| Type | Description |
| --- | --- |
| Boolean | the value is weekend |

#### Exceptions

| Description |
| --- |
| Invalid value |

### iterateUnit

Cycles through the unit by a specified amount, not affecting other parts of the date, unless the date is invalid.

```typescript
import { iterateUnit } from '@refinitiv-ui/utils/date.js';

// Iterate 1 day
iterateUnit('2022-09-30T12:40', 'day', 1); // => 2022-09-01T12:40

// Iterate -1 month
iterateUnit('2022-03-31', 'month', -1); // => 2022-02-28

// Iterate 12 hours
iterateUnit('14:15', 'hour', 12); // => 02:15
```

#### Syntax

```text
iterateUnit(value, unit, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to be changed |
| unit | Unit | the unit to operate with |
| amount | Number | the amount of units to be iterated, positive number to increase, negative to decrease |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with units iterated |

#### Exceptions

| Description |
| --- |
| Invalid value |

### parse

Parse value or `Segment` to `Date` object using user _Local_ time zone.

If the value does not contain information about year, month or day, the current ones are used.

If the value does not contain information about time, zeros are used.

```typescript
import { parse } from '@refinitiv-ui/utils/date.js';

parse('2022-09-30T12:40'); // => Date, e.g. Fri Sep 30 2022 12:40:00 GMT+0100 (BST)
parse('12:40'); // => Date, e.g. Fri Jul 08 2022 12:40:00 GMT+0100 (BST)
parse({
  year: 2022, month: 8, day: 30
}); // => Date, e.g. Fri Sep 30 2022 00:00:00 GMT+0100 (BST)
```

#### Syntax

```text
parse(value);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | Date &#124; Segment | the value to parse |

#### Returns

| Type | Description |
| --- | --- |
| Date | a `Date` object for value |

#### Exceptions

| Description |
| --- |
| Invalid value |

### subMonths
Subtract the specified number of months to the given value.

```typescript
import { subMonths } from '@refinitiv-ui/utils/date.js';

// Subtract 5 months
subMonths('2022-09-30T00:00:00', 5); // => 2022-05-30T00:00:00
```

#### Syntax

```text
subMonths(value, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to be changed |
| amount | Number | the amount of full months to be subtracted |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with the months subtracted |

#### Exceptions

| Description |
| --- |
| Invalid value |

### subOffset
Subtract an offset in milliseconds to the given value.

```typescript
import { subOffset } from '@refinitiv-ui/utils/date.js';

// Subtract 1000 milliseconds
subOffset('2022-09-30T00:00:59', 1000); // => 2022-09-30T00:00:58
```

#### Syntax

```text
subOffset(value, amount);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the value to be changed |
| amount | Number | the number of milliseconds to subtract |

#### Returns

| Type | Description |
| --- | --- |
| String | the new value with the milliseconds subtracted |

#### Exceptions

| Description |
| --- |
| Invalid value |

### toDateSegment

Parse value or `Date` object into `DateSegment`.

```typescript
import { toDateSegment } from '@refinitiv-ui/utils/date.js';

toDateSegment('2022-09-03T11:48'); // => { year: 2022, month: 8, day: 3 }
toDateSegment('2022-09-03'); // => { year: 2022, month: 8, day: 3 }
toDateSegment(new Date(2022, 8, 3), true); // => in BST timezone: { year: 2022, month: 8, day: 2 }
toDateSegment(new Date(2022, 8, 3), false); // => in BST timezone: { year: 2022, month: 8, day: 3 }
```

#### Syntax

```text
toDateSegment(value, [isUTC = false]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String &#124; Date | the string value or `Date` |
| isUTC <br> _(optional)_ | Boolean | parse `Date` in _Local_ or _UTC_ timezone |

#### Returns

| Type | Description |
| --- | --- |
| DateSegment | a `DateSegment` object for value |

### toDateTimeSegment

Parse value or `Date` object into `DateTimeSegment`.

```typescript
import { toDateTimeSegment } from '@refinitiv-ui/utils/date.js';

toDateTimeSegment('2022-09-03T11:48'); // => { year: 2022, month: 8, day: 3, hours: 11, minutes: 48, seconds: 0, milliseconds: 0 }
toDateTimeSegment(new Date(2022, 8, 3), true); // => in BST timezone: { year: 2022, month: 8, day: 2, hours: 23, minutes: 0, seconds: 0, milliseconds: 0 }
toDateTimeSegment(new Date(2022, 8, 3), false); // => in BST timezone: { year: 2022, month: 8, day: 3, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
```

#### Syntax

```text
toDateTimeSegment(value, [isUTC = false]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String &#124; Date | the string value or `Date` |
| isUTC <br> _(optional)_ | Boolean | parse `Date` in _Local_ or _UTC_ timezone |

#### Returns

| Type | Description |
| --- | --- |
| DateTimeSegment | a `DateTimeSegment` object for value |

### toSegment

Parse value or `Date` object into `DateSegment`, `TimeSegment` or `DateTimeSegment` depending on the format.

```typescript
import { toSegment } from '@refinitiv-ui/utils/date.js';

toSegment('2022-09-03T11:48'); // => { year: 2022, month: 8, day: 3, hours: 11, minutes: 48, seconds: 0, milliseconds: 0 }
toSegment('11:48'); // => { hours: 11, minutes: 48, seconds: 0, milliseconds: 0 }
toSegment('2022-09-03'); // => { year: 2022, month: 8, day: 3 }
toSegment(new Date(2022, 8, 3), true); // => in BST timezone: { year: 2022, month: 8, day: 2, hours: 23, minutes: 0, seconds: 0, milliseconds: 0 }
toSegment(new Date(2022, 8, 3), false); // => in BST timezone: { year: 2022, month: 8, day: 3, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
```

#### Syntax

```text
toSegment(value, [isUTC = false]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String &#124; Date | the string value or `Date` |
| isUTC <br> _(optional)_ | Boolean | parse `Date` in _Local_ or _UTC_ timezone |

#### Returns

| Type | Description |
| --- | --- |
| Segment | a `Segment` object for value |

#### Exceptions

| Description |
| --- |
| Invalid value |

### toTimeSegment

Parse value or `Date` object into `TimeSegment`.

```typescript
import { toTimeSegment } from '@refinitiv-ui/utils/date.js';

toTimeSegment('11:48'); // => { hours: 11, minutes: 48, seconds: 0, milliseconds: 0 }
toTimeSegment(new Date(2022, 8, 3), true); // => in BST timezone: { year: 2022, month: 8, day: 2, hours: 23, minutes: 0, seconds: 0, milliseconds: 0 }
toTimeSegment(new Date(2022, 8, 3), false); // => in BST timezone: { year: 2022, month: 8, day: 3, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
```

#### Syntax

```text
toTimeSegment(value, [isUTC = false]);
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String &#124; Date | the string value or `Date` |
| isUTC <br> _(optional)_ | Boolean | parse `Date` in _Local_ or _UTC_ timezone |

#### Returns

| Type | Description |
| --- | --- |
| TimeSegment | a `TimeSegment` object for value |

### utcFormat

Same as [format](#format), but using _UTC_ time zone.

### utcParse

Same as [parse](#parse), but using _UTC_ time zone.

## Localised Date Parsing

The util supports parsing localised date strings according to [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) specification.

### constructor

The developer starts creating the `Locale` object from [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

// You must provide `timeZone` object 
const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' });
const locale = new Locale(formatter);

locale.parse('21/04/1988, 09:21'); // => '1988-04-21T09:21'
```

The developer must ensure that these defaults are passed to `Locale` configuration:

```javascript
{
  timeZone: 'UTC', // UTC timezone
  calendar: 'gregory', // Gregorian calendar
  numberingSystem: 'latn', // Latin numbering system
  timeZoneName: undefined // Timezones are not supported
}
```

#### Syntax

```text
new Locale(formatter)
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| formatter | Intl.DateTimeFormat | `Intl.DateTimeFormat` object |

#### Returns

| Type | Description |
| --- | --- |
| Locale | the `Locale` object |

#### Exceptions

| Description |
| --- |
| Invalid constructor parameters provided |
| Only Gregorian calendar is supported |
| Only Latin symbols supported |
| Parsing of timezones is not supported |
| Unknown format options provided |

### fromOptions

The developer can create the `Locale` object from [Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions)

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

const locale = Locale.fromOptions({ dateStyle: 'short', timeStyle: 'short' }, 'en-GB');

locale.parse('21/04/1988, 09:21'); // => '1988-04-21T09:21'
```

#### Syntax

```text
Locale.fromOptions(options, [locales])
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| options | Intl.DateTimeFormatOptions | `Intl.DateTimeFormatOptions` object |
| locales <br> _(optional)_ | String &#124; String[]  | the BCP47 language tag for the locale actually used. Does support Unicode extensions. |

#### Returns

| Type | Description |
| --- | --- |
| Locale | the `Locale` object |

#### Exceptions

| Description |
| --- |
| Unknown format options provided |

### isoFormat

Resolve format token from `Locale`.

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

Locale.fromOptions({ dateStyle: 'short', timeStyle: 'short' }, 'en-GB').isoFormat; // => yyyy-MM-dd'T'HH:mm
Locale.fromOptions({ dateStyle: 'short' }, 'en-GB').isoFormat; // => yyyy-MM-dd
Locale.fromOptions({ timeStyle: 'short' }, 'en-GB').isoFormat; // => HH:mm
```

#### Returns

| Type | Description |
| --- | --- |
| String | format token |

### formatter

Resolve `Intl.DateTimeFormat` object `Locale`.

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

Locale.fromOptions({ dateStyle: 'short', timeStyle: 'short' }, 'en-GB').formatter; // => Intl.DateTimeFormat object
```

#### Returns

| Type | Description |
| --- | --- |
| Intl.DateTimeFormat | the associated `Intl.DateTimeFormat` object |

### options

Resolve `Intl.DateTimeFormatOptions` object `Locale`.

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

Locale.fromOptions({ dateStyle: 'short', timeStyle: 'short' }, 'en-GB').options; // => Intl.DateTimeFormatOptions object
```

#### Returns

| Type | Description |
| --- | --- |
| Intl.DateTimeFormatOptions | the associated `Intl.DateTimeFormatOptions` object |

### parse

Parse localised date string into _date_, _time_ or _datetime_ value.

```typescript
import { Locale } from '@refinitiv-ui/utils/date.js';

Locale.fromOptions({ year: 'numeric', month: 'short', day: 'numeric' }, 'ru').parse('21 апр. 1988 г.') // => '1988-04-21'
Locale.fromOptions({ month: 'short', day: 'numeric' }, 'en-GB').parse('21 Apr', '1988-01-01') // => '1988-04-21'
```

#### Syntax

```text
parse(value, [referenceDate = 0])
```

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| value | String | the localised value to be parsed |
| referenceDate <br> _(optional)_ | String &#124; Number &#124; Date | the reference date to resolve incomplete value |

#### Returns

| Type | Description |
| --- | --- |
| String | _date_, _time_ or _datetime_ value |

#### Exceptions

| Description |
| --- |
| Invalid value |

## Timestamps

The list of useful datetime timestamps. 

| Name | Description |
| --- | --- |
| DAYS_IN_WEEK | the number of days in week |
| HOURS_IN_DAY | the number of hours in day |
| HOURS_OF_NOON | the number of hours in noon |
| MILLISECONDS_IN_DAY | the number of milliseconds in day |
| MILLISECONDS_IN_HOUR | the number of milliseconds in hour |
| MILLISECONDS_IN_MINUTE | the number of milliseconds in minute |
| MILLISECONDS_IN_SECOND | the number of milliseconds in second |
| MINUTES_IN_HOUR | the number of minutes in hour |
| MONTHS_IN_YEAR | the number of months in year |
| SECONDS_IN_DAY | the number of seconds in day |
| SECONDS_IN_HOUR | the number of seconds in hour |
| SECONDS_IN_MINUTE | the number of seconds in minute |
| YEARS_IN_CENTURY | the number of years in century |

## Types

The list of _TypeScript_ types.

| Name | Description | Value |
| --- | --- | --- |
| DateFormat | date format token | <ul><li>`DateFormat.yyyy` = `yyyy`</li><li>`DateFormat.yyyyMM` = `yyyy-MM`</li><li>`DateFormat.yyyyMMdd` = `yyyy-MM-dd`</li></ul> |
| DateSegment | date object made of year, month and day | `{ year: number; month: number; day: number; }` |
| DateTimeFormat | datetime format token | <ul><li>`DateTimeFormat.yyyMMddTHHmm` = `yyyy-MM-ddTHH:mm`</li><li>`DateTimeFormat.yyyMMdd'T'HHmmss` = `yyyy-MM-dd'T'HH:mm:ss`</li><li>`DateTimeFormat.yyyMMddTHHmmssSSS` = `yyyy-MM-dd'T'HH:mm:ss.SSS`</li></ul> |
| DateTimeSegment | datetime object made of year, month, day, hours, minutes, seconds and milliseconds | `{ year: number; month: number; day: number; hours: number; minutes: number; seconds: number; milliseconds: number; }` |
| Format | combination of `DateFormat`, `DateTimeFormat` or `TimeFormat` |  |
| Segment | combination of `DateSegment`, `DateTimeSegment` or `TimeSegment` |  |
| TimeFormat | time format token | <ul><li>`TimeFormat.HHmm` = `HH:mm`</li><li>`TimeFormat.HHmmss` = `HH:mm:ss`</li><li>`TimeFormat.HHmmssSSS` = `HH:mm:ss.SSS`</li></ul> |
| TimeSegment | time object made of hours, minutes, seconds and milliseconds | `{ hours: number; minutes: number; seconds: number; milliseconds: number; }` |
| Unit | used in unit calculations | `year` &#124; `month` &#124; `day` &#124; `hour` &#124; `minute` &#124; `second` &#124; `millisecond` |
