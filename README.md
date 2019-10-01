# holiday_jp JavaScript [![Build Status](https://travis-ci.org/holiday-jp/holiday_jp-js.svg?branch=master)](https://travis-ci.org/holiday-jp/holiday_jp-js)

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

In TypeScript

```typescript
import * as holiday_jp from '@holiday-jp/holiday_jp';
const holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));
console.log(holidays[0]['name']); // 敬老の日
```
