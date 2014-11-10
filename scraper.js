'use strict';

var casper = require('casper').create();

var options = casper.cli.options;

var lang = options.lang || 'en';
var vport = {
  w: options.width || 800,
  h: options.height || 600
};
var fname = options.fname || 'fmd_' + lang + '_' + vport.w + 'x' + vport.h + '.jpg';

var page = casper.start().then(function () {
  this.viewport(vport.w, vport.h);
  this.open('https://find.dev.mozaws.net', {
    headers: {
      'Accept-Language': lang
    }
  });
}).then(function () {
  this.echo(this.getTitle());
  this.capture('output/images/' + fname, undefined, {
      format: 'jpg',
      quality: 75
  });
}).run();
