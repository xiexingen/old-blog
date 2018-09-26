(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{336:function(t,s,n){"use strict";n.r(s);var a=n(1),e=Object(a.a)({},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"content"},[s("p",[this._v("使用docker-compose按照webapi&mysql\n")]),s("p",[s("router-link",{attrs:{to:"./05docker-webapi-mysql.html"}},[this._v("接Docker制作WebApi&MySql")])],1),this._m(0),this._m(1),this._m(2),this._m(3),this._m(4)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("创建docker-compose.yml文件")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("pre",{pre:!0,attrs:{class:"language-docker"}},[n("code",[t._v("version "),n("span",{attrs:{class:"token string"}},[t._v("'1'")]),t._v("\n\nservices"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  db"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      image"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mysql/mysql"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server\n      container_name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'db'")]),t._v("\n      command"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mysqld "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("character"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("set"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server=utf8 "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("collaction"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server=utf8_general_ci\n      restart"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n      ports"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{attrs:{class:"token string"}},[t._v("'3306:3306'")]),t._v("\n      environment"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        MYSQL_ROOT_PASSWORD"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Abcd1234\n        MYSQL_USER"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sa\n        MYSQL_PASWORD"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Abcd1234\n      volumes"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" /docker/mysql/db"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("init"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/docker"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("entrypoint"),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("initdb.d\n  webapi"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      build"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" .\n      container_name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'webapi01'")]),t._v("\n      ports"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{attrs:{class:"token string"}},[t._v("'5000:80'")]),t._v("\n      depends_on"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" db\n")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("【注意】"),s("br"),this._v("\n由于db需要初始化用户角色 所以在资料卷中指定目录下放入sql 内容"),s("br"),this._v("\nGRANT ALL PRIVILEGES ON "),s("em",[this._v(".")]),this._v(" TO 'sa'@'%' WITH GRANT OPTION;")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",{attrs:{start:"2"}},[s("li",[this._v("执行命令"),s("br"),this._v("\ndocker-compose build"),s("br"),this._v("\ndocker up\t//docker down 与docker up相反")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[s("a",{attrs:{href:"/post-assets/docker-compose/mysql-docker-compose.yml"}},[this._v("docker-compose文件")])])])}],!1,null,null,null);e.options.__file="06docker-compose.md";s.default=e.exports}}]);