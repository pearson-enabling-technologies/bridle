'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    compass: {
        options: {
            cssDir: '.tmp/styles',
            sassDir: 'src/styles',
            javascriptsDir: '.tmp/src',
            relativeAssets: true,
            force: true
        },
        dist: {},
        server: {
            options: {
                debugInfo: true
            }
        }
    },    
    mocha: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    // watch: {
    //     compass: {
    //         files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
    //         tasks: ['compass']
    //     },
    //     livereload: {
    //         files: [
    //             '<%= yeoman.app %>/*.html',
    //             '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
    //             '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
    //             '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
    //         ],
    //         tasks: ['livereload']
    //     }
    // },    
    watch: {
        compass: {
            files: ['src/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass']
        },
        livereload: {
            files: [
                '.tmp, src/**/*',
                '.tmp, examples/**/*'
            ],
            tasks: ['livereload']
        }      
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'examples'),
              mountFolder(connect, '.tmp'),              
              mountFolder(connect, 'src')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'src'),
              mountFolder(connect, 'test'),
              mountFolder(connect, 'node_modules')
            ];
          }
        } 
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
        dist: ['.tmp', 'dist/*'],
        server: '.tmp'
    }

  });


  grunt.registerTask('test', ['jshint', 'mocha']);

  grunt.registerTask('default', ['concat', 'uglify']);

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }
 
      if (target === 'test') {
        return grunt.task.run([
          'clean:server',
          'compass',          
          'livereload-start',
          'connect:test',
          'open',
          'watch'
          ])
      }

      grunt.task.run([
          'clean:server',        
          'compass:server',        
          'livereload-start',
          'connect:livereload',
          'open',
          'watch'
      ]);
  });



};