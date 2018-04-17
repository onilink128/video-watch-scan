var args = require("yargs").argv;
var del = require("del");
var exec = require("child_process").exec;
var gulp = require("gulp");
var jsonModify = require("gulp-json-modify");
var semver = require("semver");
var ts = require("gulp-typescript");

var packageData = require("./package.json");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("update-version", function () {

    var type = args.type ? args.type : "patch";
    var preReleaseTag = args.prereleasetag;

    return gulp.src(["./bower.json", "./package.json"])
        .pipe(jsonModify({
            key: "version",
            value: semver.inc(packageData.version, type, preReleaseTag)
        }))
        .pipe(gulp.dest("./"));
});

gulp.task("publish-npm", ["update-version", "compileTs"], function (cb) {
    // exec("npm publish --registry http://server.samidare.com.br:8081/repository/npm-local/", function (err, stdout, stderr) {
    exec("npm pack", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task("compileTs", ["update-version"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("copy-definitions", ["compileTs"], function () {
    return gulp.src("./src/**/*.d.ts")
        .pipe(gulp.dest("dist"));
});

gulp.task("clear-dist", ["update-version", "compileTs", "publish-npm", "copy-definitions"], function () {
    return del("dist/**", { force: true });
});

gulp.task("publish", [
    "update-version",
    "compileTs",
    "publish-npm",
    "copy-definitions",
    "clear-dist"
]);

gulp.task("default", [
    "publish"
]);