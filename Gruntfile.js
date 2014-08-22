/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * http://lab.hakim.se\n' +
				' *\n' +
				' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		cssmin: {
			compress: {
				files: {}
			}
		},

		sass: {
			main: {
				files: {
					'device-loop/style.css': 'device-loop/style.scss',
					'flexing-pagination/style.css': 'flexing-pagination/style.scss',
					'cloudy-spiral/style.css': 'cloudy-spiral/style.scss',
					'checkwave/style.css': 'checkwave/style.scss',
					'monocle/style.css': 'monocle/style.scss'
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false
				}
			},
			files: [ 'Gruntfile.js', '**/*.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', '*/*.js', '*/*.scss' ],
				tasks: 'default'
			},
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Default task
	grunt.registerTask( 'default', [ 'sass' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

};
