'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': ['src/client/**/*.html']
        }
      }
    },

    nggettext_compile: {
      all: {
        files: {
          'src/client/app/translation/translation.run.js': ['po/*.po']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-gettext');

  grunt.registerTask('extract', ['nggettext_extract']);
  grunt.registerTask('compile', ['nggettext_compile']);
};
