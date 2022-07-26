* 作成：2022/07/26
* 更新：2022/07/26

アプリケーション構築手順
# ネットワークの構築
## 必要なリソース
* VPC
* Subnet Group
  * public  x 2
  * private x 2
  
  __AZ(Availability Zone)がダウンしても継続できるようにすること__
* Security Group
  * bastion  
  Internetからのアクセスを許可(22)
  * web  
  Internetからのアクセスを許可(80)
  * app  
  webからのアクセスを許可(3000)
  * db  
  appからのアクセスを許可(3306)
* Internet Gateway
* Route table
  * public
  * private

# RDSの構築

# ビルド環境の構築
## 必要なサーバ
* ビルドサーバ
  * IAM: Amazon Linux2
  * Instance Type: t2.micro
  * Security Group: bastion
  * Subnet Group: Public
* テンプレートサーバ
  * IAM: Amazon Linux2
  * Instance Type: t2.micro
  * Security Group: app
  * Subnet Group: Private

### ビルドサーバのセットアップ
1. gitをインストールする

### テンプレートサーバのセットアップ
1. nodeをインストールする

### アプリケーションのビルド
* ビルドサーバでの作業
1. clone
2. rsync

* テンプレートサーバでの作業
