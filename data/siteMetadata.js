/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'kogum_$qR+16',
  author: 'kogum4',
  headerTitle: 'kogum_$qR+16',
  description: '音の技術のこととか書いてます',
  language: 'ja-JP',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://kogum4.com/',
  siteRepo: 'https://github.com/koguma2102/personal-blog',
  // siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'koguma2102@gmail.com',
  github: 'https://github.com/koguma2102',
  x: 'https://x.com/kogum4vrc',
  youtube: 'https://www.youtube.com/@koguma2102',
  spotify: 'https://open.spotify.com/artist/2JZgxYZrxlHfXYGRoRruon?si=skWqYMu0TAioPRpnmwMzFA',
  vrchat: 'https://vrchat.com/home/user/usr_c6f9aed3-4094-4075-8f73-9f91a06f9702',
  locale: 'ja-JP',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'ja',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
