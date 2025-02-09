---
title: Astro+Fuwariブログにgiscusのコメント機能を追加する
published: 2025-02-09
description: "Fuwariカスタマイズ 2/n"
image: "cover.png"
tags: ["Astro", "Fuwari", "Blog", "giscus"]
category: Web
draft: false
---

[前回の記事](https://kogum4.com/posts/astro-fuwari-vercel-blog/)では、 **Astro** とそのテンプレート **Fuwari** を使ったブログサイトを **Vercel**で公開するまでの手順をご紹介しました。今回はAstroのAstro+Fuwariテンプレートで作成したブログに、**giscus**（GitHub Discussionsを利用するコメントシステム）を追加する方法を紹介します。以下の手順で、簡単にコメント欄を実装できます。

## giscus用の設定値を取得する

1. 自分のブログのGithubリポジトリの「Settings」→「General」→「Features」でDiscussions機能を有効にする。
  :::important
  コメント用のリポジトリはPrivateではなくPublicにする必要がある。ブログのソースコード管理用とは別にコメント用のリポジトリを用意してもOK。
  :::
2. [giscusアプリ](https://github.com/apps/giscus)をGitHubアカウントに追加し、リポジトリへのアクセス権を追加する。

2. [giscus公式サイト](https://giscus.app/) へ行き、以下の項目を設定
   - **言語:** `日本語`
   - **リポジトリ:** コメントを管理するリポジトリ（例：`kogum4/blog-test`）
   - **ページとDiscussions連携設定:** デフォルト `Discussionのタイトルにページのpathnameを利用する` でOK
   - **Discussionで使用するカテゴリ:** 推奨 `Announcements` を設定
   - **機能:** お好みに合わせて設定
   - **テーマ:** `カラースキームに従う`（サイトのテーマに合わせる）  
   
   設定完了後、giscusが生成する埋め込みコード内の各属性（`data-repo`, `data-repo-id`, `data-category`, `data-category-id` など）の値をメモしておく。以下は一例
   ```javascript
      data-repo="kogum4/blog-test"
      data-repo-id="R_kgDON2WNXA"
      data-category="Announcements"
      data-category-id="DIC_kwDON2WNXM4CmyYz"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="ja"
      crossorigin="anonymous"
   ```

## giscusコメント用コンポーネントを作成

Fuwariテンプレートにはコメント機能が初めから含まれていないため、新たにコンポーネントを作成します。ここでは、Astro形式のコンポーネントとして実装します。

### 例: `src/components/comment/Giscus.astro`

```javascript
---
const giscus = {
  repo: "kogum4/blog-test",            // あなたのGitHubユーザー名/リポジトリ名
  repoId: "R_kgDON2WNXA",              // giscusで取得したリポジトリID
  category: "Announcements",           // giscusで設定したカテゴリー名
  categoryId: "DIC_kwDON2WNXM4CmyYz",  // giscusで取得したカテゴリーID
  mapping: "pathname",                 // ページURLのパスと対応付け
  reactionsEnabled: true,              // リアクション機能を有効にする
  inputPosition: "bottom",             // コメント入力欄の位置（下部）
  lang: "ja",
  theme: "preferred_color_scheme",
};
---

<div id="giscus_container">
  <script src="https://giscus.app/client.js"
    data-repo={giscus.repo}
    data-repo-id={giscus.repoId}
    data-category={giscus.category}
    data-category-id={giscus.categoryId}
    data-mapping={giscus.mapping}
    data-reactions-enabled={giscus.reactionsEnabled ? "1" : "0"}
    data-input-position={giscus.inputPosition}
    data-theme={giscus.theme}
    data-lang={giscus.lang}
    crossorigin="anonymous"
    async>
  </script>
</div>
```

※後から設定値を外部ファイル（例：`src/config.ts`）で管理する場合は、上記の`giscus`オブジェクトをそちらから読み込むように変更してください。

## レイアウトにコメントコンポーネントを組み込む

次に、各ブログ記事ページの下部にコメント欄を表示するため、投稿用レイアウト（`src/pages/posts/[...slug].astro`）に作成したコンポーネントを組み込みます。

### 例: `src/pages/posts/[...slug].astro`

```javascript
---
// ...
import Giscus from "../../components/comment/Giscus.astro"
// 他のインポートやフロントマターの処理…
---
// ...
// ポストのレイアウトに<Giscus />を挿入

            {licenseConfig.enable && <License title={entry.data.title} slug={entry.slug} pubDate={entry.data.published} class="mb-6 rounded-xl license-container onload-animation"></License>}

        </div>
    </div>

    <Giscus /> // 挿入

    <div class="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full">

// ...
```

これで、各記事ページの下部にgiscusのコメントウィジェットが埋め込まれます。

## 動作確認＆デプロイ

1. **ローカルで確認:**  
   プロジェクトルートで開発サーバーを起動します。
   ```bash
   pnpm dev
   ```
   ブラウザで記事ページを開き、ページ下部にgiscusのコメント欄が表示されるか確認してください。

2. **変更をコミット＆プッシュ:**  
   問題なければGitで変更をコミットし、リモートリポジトリにプッシュします。
   ```bash
   git add .
   git commit -m "Add giscus comment component"
   git push origin main
   ```

3. **Vercelで自動デプロイ:**  
   GitHubにプッシュすると、Vercelが自動的にビルド・デプロイを開始します。デプロイ完了後、本番サイトでもコメント機能が正しく動作するか確認してください。

---

以上、Fuwari公式テンプレートから作成したリポジトリに、giscusコメント機能を追加する方法でした。ぜひお試しください！

## 関連記事
- [Astro(Fuwari)＋Vercelで手軽に素敵な個人ブログを作る](https://kogum4.com/posts/astro-fuwari-vercel-blog/)
- Astro+Fuwariブログにgiscusのコメント機能を追加する(本記事)
- Astro+Fuwariブログで記事ごとにOGP画像を設定する(公開予定)