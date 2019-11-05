const fs = require('fs')
const path = require('path')
// eslint-disable-next-line node/no-unpublished-require
const archiver = require('archiver')
const glob = require('glob')

const releaseDir = path.join(__dirname, '../release')

const zipDirList = glob.sync('*', {
  cwd: releaseDir,
  ignore: '*.zip',
})

const zipFileGlobOptions = source => ({
  cwd: source,
  dot: true,
  ignore: ['node_modules/**', 'dist/**', '.nuxt/**'],
})

function mockZip(source) {
  source = `${releaseDir}/${source}/`
  return glob.sync('**', zipFileGlobOptions(source))
}

function zip(source, target) {
  const output = fs.createWriteStream(target)
  const archive = archiver('zip', {
    zlib: {level: 9},
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes')
    console.log(
      'archiver has been finalized and the output file descriptor has closed.',
    )
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory, putting its contents at the root of archive
  archive.glob('**', zipFileGlobOptions(source))

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

zipDirList.forEach(source => {
  const target = `${releaseDir}/${source}.zip`
  source = `${releaseDir}/${source}/`
  zip(source, target)
})

module.exports = {
  mockZip,
}
