'use strict';

var fs = require('fs');
var format = require('util').format;
var path = require('path');

var async = require('async');
var shell = require('shelljs');

var USE_BOWER = false;
var BOWER_LOCALES = shell.ls('bower_components/FindMyDevice-l10n/locale');
var CMD = 'casperjs scraper.js';
var SUPPORTED_LOCALES = [
  'bn_BD',
  'cs',
  'db_LB',
  'de',
  'eu',
  'en',
  'fr',
  'ga',
  'hu',
  'it',
  'ja',
  'nl',
  'pa',
  'pt',
  'ro',
  'sr',
  'sv_SE',
  'zh_CN',
  'zh_TW'
];

var langs = (USE_BOWER) ? BOWER_LOCALES : SUPPORTED_LOCALES;
var viewports = [
  {width: 400, height: 300}, // common
  // {width: 640, height: 480}, // common
  {width: 684, height: 600}, // breakpoint (mobile)
  {width: 685, height: 600}, // breakpoint+1
  // // {width: 800, height: 600}, // common
  {width: 960, height: 800}, // breakpoint (tablet)
  {width: 961, height: 800}, // breakpoint+1
  // {width: 1024, height: 768} // common
];

shell.rm('-rf', 'output/*');

async.eachLimit(langs, 1, function (lang, callback) {
  var langMd = '# ' + lang + '\n\n| IMAGE | SIZE |\n|-------|:----:|\n';
  viewports.forEach(function (vport) {
    var fname = format('fmd_%s_%dx%d.jpg', lang, vport.width, vport.height);
    var cmd = format('%s --lang=%s --width=%d --height=%d', CMD, lang, vport.width, vport.height);
    console.log('$ %s', cmd);
    shell.exec(cmd);
    langMd += '| ![](images/' + fname + ') | **' + vport.width + '** px |\n';
  });
  fs.writeFile(path.join('output', lang + '.md'), langMd, callback);
}, function (err) {
  if (err) {
    throw err;
  }
});
