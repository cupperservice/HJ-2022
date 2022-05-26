const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3')

const client = new S3()

client.send(new ListObjectsCommand({ Bucket: 'cupper-hj-test' }))
  .then(data =>
    data.Contents.forEach(o => console.log(o))
  )
