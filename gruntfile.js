module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'public/js/*.js',
				dest: 'dist/js/script.min.js'
			}
		}, 
		cssmin: {
			combine: {
				files: {
					'dist/css/style.min.css': 'public/css/*.css'
				}
			}
		}, 
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'public/index.html' 
				}
			},
		}, 
		copy: {
			dist: {
				files: [
					{ 
						expand: true, 
						flatten: true, 
						src: [ 
							'bower_components/bootstrap/dist/css/bootstrap.min.css', 
							'bower_components/bootstrap/dist/css/bootstrap-theme.min.css' 
						], 
						dest: 'dist/css/' 
					} 
				] 
			} 
		}, 
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: [ '--debug' ], 
					args: [ '--test', '-p', '1066' ], 
					ext: 'js,html',
					watch: [ 'dist/' ], 
					env: {
						NODE_PATH: './server'
					}
				}
			}
		}
	});

	// Load the task plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-nodemon');

	// Build task(s).
	grunt.registerTask('build', [ 'uglify', 'cssmin', 'htmlmin', "copy" ]);

	// Default task(s).
	grunt.registerTask('default', [ 'build' ]);

	// Run task(s)
	grunt.registerTask('run', [ 'build', 'nodemon' ]);
};

