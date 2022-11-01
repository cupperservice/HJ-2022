# 11/1の授業内容
* [インフラ構築の説明](https://github.com/cupperservice/hj-sample-infra)
* 演習

## 演習
1. 「インフラの構築」を実施

2. terraformで作成したリソースをAWS Management Consoleで確認し構成を理解する
* VPC
* Subnet
* Security Group
* Route table
* EC2
* ALB
* Target Group
* Auto Scaling Group
* RDS
* DynamoDB
* S3
* Systems Manager(Parameter Store)

3. RDS Clusterにインスタンスを1つ（Writer）を追加する

4. DB(Writer)に接続できることを確認する  
DBに接続したら以下のコマンドを実行してデータベースを確認する  
    `show databases`

5. システム構成図にポート番号を書き込む  
対象は以下
    * ALB
    * bastion
    * AP SVR
    * Template Server
    * RDS

## 提出物
1. インフラの構築が完了したことをチャットで川嶋に連絡する

2. 4.の結果

3. ポート番号を書き込んだシステム構成図
