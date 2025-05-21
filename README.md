# holiday_jp JavaScript/TypeScript [![test](https://github.com/holiday-jp/holiday_jp-js/workflows/test/badge.svg)](https://github.com/holiday-jp/holiday_jp-js/actions)

Get holidays in Japan.

## Install

```sh
$ npm install @holiday-jp/holiday_jp
```

## Usage

In HTML

```html
<script src="./your/own/path/holiday_jp.js"></script>
<script>
var holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
</script>
```

In Node

```javascript
var holiday_jp = require('@holiday-jp/holiday_jp');
var holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
```

If you want to use specific years only

```javascript
var holiday_jp = require('@holiday-jp/holiday_jp/lib/no_autoload_holidays');
var holidays_2010 = require('@holiday-jp/holiday_jp/lib/holidays_every_year/2010');
var holidays_2011 = require('@holiday-jp/holiday_jp/lib/holidays_every_year/2011');
holiday_jp.setHolidays([holidays_2010, holidays_2011]);

var holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
```

In TypeScript

```typescript
import * as holiday_jp from '@holiday-jp/holiday_jp';
const holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
```

If you want to use specific years only in TypeScript

```typescript
import holiday_jp from '@holiday-jp/holiday_jp/lib/no_autoload_holidays';
import holidays_2010 from '@holiday-jp/holiday_jp/lib/holidays_every_year/2010';
import holidays_2011 from '@holiday-jp/holiday_jp/lib/holidays_every_year/2011';
holiday_jp.setHolidays([holidays_2010, holidays_2011]);

const holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
```
