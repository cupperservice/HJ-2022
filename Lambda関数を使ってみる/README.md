# Lamda関数を使ってみる
## 公式ドキュメント
https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/welcome.html

## Lambda関数を作成する
1. Lambda関数のコードを作成する

    `thumbnail.js` に以下のコードを記述する

    ``` JavaScript
    exports.handler = (event, context) => {
      return new Promise((resolve, reject) => {
        console.log("called thumbnail function!!!")
        console.log(event)
        console.log(context)
        resolve(200)
      })
    }
    ```

2. zipファイルで固める

    `zip thumbnail.zip thumbnail.js`

3. Lambda関数を作成する  
    以下のコマンドを実行し、Lambda関数を作成する

    ```
    aws lambda create-function \
    --function-name thumbnail \
    --zip-file fileb://thumbnail.zip \
    --handler thumbnail.handler \
    --runtime nodejs16.x \
    --role arn:aws:iam::968091568851:role/LabRole \
    --timeout 60
    ```

    コードを修正した場合は以下のコマンドで更新する

    ```
    aws lambda update-function-code \
    --function-name thumbnail \
    --zip-file fileb://thumbnail.zip
    ```

4. awsコマンドでLambda関数を呼び出す
    ```
    aws lambda invoke \
    --function-name thumbnail \
    --log-type Tail \
    --query 'LogResult' \
    --output text \
    out \
    | base64 -d
    ```

5. 実行結果をAWS Management Consoleで確認する

## JavaScriptからLambda関数を呼び出す
1. `index.js` に以下のコードを記述する

    ``` JavaScript
    const AWS = require('aws-sdk')

    const lambda = new AWS.Lambda()

    const param = {
      s3: {
        original: {
          bucket_name: 'your-original-bucket-name',
          key: 'name-of-image'
        },
        thumbnail: {
          bucket_name: 'your-thumbnail-bucket-name'
        }
      }
    }

    lambda.invokeAsync(
      {
        FunctionName: 'thumbnail',
        InvokeArgs: JSON.stringify(param)
      },
      (err, data) => {
        if (err) console.log(err)
        else console.log(data)
      }
    )
    ```

2. 1.で作成したJavaScriptを実行する

    `node index.js`

3. 実行結果をAWS Management Consoleで確認する

## Thumbnailを作成するコードをLambdaに実装する
以下の部品から要件を満たすLambda関数を作成する

### 要件
* Lambda関数の入力パラメータ
    ``` JavaScript
    s3: {
      original: {
        bucket_name: 画像を読み込むバケット名,
        key: 読み込む画像ファイルんのキー
      },
      thumbnail: {
        bucket_name: サムネイルを保管するバケット名
      }
    }
    ```

* 処理内容  
     1. S3(original bucket)から画像を読み込む
     2. 読み込んだ画像からサムネイル画像を作成
     3. サムネイル画像をS3(thumbnail bucket)に保管

* 必要なモジュール  
    * サムネイル画像を作成するライブラリ  
    `sharp`

### 部品
#### S3から画像を読み込む
``` JavaScript
const downloadImage = (bucket, key) => {
  return new Promise((resolve, reject) => {
    S3.getObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data.Body)
    })
  })
}
```

#### 画像からサムネイル画像を生成
``` JavaScript
const createThumbnail = (input) => {
  return sharp(input).resize(100, 100).toBuffer()
}
```

#### S3にサムネイル画像を保管する
``` JavaScript
const uploadImage = (bucket, key, input) => {
  return new Promise((resolve, reject) => {
    S3.upload({
      Bucket: bucket,
      Key: key,
      Body: input,
      ContentType: 'image/png'
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
```

### sharpをLayerに登録する
公式ドキュメント  
https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-layers.html

1. layerをダウンロード

    `nodejs` の下で `npm install` を実行する

2. zipで固める

    `zip -r layer.zip nodejs/node_modules`

2. layerを登録する

    ```
    aws lambda publish-layer-version \
    --layer-name sharp \
    --description "sharp module" \
    --zip-file fileb://sharp.zip \
    --compatible-runtimes nodejs16.x \
    --compatible-architectures "x86_64" 
    ```

3. lambda関数にLayerを関連付ける

    ```
    aws lambda update-function-configuration \
    --layers "layerのVersion ARN" \
    --function-name thumbnail
    ```

### Lambda関数を実行する

```    
aws lambda invoke \
--function-name thumbnail \
--log-type Tail \
--query 'LogResult' \
--output text \
--payload $(echo '{
"s3":{
  "original":{
    "bucket_name":"kaz-original-202211",
    "key":"hoge.png"
  },
  "thumbnail":{
    "bucket_name":"kaz-thumbnail-202211"
    }
  }
}' | base64) \
out \
| base64 -d
```
