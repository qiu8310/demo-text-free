module.exports = function(grunt) {
  var LIVERELOAD_PORT = 56789;
  //var TF = require('../scripts/main.js');
  //grunt.loadTasks('../tasks');

  var TF = require('text-free');
  grunt.loadNpmTasks('text-free');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  function getConnectMiddleWares(webRootDirs) {
    return TF.connectHelper(grunt, webRootDirs);
  }


  grunt.initConfig({
    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'app/{,*/}/*.*'
        ]
      }
    },

    textFree: {
      // This is default options
      options: {
        postUrl: '/textfree/update', // 给 connect 插件用的
        commentStart: 'tfStart',
        commentEnd: 'tfEnd',
        injectClassPrefix: '__tf-', // 当用 connect 插件时，会 inject 一些 CSS 样式，让 CSS 样式以此开头
        htmlFileExts: ['html', 'htm'],
        noComment: false,  // 如果为 true，则不会在 html 文件中注入 comment，在部署的时候可以配置为 true
        jsonFile: 'tf/data.json',
        jsonFileCycleMinutes: 10, // N 分钟之后就重新写一个新的 jsonFile 文件，只有设置成0才会覆盖最开始的那个文件
        tplStartTag: '{%',
        tplEndTag: '%}'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '{,*/}*.{html,css,js}',
          dest: 'dist'
        }]
      }
    },

    connect: {
      options: {
        port: 9876,
        hostname: 'localhost',
        livereload: LIVERELOAD_PORT
      },

      dev: {
        options: {
          open: false,
          middleware: getConnectMiddleWares(['app'])
        }
      }
    }
  });



  grunt.registerTask('serve', ['connect', 'watch']);

};