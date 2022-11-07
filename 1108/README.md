# 11/8の授業内容
* [インフラ構築](https://github.com/cupperservice/hj-sample-infra)演習

## 演習
1. 「インフラの構築」を実施

## 注意事項
1025の授業でlocalstackを動かしている場合は、terraform planでAWSへの認証ができなくて失敗するので以下を実施してください。

AWS AcademyのAWS Details -> AWS CLI Showを押して表示された認証情報を `~/.aws/credentials` にコピペする
