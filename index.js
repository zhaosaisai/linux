const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')
const util = require('util')
const stringSimilarity = require('string-similarity')

const cmds = require('./cmds')
const readFile = util.promisify(fs.readFile)
const log = info => process.stdout.write(`${info}\n`)

marked.setOptions({
  renderer: new TerminalRenderer()
})

exports.which = cmd => new Promise(resolve => {
  exec(`which ${cmd}`, (err) => {
    if (err) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
})

exports.info = cmd => new Promise((resolve, reject) => {
  exec(`info ${cmd}`, (err, stdout) => {
    if (err) {
      return reject(err)
    }
    return log(stdout.toString())
  })
})

exports.include = cmd => cmds.includes(cmd)

exports.resolve = cmd => path.resolve(__dirname, './.commands', `${cmd}.md`)

exports.matches = cmd => {
  const { bestMatch } = stringSimilarity.findBestMatch(cmd, cmds)
  if (bestMatch) {
    return bestMatch.target
  }
  return ''
}

exports.markedConsole = content => console.log('\n', marked(content), '\n')


module.exports = async function(cmd) {
  const _ = exports
  
  if (!_.include(cmd) || !(await _.which(cmd))) {
    log(chalk.red(`Unsupported command ${cmd}\n`))

    const matchdCmd = _.matches(cmd)
    if (matchdCmd) {
      log(`${chalk.yellow('The most similar command is')}\n\t${chalk.green(matchdCmd)}`)
    }
    return
  }

  try {
    const md = await readFile(_.resolve(cmd, 'utf8'))
    _.markedConsole(md.toString())
  } catch(e) {
    // default output
    _.info(cmd)
  }
}