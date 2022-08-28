# サンプルコードの実行方法
## 前提条件
以下がセットアップ済みであること
* git
* node
* docker
* docker-compose

## 準備
1. キーペアの作成  
`ssh-keygen -t rsa`  
__すべて空でEnterキーを押す__

  * 実行結果
    ```
    $ ssh-keygen -t rsa
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/ec2-user/.ssh/id_rsa): 
    Enter passphrase (empty for no passphrase): 
    Enter same passphrase again: 
    Your identification has been saved in /home/ec2-user/.ssh/id_rsa.
    Your public key has been saved in /home/ec2-user/.ssh/id_rsa.pub.
    The key fingerprint is:
    SHA256:9v1ms+Bjk+4V6M+c9fYBlgkx3jYwQLIYyacXti3zg3A ec2-user@ip-172-31-93-175.ec2.internal
    The key's randomart image is:
    +---[RSA 2048]----+
    |    .....o.=     |
    |     oo+o . *    |
    |     .+.+  o +   |
    |     o E .  o.+  |
    |      + S   .=.  |
    |       o + o. .. |
    |          o +....|
    |           .=B+o+|
    |           ++=B++|
    +----[SHA256]-----+
    ```

2. Githubに公開鍵を登録する  
EC2 or Cloud9で以下のコマンドを実行する  
`cat ~/.ssh/id_rsa.pub`

  * 実行結果
    ```
    $ cat ~/.ssh/id_rsa.pub 
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDkE8NTwTLw2+3C5eWo0AF6UnDJxs7oWl3FrctZdQmuUViaIfS2JLUts+Y+R/6VX9G22d5gDdM7QTxPRiaA8RRiKFuAeciGmOBmHnQmPrXEsAoHn1NG+xfOxAXLv9/jUC3OCBxfIQJdki32XIzdGVsG3UVuHmqJIX685TXI+83fEnrJjrTy2IKwKnCxOriWMkNXuQrqGJzZFTMPszNZlOwHuxvQzY7Uu6tcJhWTuZMjHnUK1RtxrGaMkpwgFS6xWWNqEkTUAE33xuSwFufWH/WpV+QC0KRJQoWQO02nsii6rMCWYf0QSsGAVboWNaQg3xIed2q0UiW7MaSyiciT20Bn ec2-user@ip-172-31-93-175.ec2.internal
    ```

    表示された値をクリップボードにコピー

3. 2.でコピーした値をGithubに登録する  
* 右上のアイコンをクリック -> 
* Settings を選択 -> 
* 左のメニューからSSH and GPG keys を選択 ->
* New SSH Key を押す
* Titleに任意の値を入力
* Keyにコピーした公開鍵の値をペースト
* Add SSH Key を押す

## 実行([ログイン機能(DBを使用する)](./0517/README.md))
1. サンプルコードをclone  
EC2 or Cloud9で以下のコマンドを実行する  
`git clone https://github.com/cupperservice/hj-sample-app.git`

2. ブランチを切り替える 
* 1.でclone したディレクトリの下で以下のコマンドを実行する  
  `git checkout feature/no-session`

     実行結果
     ```
     $ git checkout feature/no-session
     Branch 'feature/no-session' set up to track remote branch 'feature/no-session' from 'origin'.
     Switched to a new branch 'feature/no-session'
     ```

3. ローカルリポジトリを作成する  
EC2 or Cloud9で以下を実行する  
* ディレクトリを作成する  
`mkdir xxxxx`  
xxxxxは任意の値

4. サンプルコードをコピーする  
3.で作成したディレクトリの下で以下のコマンドを実行する  
`cp -R ../hj-sample-app/* .`

## サンプルコードを実行する
1. DBを起動する  
  `docker-compose up -d`

2. ユーザーデータを登録する  
参照: [ログイン機能(DBを使用する)](./0517/README.md)

3. モジュールを初期化する  
アプリのディレクトリの下で以下のコマンドを実行する  
`npm install`

4. アプリを起動する  
アプリのディレクトリの下/appの下で以下のコマンドを実行する  
`node main.js`

5. ブラウザからEC2 or Cloud9のPublic IPにアクセスする

    __EC2 or Cloud9のセキュリティグループにアプリのポートにアクセスを許可すること__

## Githubへの登録
1. Githubでリポジトリを作成する  
* Repositoriesタブを選択し、New を押す
* Repository name を入力し、Create repository を押す

2. 初期化
* アプリのディレクトリの下に以下のファイルを作成する
  * ファイル名: .gitignore
  * ファイルの内容:
    ```
    node_modules/
    services/db/data/
    ```

* アプリのディレクトリの下で以下のコマンドを実行する
  ```
  git init
  ```

3. リモートリポジトリを追加する
アプリのディレクトリの下で以下のコマンドを実行する  
`git remote add origin githubのリポジトリのURL`

    実行例
    ```
    $ git remote add origin git@github.com:cuppertest/test2.git
    ```

4. リソースをローカルリポジトリに登録する  
アプリのディレクトリの下で以下のコマンドを実行する
    ```
    git add .
    git commit -m "first commit"
    ```

5. リモートリポジトリに反映する  
アプリのディレクトリの下で以下のコマンドを実行する  
    ```
    git branch -M main
    git push -u origin main
    ```

## 実行([ログイン機能(セッション管理を組み込む)](../0524/README.md) )
1. ブランチを切り替える 
* [hj-sample-app](https://github.com/cupperservice/hj-sample-app)をclone したディレクトリの下で以下のコマンドを実行する  
  `git checkout feature/add-session`

     実行結果
     ```
     $ git checkout feature/add-session
     Branch 'feature/add-session' set up to track remote branch 'feature/add-session' from 'origin'.
     Switched to a new branch 'feature/add-session'
     ```

2. サンプルコードをコピーする  
自分で作成したアプリのディレクトリの下で以下のコマンドを実行する  
`cp -R ../hj-sample-app/* .`

### 注意
EC2 or Cloud9のロールにDynamoDBへのアクセス権限を付与すること  
* [参照](https://github.com/cupperservice/HJ-2022/tree/main/0524)

## 実行([S3に保管されている画像をダウンロードする(ログインアプリに組み込み)](../0531/README.md))
1. ブランチを切り替える 
* [hj-sample-app](https://github.com/cupperservice/hj-sample-app)をclone したディレクトリの下で以下のコマンドを実行する  
  `git checkout feature/download-image`

     実行結果
     ```
     $ git checkout feature/download-image
     Branch 'feature/download-image' set up to track remote branch 'feature/download-image' from 'origin'.
     Switched to a new branch 'feature/download-image'
     ```

2. サンプルコードをコピーする  
自分で作成したアプリのディレクトリの下で以下のコマンドを実行する  
`cp -R ../hj-sample-app/* .`

### 注意
* 使用する外部モジュールが増えているので、`npm install` で追加モジュールをインストールすること
* S3のバケット名は自身の環境の名前に合わせてコードを変更すること
* `aws configure` でデフォルトプロファイルのリージョンを `us-east-1` に設定しておくこと
