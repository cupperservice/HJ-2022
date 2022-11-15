# 11/15の授業内容
* [インフラ構築](https://github.com/cupperservice/hj-sample-infra)演習

## 演習
1. 演習1「インフラの構築」を実施
2. [Lambda関数を使ってみる](../Lambda関数を使ってみる/README.md)

## 注意事項
1025の授業でlocalstackを動かしている場合は、terraform planでAWSへの認証ができなくて失敗するので以下を実施してください。

AWS AcademyのAWS Details -> AWS CLI Showを押して表示された認証情報を `~/.aws/credentials` にコピペする

## 問題に対する対応
1. scripts/app.serviceの間違い
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

ーーーーー

2. 起動テンプレートでappサーバにpublic ipを割り当てる必要があった
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

ーーーーー

3. Auto Scaling GroupとALBの関連付けができていなかった

以下の定義を削除
common/asg.tfのaws_autoscaling_attachment

common/asg.tfのaws_autoscaling_groupに以下を追加

  target_group_arns         = [aws_alb_target_group.alb.arn]


【皆さんの対応】
自身のリポジトリに↑を反映してください。
