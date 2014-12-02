var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var nodemon = require("gulp-nodemon");

gulp.task("javascript", function() {
	/* Copy our scripts */
	gulp.src([ 
		"public/scripts/*.js", 
		"public/scripts/**/*.js", 
	]).pipe(gulp.dest("dist/scripts"));

	/* Copy jQuery */
	gulp.src([ 
		"bower_components/jquery/dist/jquery.min.js", 
		"bower_components/jquery/dist/jquery.min.map" 
	]).pipe(gulp.dest("dist/scripts"));

	/* Copy AngularJS */
	gulp.src([ 
		"bower_components/angular/angular.min.js", 
		"bower_components/angular/angular.min.js.map" 
	]).pipe(gulp.dest("dist/scripts"));

	/* Copy Angular modules */
	gulp.src([ 
		"bower_components/angular-resource/angular-resource.js", 
		"bower_components/angular-cookies/angular-cookies.js", 
		"bower_components/angular-sanitize/angular-sanitize.js", 
		"bower_components/angular-animate/angular-animate.js", 
		"bower_components/angular-touch/angular-touch.js", 
		"bower_components/angular-route/angular-route.js"
	]).pipe(gulp.dest("dist/scripts"));

	/* Copy Bootstrap Javascript */
	gulp.src([
		"bower_components/bootstrap/dist/js/bootstrap.min.js"
	]).pipe(gulp.dest("dist/scripts"));

});

gulp.task("css", function() {
	/* Copy SASS files */
	gulp.src([ 
		"public/styles/*.scss"
	]).pipe(sass()).pipe(gulp.dest("dist/styles"));

	/* Copy Bootstrap CSS */
	gulp.src([
		"bower_components/bootstrap/dist/css/bootstrap.min.css", 
		"bower_components/bootstrap/dist/css/bootstrap.css.map"
	]).pipe(gulp.dest("dist/styles"));

	/* Copy Bootstrap fonts */
	gulp.src([
		"bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot", 
		"bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg", 
		"bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf", 
		"bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"
	]).pipe(gulp.dest("dist/fonts"));
});


gulp.task("html", function() {
	/* Copy all other files, with no filters needed. */
	gulp.src([ 
		"public/*.html", 
		"public/**/*.html", 
		"public/favicon.ico", 
		"public/robots.txt", 
		"public/**/*.png"
	]).pipe(gulp.dest("dist"));
});

gulp.task("run", [ "javascript", "css", "html" ], function() {
	var monitor = nodemon({ 
		script: "server.js", 
		ignore: [ "node_modules/", "bower_components/", "dist/" ] 
	});

	monitor.on("change", [ "javascript", "css", "html" ]);
})

gulp.task("default", [ "javascript", "css", "html" ]);


