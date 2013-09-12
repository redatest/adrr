module.exports = function (grunt)
{
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	var userConfig = require( './build.config.js' );
	
	var taskConfig =
	{
		pkg: grunt.file.readJSON("package.json"),
		
		clean:
		{
			all:
			[
				'<%= compile_dir %>/assets',
				'<%= compile_dir %>/index.html'
			],
			
			templates:
			[
				'<%= compile_dir %>/templates-app.js',
				'<%= compile_dir %>/templates-common.js'
			]
		},
		
		copy:
		{
			all:
			{
				files:
				[
					{
						src: [ '**' ],
						dest: '<%= compile_dir %>/assets',
						cwd: 'src/assets',
						expand: true
					},
					{
						src: 'src/index.html',
						dest: '<%= compile_dir %>/index.html'
					}
				]
			}
		},
		
		html2js:
		{
			app:
			{
				options: { base: 'src/app' },
				src: ['<%= app_files.atpl %>'],
				dest: '<%= compile_dir %>/templates-app.js'
			},
			
			common:
			{
				options: { base: 'src/common' },
				src: [ '<%= app_files.ctpl %>' ],
				dest: '<%= compile_dir %>/templates-common.js'
			}
		},
		

		recess:
		{
			options:
			{
				compile: true,
				compress: true
			},
			
			vendor:
			{
				files: { '<%= compile_dir %>/assets/css/vendor.css': ['<%= vendor_files.css %>'] }
			},
			
			app:
			{
				files: { '<%= compile_dir %>/assets/css/<%= pkg.name %>.css': ['<%= app_files.less %>'] }
			}
		},
		concat:
		{
			vendor:
			{
				src: ['<%= vendor_files.js %>'],

				dest: '<%= compile_dir %>/assets/js/vendor.js'
			},
			app:
			{
				src:
					[
						'module.prefix',
						'<%= app_files.js %>',
						'<%= html2js.app.dest %>',
						'<%= html2js.common.dest %>',
						'module.suffix'
					],
				dest: '<%= compile_dir %>/assets/js/<%= pkg.name %>.js'
			}
		},

		ngmin:
		{
			all:
			{
				files:
				[{
					src: ['<%= compile_dir %>/assets/js/<%= pkg.name %>.js'],
					dest: '<%= compile_dir %>/assets/js/<%= pkg.name %>.js'
				}]
			}
		},

		uglify:
		{
			app:
			{
				files: { '<%= concat.app.dest %>': '<%= concat.app.dest %>' }
			}
		},

		watch:
		{
			options: { livereload: true },

			js:
			{
				files: ['<%= app_files.less %>','<%= app_files.js %>', '<%= app_files.atpl %>', '<%= app_files.ctpl %>'],
				tasks: ['html2js', 'concat:app', 'ngmin', 'uglify','recess:app']
			}
		}
	};

	grunt.initConfig (grunt.util._.extend (taskConfig, userConfig));

	grunt.registerTask ('compile', ['clean:all', 'copy', 'html2js', 'concat', 'recess', 'clean:templates', 'ngmin', 'uglify']);
	grunt.registerTask ('default', ['compile']);
};