# YouTube Shorts & Soccer Spoiler Blocker (Chrome拡張機能)

[![Release](https://img.shields.io/github/v/release/sugayutokyo/delete-short?color=red&label=Release)](https://github.com/sugayutokyo/delete-short/releases)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

YouTube上の**ショート動画**や**ゲームルーム (Playables)** の非表示に加え、**サッカーのネタバレ防止マスク機能**を搭載したGoogle Chrome拡張機能です。  
拡張機能のアイコンを**右クリック**して表示されるメニューから、各機能を個別にON/OFF切り替えできます。

---

## ✨ 主な機能

### 1. ⚽ サッカーネタバレ防止マスク機能（New!）
- **対象リーグ（計86クラブを完全網羅）**:
  - 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **プレミアリーグ 1部**（アーセナル、マンチェスター・C、リヴァプール、ブライトン等 全20クラブ）
  - 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **プレミアリーグ 2部 / EFLチャンピオンシップ**（リーズ、バーンリー、ルートン、サンダーランド等 全24クラブ）
  - 🇪🇸 **ラ・リーガ 1部**（レアル・マドリード、バルセロナ、レアル・ソシエダ、アトレティコ等 全20クラブ）
  - 🇪🇸 **ラ・リーガ 2部 / ハイパーモーション**（エイバル、サラゴサ、デポルティーボ等 全22クラブ）
- **動画カードをすりガラスマスクで保護**:
  - タイトルに対象クラブ名（日本語・英語・略称・通称）が含まれる動画のサムネイルとタイトルを自動で覆い、スコアやハイライトのネタバレを防ぎます。
- **ワンクリックでマスク解除**:
  - マスクをクリックすると、**動画再生ページへ遷移することなく**、マスクだけが安全に剥がれて動画情報を確認できます。

### 2. 🚫 すべてのショート動画・ゲームルームを徹底非表示
- 🏠 **ホーム / 登録チャンネル / トレンド**: フィード内のショート棚、ゲームルーム棚
- 🔍 **検索結果**: 検索結果に混ざる個別のショート動画・ショート棚
- 📌 **サイドバー（ガイド / ミニガイド）**: 「Shorts / ショート」ボタン、「ゲームルーム / Playables」リンク
- 👤 **チャンネルページ**: 「ショート」タブ
- 🎬 **動画再生画面**: 関連動画・おすすめ欄のショート棚
- 🔀 **通常プレイヤーへの自動リダイレクト**: `/shorts/VIDEO_ID` にアクセスした場合は自動で通常の動画プレイヤー（`/watch?v=VIDEO_ID`）へ転送されます。

### 3. 🖱️ 拡張機能の右クリックで手軽にON/OFF切り替え
- ツールバーのアイコンを**右クリック**すると、以下の2つの項目が表示され、独立して切り替え可能です：
  - `✓ ショート・ゲームルーム非表示: ON / OFF`
  - `✓ サッカーネタバレ防止マスク: ON / OFF`
- ページのリロードなしで即座に設定が反映されます。
- ツールバーのアイコンには現在の状態（`ON` / `OFF`）がバッジ表示されます。

### 4. ⚡ 超高速・チラツキ（FOUC）ゼロ
- ページ描画開始前（`document_start`）に即座に非表示スタイルを適用するため、読み込み時に一瞬だけショートが表示される不快なチラツキがありません。

---

## 📥 インストール手順

### 【方法1】GitHub Releases からダウンロード（推奨）

1. [**GitHub Releases ページ**](https://github.com/sugayutokyo/delete-short/releases) にアクセスします。
2. 最新バージョンの **Assets** から `delete-short-vX.X.X.zip` をダウンロードします。
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
> Chrome右上にある「パズルピース」マーク（拡張機能アイコン）をクリックし、ピン留めアイコンをクリックすると、常にツールバーに表示され、右クリック操作が快適になります。

---

### 【方法2】Git Clone から導入（開発者向け）

```bash
git clone https://github.com/sugayutokyo/delete-short.git
```

1. Chromeで `chrome://extensions/` を開きます。
2. 右上の「デベロッパー モード」を ON にします。
3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンした `delete-short` フォルダを選択します。

---

## 🔄 アップデート手順

1. [GitHub Releases](https://github.com/sugayutokyo/delete-short/releases) から最新の ZIP をダウンロードして解凍します。
2. 既存のフォルダ内容を最新版で上書きします。
3. `chrome://extensions/` を開き、YouTube Shorts Blocker カード内の **「更新」アイコン**（くるっとした矢印ボタン）をクリックします。

---

## 🎮 使い方

1. **YouTube（`https://www.youtube.com/`）を開く**  
   ショート動画やゲームルームが非表示になり、サッカー関連の動画には自動でネタバレ防止マスクが適用されます。
2. **マスクされた動画を見たいとき**  
   - マスク（`⚽ サッカーネタバレ防止マスク`）をクリックすると、マスクが剥がれてサムネイルとタイトルが表示されます（動画ページへのジャンプは発生しません）。
   - 内容を確認後、もう一度クリックすると通常通り動画再生ページへ遷移します。
3. **右クリックメニューでの設定切り替え**  
   - ツールバーのアイコンを**右クリック**し、切り替えたい機能のチェックボックスをクリックするだけで即座に反映されます。

---

## 📦 ファイル構成

```text
delete-short/
├── manifest.json       # Manifest V3 拡張機能構成ファイル
├── background.js       # 右クリックメニュー制御・状態管理（Service Worker）
├── clubs.js            # プレミア・リーガ各クラブ名辞書および正規表現マッチャー
├── content.css         # 非表示スタイル & ネタバレ防止マスクUI
├── content.js          # DOM制御・動画スキャン・SPA画面遷移監視
├── icons/              # アプリアイコン (16px, 32px, 48px, 128px)
├── .gitignore          # Git除外設定
├── LICENSE             # MIT License
└── README.md           # 本ドキュメント
```

---

## 🛠️ 管理者向け: リリースZIPの作成方法

```bash
zip -r delete-short-v1.1.0.zip manifest.json background.js clubs.js content.css content.js icons/ README.md LICENSE
```

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) の下で公開されています。
