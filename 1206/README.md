# 12/6の授業内容
* 演習

## 演習
1. [Lambda関数を使ってみる](../Lambda関数を使ってみる/README.md)
2. [インフラ構築](https://github.com/cupperservice/hj-sample-infra)
3. [アプリケーションを更新する](../アプリケーションを更新する/README.md)

## 注意事項
1025の授業でlocalstackを動かしている場合は、terraform planでAWSへの認証ができなくて失敗するので以下を実施してください。

AWS AcademyのAWS Details -> AWS CLI Showを押して表示された認証情報を `~/.aws/credentials` にコピペする

## 問題に対する対応
### 1. scripts/app.serviceの間違い
以下の定義が不足していたので自動起動がONにならなかった

[Install]
WantedBy=multi-user.target

修正
↑の定義を追加する

ネットワークやAWS関連の初期化が終わる前に起動してしまうため
パラメータストアへのアクセスに失敗していた。

修正
以下を[Unit]に追加

After=network-online.target
After=cloud-final.service

【皆さんの対応】
hj-sample-appの下で git pull を実行してリポジトリを更新してください

---
### 2. 起動テンプレートでappサーバにpublic ipを割り当てる必要があった
public ipがないのでawsコマンドの実行ができない状態だった

common/asg.tfのaws_launch_templateを以下のように修正

以下の定義を削除
```
  vpc_security_group_ids = [
    aws_security_group.app.id
  ]
```

以下を追加
```
  network_interfaces {
    associate_public_ip_address = true
    security_groups = [aws_security_group.app.id]
  }
```

【皆さんの対応】
自身のリポジトリに↑を反映してください。

---
### 3. Auto Scaling GroupとALBの関連付けができていなかった

以下の定義を削除
common/asg.tfのaws_autoscaling_attachment

common/asg.tfのaws_autoscaling_groupに以下を追加

  target_group_arns         = [aws_alb_target_group.alb.arn]


【皆さんの対応】
自身のリポジトリに↑を反映してください。

---
### 4. EC2に設定していたロール(EMR_EC2_DefaultRole)にはポリシーを追加してはいけなかった

【皆さんの対応】
1. terraformの以下のファイルの `EMR_EC2_DefaultRole` を `LabInstanceProfile` に変更
    * common/asg.tf
    * common/ec2.tf
2. terraform apply で適用する

## RDSの削除について
使用している Aurora はクレジットの消費率が高いので作業終了後に削除してください。

### [削除方法]
1. RDSサービスを開く

2. 左のメニューから `Database` を選択

3. RDSの Writer instace を選択

4. 右上のメニューからActions -> Delete を選択

5. 表示されたダイアログで以下を実施

    1. Create final snapshot? のチェックを外す
    2. I acknowledge ..... をチェックする
    3. テキストボックスに delete me を入力
    4. Delete ボタンを押す

### [再構築方法]
1. Cloud9を開く

2. `hj-sample-infra/staging` に移動

3. `terraform apply` を実行

4. RDS が作成されるのを待つ

5. bastion サーバにSSH接続する

6. 最新のコードを取得  
`hj-sample-app` の下で `git pull` を実行

7. temlate サーバとコードを同期する  
`rsync -tav hj-sample-app/ ec2-user@TemplateサーバのPrivate IPアドレス:/opt/appsvr/`

8. template サーバにSSH接続する

9. `/opt/appsvr/tool` に移動

10. 環境変数を設定 ([参照](https://github.com/cupperservice/hj-sample-infra#template%E3%82%B5%E3%83%BC%E3%83%90%E3%81%AE%E6%A7%8B%E7%AF%89))

11. `node add_user.js user.csv` を実行
