const fs = require('fs')
const path = require('path')
const text2png = require('text2png')
const request = require('request')

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    let lines = []
    let files = []

    request(`https://stats.quake.com/api/v2/Player/Stats?name=${config.player}`, (error, response, body) => {
      if (error) {
          reject(error)
          return
      }
        
      let data = JSON.parse(body)
      
      let matches = 0,
      wins = 0,
      lost = 0,
      winRate = 0,
      kills = 0,
      deaths = 0,
      kdRatio = 0
      
      for (let x in data.playerProfileStats.champions) {
          let champion = data.playerProfileStats.champions[x]
          for (let ix in champion.gameModes) {
              let gameMode = champion.gameModes[ix]
              wins += gameMode.won
              lost += gameMode.lost
              kills += gameMode.kills
              deaths += gameMode.deaths
          }
      }
        
      matches = wins + lost
      winRate = wins / matches
      kdRatio = kills / deaths
      
      lines.push(['lvl', 'lvl'])
      lines.push(['level', data.playerLevelState.level.toString()])
      lines.push(['matches', 'games: ' + matches])
      lines.push(['wins', 'wins: ' + wins])
      lines.push(['lost', 'lost: ' + lost])
      lines.push(['winrate', 'w/l: ' + winRate.toFixed(2)])
      lines.push(['sr', 'sr: ' + data.playerRatings.duel.rating + '/' + data.playerRatings.tdm.rating])
      lines.push(['kills', 'kills: ' + kills])
      lines.push(['deaths', 'deaths: ' + deaths])
      lines.push(['kdratio', 'k/d: ' + kdRatio.toFixed(2)])
      
      for (let i in lines) {
        line = lines[i]
        let file = path.resolve(config.out, line[0] + '.png')
        files.push(file)
        fs.writeFileSync(file, text2png(line[1], {
          color: 'black',
          font: '7px 7px2bus',
          lineSpacing: 1,
        }))
      }
      
      resolve({
        data: data,
        files: files,
      })
    })
  })
}