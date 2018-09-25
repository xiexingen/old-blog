/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "5bc5c7f060e7bfce5cb24b5a7eadb2bb"
  },
  {
    "url": "about/index.html",
    "revision": "5afbabfaea3421a9abcc7a195019444b"
  },
  {
    "url": "assets/css/styles.6dfc2d42.css",
    "revision": "53a21182c1c5ba9f72681de35bdb72c8"
  },
  {
    "url": "assets/fonts/fa-brands-400.030846b7.woff",
    "revision": "030846b7226a63373512cbd2c71ff51a"
  },
  {
    "url": "assets/fonts/fa-brands-400.3f5a250e.ttf",
    "revision": "3f5a250e01aa2a2c757c8d8915216e0b"
  },
  {
    "url": "assets/fonts/fa-brands-400.4291d4b6.eot",
    "revision": "4291d4b6c28b411e821a90adb4716fd7"
  },
  {
    "url": "assets/fonts/fa-brands-400.65e3be4e.woff2",
    "revision": "65e3be4eea08191c64040fbcb8006068"
  },
  {
    "url": "assets/fonts/fa-regular-400.222941bf.woff",
    "revision": "222941bf21f9c9cb93bace95e9171d39"
  },
  {
    "url": "assets/fonts/fa-regular-400.6bf2d6c8.ttf",
    "revision": "6bf2d6c8c5f78cb9fc035dc7c2b1253e"
  },
  {
    "url": "assets/fonts/fa-regular-400.914437d6.woff2",
    "revision": "914437d606603d81e81a52e9e9b704b5"
  },
  {
    "url": "assets/fonts/fa-regular-400.d30b8018.eot",
    "revision": "d30b80185b2bd2b99ddcfde903a49a50"
  },
  {
    "url": "assets/fonts/fa-solid-900.140f4148.woff",
    "revision": "140f41485edce6f713abe17625eba4c1"
  },
  {
    "url": "assets/fonts/fa-solid-900.4910ec73.eot",
    "revision": "4910ec733558f59bf05834d4f831a48d"
  },
  {
    "url": "assets/fonts/fa-solid-900.813b8aee.woff2",
    "revision": "813b8aee60f235b36887a388b70e1359"
  },
  {
    "url": "assets/fonts/fa-solid-900.e57e108a.ttf",
    "revision": "e57e108a1ae04ca2b27cab75e4478867"
  },
  {
    "url": "assets/fonts/Roboto-Bold.39b2c303.woff2",
    "revision": "39b2c3031be6b4ea96e2e3e95d307814"
  },
  {
    "url": "assets/fonts/Roboto-Bold.dc81817d.woff",
    "revision": "dc81817def276b4f21395f7ea5e88dcd"
  },
  {
    "url": "assets/fonts/Roboto-Bold.e31fcf18.ttf",
    "revision": "e31fcf1885e371e19f5786c2bdfeae1b"
  },
  {
    "url": "assets/fonts/Roboto-Light.3b813c2a.woff",
    "revision": "3b813c2ae0d04909a33a18d792912ee7"
  },
  {
    "url": "assets/fonts/Roboto-Light.46e48ce0.ttf",
    "revision": "46e48ce0628835f68a7369d0254e4283"
  },
  {
    "url": "assets/fonts/Roboto-Light.69f8a061.woff2",
    "revision": "69f8a0617ac472f78e45841323a3df9e"
  },
  {
    "url": "assets/fonts/Roboto-Medium.574fd0b5.woff2",
    "revision": "574fd0b50367f886d359e8264938fc37"
  },
  {
    "url": "assets/fonts/Roboto-Medium.894a2ede.ttf",
    "revision": "894a2ede85a483bf9bedefd4db45cdb9"
  },
  {
    "url": "assets/fonts/Roboto-Medium.fc78759e.woff",
    "revision": "fc78759e93a6cac50458610e3d9d63a0"
  },
  {
    "url": "assets/fonts/Roboto-Regular.2751ee43.woff2",
    "revision": "2751ee43015f9884c3642f103b7f70c9"
  },
  {
    "url": "assets/fonts/Roboto-Regular.ba3dcd89.woff",
    "revision": "ba3dcd8903e3d0af5de7792777f8ae0d"
  },
  {
    "url": "assets/fonts/Roboto-Regular.df7b648c.ttf",
    "revision": "df7b648ce5356ea1ebce435b3459fd60"
  },
  {
    "url": "assets/fonts/Roboto-Thin.7500519d.woff",
    "revision": "7500519de3d82e33d1587f8042e2afcb"
  },
  {
    "url": "assets/fonts/Roboto-Thin.94998475.ttf",
    "revision": "94998475f6aea65f558494802416c1cf"
  },
  {
    "url": "assets/fonts/Roboto-Thin.954bbdeb.woff2",
    "revision": "954bbdeb86483e4ffea00c4591530ece"
  },
  {
    "url": "assets/img/brand.e237ead6.jpg",
    "revision": "e237ead6ee07f459cb8e394f5772b8f1"
  },
  {
    "url": "assets/img/fa-brands-400.8e04d338.svg",
    "revision": "8e04d338e5f3a734136e5fa058f60d0b"
  },
  {
    "url": "assets/img/fa-regular-400.47d19eca.svg",
    "revision": "47d19eca4372c3489b27f39f512e3a07"
  },
  {
    "url": "assets/img/fa-solid-900.e98a92ac.svg",
    "revision": "e98a92ac980c63c46a7e25c4fbcf30ef"
  },
  {
    "url": "assets/img/face.615d4c65.jpg",
    "revision": "615d4c65b649c6a0dbd800e29bbb55af"
  },
  {
    "url": "assets/js/1.815c44af.js",
    "revision": "a159b152c85f8f0bb15ee777135ccc21"
  },
  {
    "url": "assets/js/2.3b28d5d6.js",
    "revision": "af21377fda4c15df46a87bc6d2011d85"
  },
  {
    "url": "assets/js/3.eb97d133.js",
    "revision": "21a97599a1ab3a524cde7371b01dfc12"
  },
  {
    "url": "assets/js/4.1250f9e8.js",
    "revision": "b4fa49fa2e8a4c8d0e329a8fb528dbce"
  },
  {
    "url": "assets/js/5.ae855265.js",
    "revision": "8f020c3910d39594f9a448f0c51f7f9f"
  },
  {
    "url": "assets/js/6.72d763f3.js",
    "revision": "d6598457187ae87094a92ac097142856"
  },
  {
    "url": "assets/js/7.20e2df66.js",
    "revision": "d9f49463516d7b5eacaca3e3d4af006c"
  },
  {
    "url": "assets/js/8.57ec0924.js",
    "revision": "c18bf6fd2e81d23d00936ca5fd4b5a4d"
  },
  {
    "url": "assets/js/9.cdd47b88.js",
    "revision": "91a68a1b747bb05639598c08258a8da1"
  },
  {
    "url": "assets/js/app.6dfc2d42.js",
    "revision": "d4795147f2d948491e66993ce0b69310"
  },
  {
    "url": "face.jpg",
    "revision": "615d4c65b649c6a0dbd800e29bbb55af"
  },
  {
    "url": "icons/192.png",
    "revision": "68bb209813d9962fe145b690d1838fc8"
  },
  {
    "url": "icons/512.png",
    "revision": "3987835f3e7dfed8d78e559e34c49596"
  },
  {
    "url": "icons/favicon.png",
    "revision": "cfa97d05be7622e0f57799d7149b93f0"
  },
  {
    "url": "index.html",
    "revision": "ecf9f736086a177a3322a94f6a902c71"
  },
  {
    "url": "posts/cursor-offset-at-input.html",
    "revision": "2c4834fa70bfcde39928138762446438"
  },
  {
    "url": "posts/test-markdown.html",
    "revision": "7e57219afafde8ebcf11e0d9d1d31e4e"
  },
  {
    "url": "posts/text-truncation.html",
    "revision": "4017c95bac00755842664d1f05ee63ff"
  },
  {
    "url": "posts/vue-best-practices.html",
    "revision": "05b75f97e57e998fd6273b30dcbc74a9"
  },
  {
    "url": "posts/webpack-use-lodash.html",
    "revision": "73d98a00bc53005d81abcfcd7b809841"
  },
  {
    "url": "posts/write-good-front-end-component.html",
    "revision": "693df94bf5c53c4a3779300b781e23a4"
  },
  {
    "url": "tags/index.html",
    "revision": "ba558affe07916a93bc9a645c0145e0d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
