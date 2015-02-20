module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			def: {
				src: 'src/gm.waitsFor.js',
				dest: 'dist/gm.waitsFor.min.js'
			}
		},
		
		copy: {
			def: {
				files: [{
					'dist/gm.waitsFor.js':'src/gm.waitsFor.js'
				}]
			},
		},
		
		watch: {
			files: ['src/**'],
			tasks: ['uglify']
		}
	});
	
	//grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify']);
};