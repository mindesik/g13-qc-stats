const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const assert = require('assert')
const qcStats = require('../index')

const config = {
  player: 'Mister Paladin',
  out: path.resolve(__dirname, 'out'),
}

const init = () => {
  fs.mkdirSync(config.out)
}

const cleanup = () => {
  rimraf.sync(config.out)
}

describe('Stats', function () {
  this.timeout(10000)

  before(() => {
    cleanup()
    init()
  })

  after(() => {
    cleanup()
  })

  it('should fetch data', (done) => {
    qcStats(config)
      .then((result) => {
        assert.equal(result.data.name, config.player)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should save images', (done) => {
    qcStats(config)
      .then((result) => {
        let dir = fs.readdirSync(config.out)
        assert.equal(dir.length, result.files.length)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})