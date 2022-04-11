# 4/12の授業内容
1. 昨年度の授業の振り返り
1. 本年度の授業内容の説明

# 昨年度の授業の振り返り
* [課題1](https://github.com/cupperservice/HJ-2021/tree/main/G1/課題1)
* [課題2](https://github.com/cupperservice/HJ-2021/tree/main/G1/課題2)
* [課題3](https://github.com/cupperservice/HJ-2021/tree/main/G1/課題3)

# 本年度の授業内容の説明
## ゴール
Webアプリケーションを作成して、AWS環境に配備する
* 認証が必要
* アプリケーションサーバを冗長化する
* 静的コンテンツはS3で提供する

---
## AWSのサービスを理解する
以下のコースを受講する

「AWS Academy Cloud Foundations」

---
## Webアプリケーションを構築するリソールを理解する
* DynamoDB  
セッション情報を保管する
* RDS  
ユーザー情報、商品情報、などを保管する
* Bastion Server(EC2 Instance)  
EC2インスタンスの調査用。インターネットからSSH接続して使用する。
* Template Server(EC2 Instance)  
Applicationサーバのイメージを構築するために使用する。
* Application Server(EC2 Instance)  
Applicationサーバ、冗長化する。
* Load Balancer  
Applicationサーバの生存監視及び、クライアントからのリクエストをApplicationサーバに振り分ける。

---
## Webアプリケーションを作ってみる
* [nodejs](https://nodejs.org/ja/)
* [express](https://expressjs.com/ja/)
* [ejs](https://www.npmjs.com/package/ejs)
* [mysql](https://www.npmjs.com/package/mysql)

## 演習
Webアプリケーションを作成して、AWS上に環境を構築する。

### アプリケーションの例
1. 画像管理
    * 画像をアップロード
    * アップロードした画像を参照する

2. SNS
    * メッセージを発話する
    * メッセージを参照する

3. お店の検索
    * 自分がいる場所の近くのごはん屋をランダムに取得する
