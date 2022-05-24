# 5/24の授業内容
1. 前回の授業の振り返り
2. DynamoDBの準備
3. セッション管理について

---
# 前回の授業の振り返り
* [前回の授業](../0517/README.md)

---
# セッション管理について
## セッションとは？
## なぜセッションが必要？
## Cookie
## Stickyセッション
## Sessionストア

---
## expressでセッションを使用する
* [express-session](https://www.npmjs.com/package/express-session)

* [ミドルウェア](https://expressjs.com/ja/guide/using-middleware.html)

---
# DynamoDBを使用する
## EC2にDynamoDBへのアクセス権限を付与する
### Roleの修正
IAMで以下のRoleにDynamoDBへのアクセス権限を追加する
* 修正するRole: EMR_EC2_DefaultRole
* 追加するPermission: AmazonDynamoDBFullAccess

### EC2にIAM Roleを設定する
EC2にEMR_EC2_DefaultRoleを設定する

---
## express-sessionの保管先をDynamoDBにする
* [connect-dynamodb](https://www.npmjs.com/package/connect-dynamodb)

---
# 課題
作成したアプリケーションにセッション管理の仕組みを組み込む
* 要件
  * ログインしていない状態でアクセスした場合（すべてのパス）は、ログイン画面を表示する
  * 一度ログインに成功したら、ブラウザを開いている間はログインしている状態にする
  * ブラウザを閉じると再度ログインが必要となる

* 期限: 6/6(月) 17:00

## 課題の提出方法
* データベースに保管されているユーザ情報を使った認証(5/17の課題)と同じGithubのリポジトリで提出する
* main or masterブランチから新たにブランチを作成してそのブランチに保管する
* ブランチの作成方法  
`git checkout -b ブランチ名`
  * ブランチ名の例: feature/session
* 現在の作業ブランチの確認方法  
`git branch`
