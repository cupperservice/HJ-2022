const { S3, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')

const client = new S3()

// Streamからデータを読み込みメモリに展開する
const streamToByte = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })

// データをファイルに書き込む
const writeToFile = (data) =>
  new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(path.join(__dirname, 'download.png'))
    writer.on('finish' , () => {
      resolve()
    })
    writer.write(data)
    writer.end()
  })

client.send(new GetObjectCommand({ Bucket: 'cupper-hj-test', Key: 'sample.png' }))
  .then(data => streamToByte(data.Body))
  .then(data => writeToFile(data))
  .then(() => console.log('done'))
