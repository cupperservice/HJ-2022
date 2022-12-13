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

3. 定義を反映する  
`terraform apply`

---
## template サーバの更新
* Lambda を使用するバージョンのアプリケーション  
https://github.com/cupperservice/hj-sample-app/tree/feature/use_lambda

### 更新手順
1. bastion サーバのアプリケーションを更新する
2. template サーバのアプリケーションを更新する  
  アプリ更新後に再起動して動作確認すること
3. template サーバのイメージ(AMI)を作成する
4. 新しく作成したイメージ(AMI)でアプリを更新する
