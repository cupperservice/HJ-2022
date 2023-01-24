# 本授業の必須条件
1. モジュール1 - モジュール10 の確認テストをすべて合格すること
https://awsacademy.instructure.com/courses/16254/modules

2. 演習課題のどれか２つを提出すること
    * [Lambda関数を使ってみる](../Lambda関数を使ってみる/README.md)
    * [インフラ構築](https://github.com/cupperservice/hj-sample-infra)
    * [アプリケーションを更新する](../アプリケーションを更新する/README.md)

## 期限
1/31(火) 17:00

# 2022年度の授業用の資材置き場
## 後期
* [9/6の授業内容](./0906/README.md)
* [9/13の授業内容](./0913/README.md)
* [9/20の授業内容](./0920/README.md)
* [9/27の授業内容](./0927/README.md)
* [10/4の授業内容](./1004/README.md)
* [10/11の授業内容](./1011/README.md)
* [10/18の授業内容](./1018/README.md)
* [10/25の授業内容](./1025/README.md)
* [11/1の授業内容](./1101/README.md)
* [11/8の授業内容](./1108/README.md)
* [11/15の授業内容](./1115/README.md)
* [11/22の授業内容](./1122/README.md)
* [11/29の授業内容](./1129/README.md)
* [12/6の授業内容](./1206/README.md)
* [12/13の授業内容](./1213/README.md)
* [12/20の授業内容](./1220/README.md)
* [1/10の授業内容](./0110/README.md)
* [1/17の授業内容](./0117/README.md)
* [1/24の授業内容](./0124/README.md)

### 演習課題
* [演習課題](./演習課題（後期）/README.md)
* [Lambda関数を使ってみる](./Lambda関数を使ってみる/README.md)
* [アプリケーションを更新する](./アプリケーションを更新する/README.md)

---
### __注意事項__
作業完了後に以下を実施すること
1. AutoScaling Groupのインスタンス数を0に変更する
    1. EC2サービスを開く

    2. 左のメニューから `Auto Scaling Groups` を選択

    3. `hj-sample-asg` をクリック

    4. `Group details` を編集（すべての値を0に設定）

2. RDSを削除
    1. RDSサービスを開く

    2. 左のメニューから `Database` を選択

    3. RDSの Writer instace を選択

    4. 右上のメニューからActions -> Delete を選択

    5. 表示されたダイアログで以下を実施

        1. Create final snapshot? のチェックを外す
        2. I acknowledge ..... をチェックする
        3. テキストボックスに delete me を入力
        4. Delete ボタンを押す
---
## 前期
* [4/12の授業内容](./0412/README.md)
* [4/19の授業内容](./0419/README.md)
* [4/26の授業内容](./0426/README.md)
* [5/17の授業内容](./0517/README.md)
* [5/24の授業内容](./0524/README.md)
* [5/31の授業内容](./0531/README.md)
* [6/7の授業内容](./0607/README.md)
* [6/14の授業内容](./0614/README.md)
* [6/21の授業内容](./0621/README.md)
* [7/5の授業内容](./0705/README.md)
* [7/12の授業内容](./0712/README.md)
* [7/19の授業内容](./0719/README.md)
* [7/26の授業内容](./0726/README.md)

### [サンプルコードの実行方法](./HowToBuildSampleCode.md)
