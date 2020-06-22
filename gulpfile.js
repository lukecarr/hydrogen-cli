const { series, src, dest } = require("gulp");
const del = require("del");
const babel = require("gulp-babel");
const terser = require("gulp-terser-js");
const exec = require("child_process").exec;

const clean = () => del([
  "dist/",
  "bin/"
]);

const build = () => src("src/**/*.ts")
  .pipe(babel())
  .pipe(terser())
  .pipe(dest("dist/"));

const binaries = () => new Promise((resolve, reject) => {
  exec("./node_modules/.bin/pkg package.json --targets \"node14-linux-x64,node14-alpine-x64,node14-macos-x64,node14-win-x64\" --out-path bin", (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

exports.build = series(clean, build, binaries);
