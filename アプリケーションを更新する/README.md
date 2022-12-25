# アプリケーションを更新する
サムネイル画像の作成にLambdaを使用する新しいバージョンのアプリケーションをリリースする

## インフラの更新
Lambda関数を登録する
### 0. 事前準備
11/22 の授業で作成した Lambda 関数と Layer を削除する
1. jq をインストール  
`sudo yum install -y jq`

2. Lambda 関数を削除
    ```
    aws lambda delete-function --function-name thumbnail
    ```

3. Layer を削除
    ```
    versions=$(aws lambda list-layer-versions --layer-name sharp | jq -r '.LayerVersions[].Version')
    echo "$versions" | while read v
    do
      aws lambda delete-layer-version --layer-name sharp --version-number "$v"
    done
    ```

### 1. Lambda 関数をコピー
hj-sample-infra の下に [lambda](https://github.com/cupperservice/hj-sample-infra/tree/main/lambda) をコピーする

### 2. terraform の定義にLambda関数を追加
1. [lambda.tf](https://github.com/cupperservice/hj-sample-infra/blob/main/common/lambda.tf) を追加  
`hj-sample-infra/common` の下に追加する

2. 以下の定義を `main.tf` に追加する  
    * '+' の行を追加  
    * '+' は書かない  
    * `role` は自分の環境の `LabRole` の `ARN` を書く

    ``` diff
      app = {
        image_id = "XXXXX"
        instance_type = "t2.small"
        key_name = "XXXXX"
        max_size = 0
        min_size = 0
      }
    + lambda = {
    +   function_file = "../lambda/thumbnail.zip"
    +   layer_file    = "../lambda/sharp.zip"
    +   role          = "XXXXX"
    + }
    ```

3. common/variables.tf の最後の行に以下を追加する
    ```
    variable "lambda" {
      type = map(any)

      default = {
        function_file = ""
        layer_file    = ""
        role          = ""
      }
    }
    ```

4. 定義を反映する  
`terraform apply`

---
## template サーバの更新
1. Cloud9からbastionサーバにSSH接続する

2. 新しいバージョンのアプリケーションを取得する  
`hj-sample-app` の下で `git pull` を実行する

3. lambda を使用するバージョンにブランチを切り替える  
`git checkout feature/use_lambda`

3. template サーバにアプリケーションをコピーする  
    ```
    IP_TEMPLATE=TemplateサーバのPrivate IPアドレス
    rsync -tav hj-sample-app/ ec2-user@"$IP_TEMPLATE":/opt/appsvr/
    ```

4. アプリケーションを再起動する  
`sudo systemctl restart app`

5. ブラウザから template サーバにアクセスして正常に動作することを確認する  
__注意__: インターネットからアクセスできるように template サーバのセキュリティグループを編集すること

6. 正常に動作していることを確認する
    * S3のバケットを確認してサムネイル画像が登録されていることを確認する
    * CloudWatch LogsでLambdaが正常動作していることを確認する  
CloudWatch Logs -> Log Groups(/aws/lambda/thumbnail)に以下のログが出ていれば正常動作している  
`INFO finished create thumbnail function!!!`

7. template サーバのイメージを作成する

---
## アプリケーションサーバを更新する
1. 起動中の Application サーバ (app-sg) を停止する

2. 新しいインスタンスが立ち上がるのを待つ

3. 動作確認  
新しい Application サーバのインスタンスが立ち上がったら、アプリケーションが正常に動作していることを確認する
