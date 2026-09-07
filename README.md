# YouTube Shorts Blocker (ショート動画非表示 Chrome拡張機能)

[![Release](https://img.shields.io/github/v/release/sugayutokyo/delete-short?color=red&label=Release)](https://github.com/sugayutokyo/delete-short/releases)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

YouTube上のすべての**ショート動画**および**ゲームルーム (Playables)** を非表示にするGoogle Chrome拡張機能です。  
拡張機能のアイコンを**右クリック**して表示されるメニューから、いつでもワンクリックでON/OFFを切り替えられます。

---

## ✨ 主な機能

1. **すべてのショート動画・ゲームルームを徹底非表示**
   - 🏠 **ホーム / 登録チャンネル / トレンド**: フィード内のショート棚、ゲームルーム棚
   - 🔍 **検索結果**: 検索結果に混ざる個別のショート動画・ショート棚
   - 📌 **サイドバー（ガイド / ミニガイド）**: 「Shorts / ショート」ボタン、「ゲームルーム / Playables」リンク
   - 👤 **チャンネルページ**: 「ショート」タブ
   - 🎬 **動画再生画面**: 関連動画・おすすめ欄のショート棚
2. **拡張機能の右クリックで手軽にON/OFF切り替え**
   - ツールバーのアイコンを**右クリック**すると、`✓ ショート動画非表示: ON (クリックでOFF)` が表示され、ワンクリックで瞬時に切り替え可能
   - ページのリロードなしで即座に表示 / 非表示が反映されます
   - ツールバーのアイコンには現在の状態（`ON` / `OFF`）がバッジ表示されます
   - アイコンの通常クリック（左クリック）でも同様にトグルできます
3. **通常動画プレイヤーへの自動リダイレクト**
   - ショート動画のURL（`https://www.youtube.com/shorts/VIDEO_ID`）に直接アクセスした場合、通常の動画プレイヤー（`https://www.youtube.com/watch?v=VIDEO_ID`）へ自動転送されます。縦型無限スクロールのショート画面に囚われる心配がありません
   - ゲームルーム（`https://www.youtube.com/playables`）への直接アクセス時もトップページへ自動転送されます
4. **超高速・チラツキ（FOUC）ゼロ**
   - ページの描画開始前（`document_start`）に即座に非表示スタイルを適用するため、読み込み時に一瞬だけショートが表示される不快なチラツキがありません

---

## 📥 インストール手順

### 【方法1】GitHub Releases からダウンロード（推奨）

一般ユーザーの方はこちらの手順が最も簡単です。

1. [**GitHub Releases ページ**](https://github.com/sugayutokyo/delete-short/releases) にアクセスします。
2. 最新バージョン（Latest）の **Assets** から `delete-short-vX.X.X.zip` をダウンロードします。
3. ダウンロードした ZIP ファイルを任意の場所に解凍（展開）します。
   > ⚠️ **注意**: 解凍したフォルダは削除せず、PC内の任意の場所（例: ドキュメントフォルダなど）に保管してください。
4. Google Chrome を開き、アドレスバーに以下を入力して移動します：
   ```text
   chrome://extensions/
   ```
5. 画面右上にある **「デベロッパー モード」** のスイッチを **ON** にします。
6. 画面左上に出現する **「パッケージ化されていない拡張機能を読み込む」** ボタンをクリックします。
7. 手順3で解凍したフォルダ（`manifest.json` が入っているフォルダ）を選択します。
8. 拡張機能一覧に **「YouTube Shorts Blocker (ショート動画非表示)」** が追加されれば完了です！

> 💡 **おすすめ: ツールバーへのピン留め**  
> Chrome右上にある「パズルピース」マーク（拡張機能アイコン）をクリックし、`YouTube Shorts Blocker` の横にある **ピン留めアイコン** をクリックすると、常にツールバーにアイコンが表示され、右クリックでの操作が便利になります。

---

### 【方法2】Git Clone から導入（開発者向け）

リポジトリを直接クローンして使いたい開発者向けの手順です。

```bash
# リポジトリのクローン
git clone https://github.com/sugayutokyo/delete-short.git
```

1. Chromeで `chrome://extensions/` を開きます。
2. 右上の「デベロッパー モード」を ON にします。
3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンした `delete-short` フォルダを選択します。

---

## 🔄 アップデート手順

新バージョンがリリースされた場合の手順です：

1. [GitHub Releases](https://github.com/sugayutokyo/delete-short/releases) から最新の ZIP をダウンロードして解凍します。
2. 既存のフォルダ内容を最新版で上書きします。
3. `chrome://extensions/` を開き、YouTube Shorts Blocker カード内の **「更新」アイコン**（くるっとした矢印ボタン）をクリックします。

---

## 🎮 使い方

1. **YouTube（`https://www.youtube.com/`）を開く**  
   ショート動画やゲームルームが自動的に非表示になります。
2. **一時的にショート動画を見たいとき**  
   - ツールバーの拡張機能アイコンを **右クリック**
   - `✓ ショート動画非表示: ON (クリックでOFF)` をクリック
   - アイコンのバッジが `OFF` になり、ページをリロードせずにショート動画が再表示されます
3. **再度非表示にしたいとき**  
   - アイコンを右クリックして再度クリック（またはアイコンを左クリック）するだけで、瞬時に `ON` に戻ります。

---

## 📦 ファイル構成

```text
delete-short/
├── manifest.json       # Manifest V3 拡張機能構成ファイル
├── background.js       # 右クリックメニュー制御・状態管理（Service Worker）
├── content.css         # ショート・ゲームルームを網羅的に非表示にするCSS
├── content.js          # DOM制御・SPA画面遷移監視・リダイレクト処理
├── icons/              # アプリアイコン (16px, 32px, 48px, 128px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── .gitignore          # Git除外設定
└── README.md           # 本ドキュメント
```

---

## 🛠️ 管理者向け: リリースZIPの作成方法

GitHub Release に添付する ZIP ファイルを作成するコマンド：

```bash
zip -r delete-short-v1.0.0.zip manifest.json background.js content.css content.js icons/ README.md
```

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) の下で公開されています。
