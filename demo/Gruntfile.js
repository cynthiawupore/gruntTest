module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 自动将 ./scss/style.scss 生成 ./style.css
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './style.css': './scss/style.scss'
        }
      }
    },
    // 自动将 ./src/plugin.js 和 ./src/plugin2.js 合并成 ./global.js
    concat: {
      dist: {
        src: ['./src/plugin.js', './src/plugin2.js'],
        dest: './global.js',
      },
    },
    uglify: {
      compressjs: {
        files: {
          './global.min.js': ['./global.js']
        }
      }
    },
    jshint: {
      all: ['./global.js']
    },
    watch: {
      scripts: {
        files: ['./src/plugin.js','./src/plugin2.js'],
        tasks: ['concat','jshint','uglify']
      },
      sass: {
        files: ['./scss/style.scss'],
        tasks: ['sass']
      },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              'index.html',
              'style.css',
              'global.min.js'
          ]
      }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });
  // sass编译
  grunt.loadNpmTasks('grunt-contrib-sass');
  // 合并文件
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 语法检查
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // 压缩文件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 监听文件变动
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 建立本地服务器
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('default');

};
