# KMSB — 学生起業マッチング（仮）

学生同士の起業精神を持つ人たちをつなぐマッチングアプリのリポジトリです。第1段階として TypeScript/Express による最小 API を用意しています。

## 目的（Phase 1）
- プロフィール作成・取得の最小 API 提供
- シンプルなマッチング（スタブ）の提供
- 今後の拡張（認証/DB/フロントエンド）に備えた土台作り

## 技術スタック（暫定）
- API: Node.js + TypeScript + Express
- データ: 現状はインメモリ（今後は DB へ切替予定）

## 開発環境
- エディタ: Visual Studio / Visual Studio Code
- OS: Windows 10/11
- Node.js: 18 以上推奨

## セットアップ
1. 依存関係インストール
   ```bash
   npm install
   ```
2. 開発サーバ起動
   ```bash
   npm run dev
   ```
   既定では `http://localhost:3000` で起動します。

## エンドポイント（最小）
- `GET /health` ヘルスチェック
- `POST /profiles` プロフィール作成
  - body 例:
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "university": "XYZ Univ.",
      "skills": ["frontend", "design"],
      "interests": ["edtech", "fintech"],
      "bio": "UI/UXに興味",
      "lookingFor": "バックエンド経験者"
    }
    ```
- `GET /profiles` プロフィール一覧
- `GET /profiles/:id` プロフィール取得
- `PATCH /profiles/:id` プロフィール更新（部分更新）
- `POST /match` マッチ候補のスコアリング
  - body 例:
    ```json
    { "requesterId": "<uuid>", "limit": 5, "weights": { "skills": 0.6, "interests": 0.3, "university": 0.1 } }
    ```
- `POST /likes` いいね（相手への興味を表明）
  - body 例: `{ "fromId": "<uuid>", "toId": "<uuid>" }`
- `GET /matches/:id` 相互マッチ一覧（id のユーザ視点）

## ロードマップ（案）
- 認証: 学生認証 + OAuth（GitHub/Google）
- DB: Prisma + PostgreSQL/SQLite
- マッチング: スコアリング/重み付けの導入
- フロントエンド: Next.js or React SPA
- メッセージング: Realtime（WebSocket）

## コーディング規約（暫定）
- インデントは半角スペース 4
- 文字コードは UTF-8（BOM なし推奨）
- 改行コードは Windows (CRLF)

## ライセンス
未定（必要に応じて追加します）
