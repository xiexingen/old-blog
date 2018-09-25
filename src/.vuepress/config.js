const path = require('path')
const nodeExternals = require('webpack-node-externals')

const resolve = pathName => path.join(__dirname, pathName)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  base: isProd ? '/' : '/',
  dest: 'docs',
  title: "程序有Bug's Blog",
  description: '谢新根的博客。不乱于心 不困于情 不畏将来 不念过去 如此 甚好！',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3F51B5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/192.png' }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/192.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3F51B5' }]
  ],
  serviceWorker: true,
  theme: '',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "XXG's Blog",
      description: '谢新根的博客。不乱于心 不困于情 不畏将来 不念过去 如此 甚好！'
    }
  },
  configureWebpack: (config, isServer) => {
    const myConfig = {
      resolve: {
        alias: {
          '@pub': resolve('./public')
        }
      },
      module: {
        rules: [{
          test: /vuetify.+\.js$/,
          loader: resolve('./ignoreStylus'),
        }]
      }
    }
    if (isServer) {
      myConfig.externals = nodeExternals({
        whitelist: [/vuetify/, /fortawesome/, /prismjs/]
      })
    }
    return myConfig
  },
  themeConfig: {
    lang: 'zh-CN',
    postDir: '/posts',
    subTitle: '爱代码爱生活！',
    author: '谢新根',
    email: '1002275364@qq.com',
    since: 2015,
    avatar: '/face.jpg',
    avatarLink: '/',
    menus: [
      // icons by https://fontawesome.com/icons
      {
        text: '首页',
        icon: 'fa fa-home',
        url: '/'
      },
      {
        text: '标签',
        icon: 'fa fa-tag',
        url: '/tags'
      },
      {
        text: 'Github',
        icon: 'fab fa-github',
        url: 'https://github.com/xiexingen',
        external: true
      },
      // {
      //   text: 'Weibo',
      //   icon: 'fab fa-weibo',
      //   url: 'https://www.weibo.com/ysweb',
      //   external: true
      // },
      {
        text: '关于',
        icon: 'fa fa-user-secret',
        url: '/about'
      }
    ],
    socials: ['Weibo', 'QQ', 'Facebook', 'Twitter', 'GooglePlus'],
    colors: {
      // generate by https://vuetifyjs.com/zh-Hans/theme-generator
      // primary: '#3F51B5',
      // secondary: '#6d6d6d',
      // accent: '#E91E63',
      // error: '#f44336',
      // warning: '#FFC107',
      // info: '#00B8D4',
      // success: '#4caf50'
      primary: "#448AFF",
      secondary: "#2979FF",
      accent: "#448AFF",
      error: "#FF4081",
      warning: "#FBC02D",
      info: "#00B0FF",
      success: "#4caf50"
    },
    format: {
      date: 'YYYY年MM月DD日',
      dateTime: 'YYYY年MM月DD日 HH:mm:ss'
    },
    pagination: {
      path: '/page/:pageNum',
      pageSize: 5
    },
    tags: {
      path: '/tags/:tagName'
    },
    categories: {
      path: '/categories/:category'
    }
  }
}
