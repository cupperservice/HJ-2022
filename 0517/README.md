# 5/17の授業内容
1. 前回の授業の振り返り
2. 前回の課題の追加説明
3. データベースを使ってみる

---
## 前回の授業の振り返り
* [前回の授業](../0426/README.md)

---
## 前回の課題の追加説明

---
## データベースを使ってみる
### 開発環境の構築
開発用のEC2を用意する
1. EC2を作成する
* AMI: Amazon Linux 2
* Instance type: t2.large
* Key pair name: vockey

2. VSCodeに「Remote Development」をインストールする

3. SSH ConfigにEC2への接続情報を追加
```
Host 任意の名前
    HostName EC2のPublic IPアドレス
    User ec2-user
    IdentityFile EC2へ接続するための秘密鍵のパス
```
**EC2のPublic IPアドレスは毎回変わるので注意**
**EC2へ接続するための秘密鍵は以下からダウンロードする**  
ModulesLearner Lab Foundation Servicesの右上のAWS Detailsを開いて、Download PEM

4. VSCodeからEC2に接続する
5. EC2にnodeをインストール
* nvm  
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
* node  
`nvm install v16.15.0`

### dockerをインストール
```
sudo yum update

sudo amazon-linux-extras install docker

sudo service docker start

sudo systemctl enable docker

sudo gpasswd -a $USER docker
```
最後にEC2を再起動する

### docker composeをインストール
```
sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### dockerを使用してmysqlコンテナを作成する
1. 以下をEC2にコピーする  
[my-app](./my-app)

2. my-appの下で以下を実行する  
`docker-compose up -d`

3. コンテナの状態を確認する  
`docker-compose ps`

4. コンテナを停止する  
`docker-compose stop`

5. コンテナを廃棄する  
`docker-compose down -v`

### ユーザー情報を管理するデータベースを作成する
1. コンテナに乗り込む  
`docker-compose exec db bash`

2. mysqlへ接続する
`mysql -uroot -proot db`

3. ユーザーデータを登録する
* テーブルの作成
```
CREATE TABLE user (
  id          INTEGER AUTO_INCREMENT,
  user_id     VARCHAR(50) NOT NULL,
  password    VARCHAR(100) NOT NULL,
  name        VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
```
* ユーザーデータの登録
```
INSERT INTO user (user_id, password, name)
VALUES ('user1@sist.ac.jp', '1bcdbccff1c3d3ae287905e0850e6afbb56010276f0a9a52ae1ff7874ef35726', 'Hamajo Taro'),
('user2@sist.ac.jp', '5f5b24ad65531525ddcccace0598dafaa386e30749babf12c7b0cda2af45c582', 'Hamajo Jiro');
```
**パスワードはハッシュ化して保管する**
`echo -n 'パスワード' | sha256sum`

### JavaScriptからデータベースにアクセスする
1. [mysql用のライブラリ](https://github.com/mysqljs/mysql)をインストールする

    `npm install mysql`

2. DBにアクセスするプログラムを作成する
* mysqlのモジュールをインポートする
  ```
  const mysql = require('mysql')
  ```

* mysqlへの接続情報を設定する
  ```
  const connection = mysql.createConnection({
    host: 'DBのホスト名',
    port: DBのポート番号
    user: 'ユーザーID',
    password: 'パスワード',
    database: 'データベース名'
  })
  ```

* DBへ接続する
  ```
  connection.connect((err) => {
    // DBへの接続に失敗した場合の処理
    throw err
  })
  ```

* テーブルからデータを読み込む
  ```
  connection.query('SELECT * FROM user', (err, results, fields) => {
    if (err) {
      // エラー処理
      throw err
    }

    // 読み込んだデータを以下のフォーマットで出力
    // no: 番号
    //   id:ユーザーID
    //   name:名前
    //   password:パスワード

    // 出力例：
    // no:0
    //   id:user1@sist.ac.jp
    //   name:Hamajo Taro
    //   password:1bcdbccff1c3d3ae287905e0850e6afbb56010276f0a9a52ae1ff7874ef35726
    // no:1
    //   id:user2@sist.ac.jp
    //   name:Hamajo Jiro
    //   password:5f5b24ad65531525ddcccace0598dafaa386e30749babf12c7b0cda2af45c582
    
    // 取得したレコードの数
    // results.length

    // カラムの値の取得
    // results[レコード番号].カラム名
  })
  ```

* DBから切断する
  ```
  connection.end()
  ```
---
## Githubを使用してリソースを管理する
### Githubのアカウントを作成する
以下のページからアカウントを作成する

[github](https://github.com/)

### Github上にプロジェクトを作成する
今回の課題はGithubで提出する

---
## 課題
前回の課題で作成したアプリに対して、ユーザー情報をデータベースから取得するように修正する

* プロジェクトの構成

  ```
  top
  +-- app
      +-- controller
          +-- login.js
      +-- repository
          +-- user_repository.js
      +-- views
          +-- login.ejs
          +-- top.ejs
      +-- main.js
  +-- services
      +-- db
  +-- docker-compose.yml
  ```

* 文字列をハッシュ化する
  ```
  const crypto = require('crypto')

  crypto.createHash('sha256').update(パスワード).digest('hex')
  ```
