module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.registerTask('build', ['copy', 'typescript', 'uglify', 'clean']);
    grunt.registerTask('default', ['copy:html', 'compass', 'connect', 'watch']);

    grunt.initConfig({

        watch: {
            compass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['compass']
            },
            typescript: {
                files: ['src/ts/**/*.ts'],
                tasks: ['typescript', 'uglify']
            },
            image: {
                files: ['src/img/*.{png,jpg,gif}'],
                tasks: ['newer:image:dist']
            },
            copy: {
                files: ['src/html/*.html'],
                tasks: ['newer:copy:html']
            },
            options: {
               livereload: true
            }
        },
        clean: {
            build: {
                src: ['build/**/.DS_Store', 'src/**/.DS_Store', '**/.sass-cache']
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/js/switch-min.js': 'build/js/switch.js'
                }
            }
        },
        typescript: {
          base: {
            src: ['src/ts/**/*.ts'],
            dest: 'build/js/switch.js',
            options:{
                sourceMap: false,
                comments : true
            }
          }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/html/',
                    src: ['**/*.html'],
                    dest: 'build/'
                }]
            }
        },
        connect: {
            livereload: {
                 options: {
                      port: 3001
                 }
            }
        },
        compass: {
            dist: {
                options: {
                    config: "config.rb"
                }
            }
        }

    });



};
