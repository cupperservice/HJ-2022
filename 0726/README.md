# 7/26の授業内容
1. 後期の授業内容の説明
2. 演習の続き

---
# 後期の授業内容の説明
サンプルアプリケーションをスケールアウト可能な構成でAWS上に構築する

## サンプルアプリケーションの内容
* ブラウザから画像をアップロードしS3に保管する
* アップロードした画像のサムネイルをタイル表示する
* サムネイルをクリックし、画像をダウンロードできる

## システム構成図
![system](./img/system.png)

* ALB(Application Load Balancer)  
https://aws.amazon.com/jp/elasticloadbalancing/

* Build Serevr

* Template Server(Bastion)(EC2)

* AMI

* AP SVR(EC2)  
https://aws.amazon.com/jp/ec2/

* RDS  
https://aws.amazon.com/jp/rds/

* S3  
https://aws.amazon.com/jp/s3/

* DynamoDB  
https://aws.amazon.com/jp/dynamodb/

* Parameter Store  
https://aws.amazon.com/jp/systems-manager/

---
# 演習
* 課題が完了していない人  
課題の続きを実施

---
# 課題一覧
1. [本年度の演習で自分が作りたいアプリケーションの説明を提出](../0412/README.md)  
期限：4/18
2. [20歳以上の人を表示する](../0419/README.md)  
期限：4/25
3. [静的コンテンツの表示](../0426/README.md)  
期限：4/26
4. [テンプレートエンジンの使用](../0426/README.md)  
期限：4/26
5. [ログイン機能(DBを使用する)](../0517/README.md)  
期限：5/30
6. [ログイン機能(セッション管理を組み込む)](../0524/README.md)  
期限：6/6
7. [S3に保管されている画像をダウンロードする(ログインアプリに組み込み)](../0531/README.md)  
期限：7/4

---
# [課題の提出状況](https://docs.google.com/spreadsheets/d/1_FExPmonZpnGkK04HHlJYqWcvZhdeof4QQSTYkNbwAQ/edit?usp=sharing)

---
# 連絡事項
前期の授業の最後で一旦、中間時点での成績をだします。

必須です。

* 演習  
すべての課題の提出

  * 最終期限：7/11(月) 17:00

  * 課題の5,6,7は以下のリポジトリでサンプルコードを公開しています。  
    * 課題5
    https://github.com/cupperservice/hj-sample-app/tree/feature/no-session
    * 課題6
    https://github.com/cupperservice/hj-sample-app/tree/feature/add-session
    * 課題7
    https://github.com/cupperservice/hj-sample-app/tree/feature/download-image

     コードをどう書けばよいかわからない人は↑のサンプルコードを使用してください。  
     ただし、その場合は以下を追加で提出してください。
  * 各画面のスナップショット
    * ログイン画面
    * ログイン後の画面
  * DynamoDBのテーブルのスナップショット
  * S3のバケット内のファイル一覧のスナップショット

* [AWS Academy Cloud Foundations [16254]](https://awsacademy.instructure.com/courses/16254)  
モジュール６まで完了すること

  * 最終期限：7/26(火)
