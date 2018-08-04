# Logitech G13 LCD stats for Quake Champions

Quake Champions stats for Logitech G13 LCD Advanced Gameboard

![banner](/banner.jpg)

Fetching stats from Bethesda's Quake Champions website, saves images to display them on LCD.

## Requirements

- Logitech G13 Advanced Gameboard
- Windows
- AIDA64
- Nodejs

## Usage

- Install AIDA64, Nodejs.
- Install font from *fonts* directory.
- Run AIDA64, open settings, go to *LCD* and enable *Logitech G15/G19*, go to *LCD Items* and import *quake-g13.lglcd* file from *lcd* directory.
- Include package: `yarn require g13-qc-stats`.
- Create script:

```javascript
const path = require('path')
const qcStats = require('g13-qc-stats')

const config = {
  player: 'Mister Paladin', // Player name to fetch, required
  out: path.resolve(__dirname, 'out'), // Set images output directory, required
}

qcStats(config)
  .then((result) => {
    // result.data - JSON response
    // result.files - files path
  })
  .catch(...) // Rejects with request error
```

- Go to LCD Items settings and import *quake-g13.lglcd*, and update image file path from the output directory for each LCD item.
- Make cron job to run script every *n* minutes to make LCD stats up to date.
- Enjoy

## Tests

`npm test` or `yarn run test`