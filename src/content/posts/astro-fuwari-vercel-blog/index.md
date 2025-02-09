---
title: Astro(Fuwari)＋Vercelで手軽に素敵な個人ブログを作る
published: 2025-02-07
description: "Astro+Fuwariで作る技術ブログ 第1回"
image: "cover.png"
tags: ["Astro", "Fuwari", "Vercel", "Blog"]
category: Web
draft: false
---

本ブログサイトは静的サイトジェネレーターの **Astro** とそのテンプレート **Fuwari** をベースに、無料ホスティングサービス **Vercel** にて公開されています。備忘録も兼ねて同構成でブログを公開するまでの手順をまとめておきます。Gitの基本操作さえわかっていれば簡単にできますのでぜひお試しください。

## Fuwari テンプレートでリポジトリを作成

1. [saicaca/fuwari](https://github.com/saicaca/fuwari) へアクセスし、「Use this template」→「Create a new repository」をクリック

2. 作成したリポジトリをローカルにクローン
   ```bash
   git clone https://github.com/<ユーザー名>/<リポジトリ名>.git
   cd <リポジトリ名>
   ```

## ローカル開発環境を準備 & カスタマイズ

1. **依存パッケージのインストール**  
   ```bash
   pnpm install
   pnpm add sharp  # 画像処理ライブラリが必要
   pnpm dev
   ```
   ブラウザで [http://localhost:4321](http://localhost:4321) を開いて動作確認。 **pnpm**がインストールされていない場合は`npm install -g pnpm`コマンドでpnpmを導入後に上記コマンドを実行

2. **基本設定の変更**  
  - `src/config.ts` でサイト名・テーマカラー・プロフィール（名前、アバター画像、SNSリンクなど）を編集。設定項目は以下の通り。 

    ```typescript
    import type {
      LicenseConfig,
      NavBarConfig,
      ProfileConfig,
      SiteConfig,
    } from './types/config'
    import { LinkPreset } from './types/config'

    export const siteConfig: SiteConfig = {
      title: 'kogum_$qR+16',        // サイト（ブログ）のタイトル
      subtitle: 'Audio Tech Blog',  // サブタイトル（ブログの副題）
      lang: 'ja',                   // サイト言語: 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th' など
      themeColor: {
        hue: 265,       // テーマカラーの色相 (0〜360)。例: 赤0, 緑120, 水色200, ピンク345 等
        fixed: true,    // trueにすると、訪問者によるテーマカラー切り替え（カラーピッカー）を隠す
      },
      banner: {
        enable: false,               // サイトトップにバナー画像を表示するかどうか
        src: 'assets/images/demo-banner.png',   // バナー画像のパス。先頭が'/'ならpublic直下、そうでなければsrc/assets内
        position: 'center',          // 画像の表示位置: 'top' | 'center' | 'bottom'
        credit: {
          enable: false, // バナー画像の作者やクレジットを表示するかどうか
          text: '',      // クレジットの文章
          url: ''        // クレジットのリンク先URL
        }
      },
      toc: {
        enable: true,  // 記事ページで目次(Table of Contents)を表示するかどうか
        depth: 2       // 目次に含める見出しの深さ: 1〜3
      },
      favicon: [
        // 空配列の場合はデフォルトのファビコンを使用。
        // 複数のファビコンを切り替えたいときは要素を追加し、
        // 例えばlight/darkテーマ用に分けて記述できる。
        /*
        {
          src: '/favicon/icon.png', // publicディレクトリを基準とするファビコンのパス
          theme: 'light',           // (オプション) 'light' か 'dark'。テーマ別ファビコンがある場合に設定
          sizes: '32x32',           // (オプション) 画像サイズが複数あるときに指定
        },
        */
      ]
    }

    export const navBarConfig: NavBarConfig = {
      links: [
        // ナビゲーションバーに表示するメニューやリンクを設定
        // 内部リンクにはLinkPresetを使うと便利
        LinkPreset.Home,    // ホーム（トップページ）へのリンク
        LinkPreset.Archive, // 全記事の一覧ページへのリンク
        LinkPreset.About,   // Aboutページへのリンク
        // {
        //   name: 'GitHub',
        //   url: 'https://github.com/saicaca/fuwari', // 外部リンクの場合
        //   external: true,                           // trueにすると別タブで開き、外部リンクアイコンを表示
        // },
      ],
    }

    export const profileConfig: ProfileConfig = {
      avatar: 'assets/images/demo-avatar.png', // プロフィール画像のパス(先頭'/'なしはsrc/assets/images基準)
      name: 'kogum4',                          // 表示名
      bio: 'Audio Programmer / Vocaloid Producer', // 一言自己紹介
      links: [
        // プロフィール欄に表示する外部サービスやSNSのリンク
        // name: サービス名やラベル
        // icon: 使用するアイコン (Iconifyの識別子: fa6-brands:github など)
        // url: リンク先URL
        {
          name: 'X',
          icon: 'fa6-brands:x-twitter',
          url: 'https://x.com/kogum4vrc',
        },
        {
          name: 'GitHub',
          icon: 'fa6-brands:github',
          url: 'https://github.com/kogum4',
        },
        {
          name: 'YouTube',
          icon: 'fa6-brands:youtube',
          url: 'https://www.youtube.com/@koguma2102',
        },
        {
          name: 'Spotify',
          icon: 'fa6-brands:spotify',
          url: 'https://open.spotify.com/artist/2JZgxYZrxlHfXYGRoRruon?si=skWqYMu0TAioPRpnmwMzFA',
        },
        {
          name: 'Mail',
          icon: 'fa6-regular:envelope',
          url: 'mailto:koguma2102@gmail.com',
        },
      ],
    }

    export const licenseConfig: LicenseConfig = {
      enable: false,                            // ライセンス表記を有効にするかどうか
      name: 'CC BY-NC-SA 4.0',                  // 使用するライセンス名
      url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/', // ライセンスURL
    }
    ```

   - プロフィール画像と必要に応じてバナー画像を `src/assets/images/` に追加し、`config.ts`のパスを更新

3. **記事を追加・整理**  
  - 以下コマンドで自動生成された `src/content/posts/hello-world.md` を編集して本文を記入
    ```bash
    pnpm new-post hello-world
    ```
  - `src/content/posts`内にデフォルトで存在する記事を削除。あるいは `draft: true`に設定してデプロイ時にデフォルト記事が表示されないようにしておく。
  - `src/content/spec/about.md`を編集して自己紹介を作成

## GitHub にプッシュ

```bash
git add .
git commit -m "カスタマイズ&記事追加"
git push origin main
```

## Vercel でデプロイ

1. [Vercel](https://vercel.com/) にサインアップ（GitHub連携推奨）
2. 「Add New...」 → 「Project」→ 対象リポジトリをImport → 自動で Astro 設定を読み込み → 「Deploy」
3. デプロイが完了すると、 `xxxx.vercel.app` のドメインが割り当てられる。アクセスして動作確認

## カスタムドメイン設定（任意）

1. Vercel プロジェクトの「Settings」→「Domains」→「Add」→ 独自ドメインを追加
2. 表示される指示に従い、DNS レコード (A or CNAME) を設定
3. 数分～数時間後に「Verified」になれば完了
---
これで最低限のブログが完成します。あとは記事を追加し、`git push` すれば自動デプロイされます。なお、本サイトのリポジトリは以下で公開してますのでぜひ参考にしてください。

::github{repo="kogum4/kogum4-blog"}

## 関連記事
- Astro(Fuwari)＋Vercelで手軽に素敵な個人ブログを作る(本記事)
- [Astro+Fuwariブログにgiscusのコメント機能を追加する](https://kogum4.com/posts/astro-fuwari-comment-giscus/)
- [Astro+Fuwariブログで記事ごとにOGP画像を設定する](https://kogum4.com/posts/astro-fuwari-ogp-image/)