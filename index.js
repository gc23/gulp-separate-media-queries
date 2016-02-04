'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var parse = require('css-parse');
var stringify = require('css-stringify');


function extractMedia(css, opts) {
  let mediaRules = [];

  let mediaRulesTree = {
    type: 'stylesheet',
    stylesheet: {
      rules: []
    }
  };

  let isBuffer = Buffer.isBuffer(css);

  if (isBuffer) {
    css = css.toString('utf-8');
  }

  let tree = parse(css.toString('utf-8'));
  tree.stylesheet.rules.forEach(rule => {
    if (opts.removeQueries) {
      if(rule.type !== 'media') {
        mediaRules.push(rule);
      }
    }
     else if (rule.type === 'media') {
        mediaRules.push(rule);
      }
    });

  mediaRulesTree.stylesheet.rules = mediaRules;

  let result = stringify(mediaRulesTree);
  return isBuffer ? new Buffer(result) : result;
}

module.exports = function(opts) {
  opts = opts ? opts : {};
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    try {
      file.contents = extractMedia(file.contents, opts);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-extract-media-queries', err));
    }

    this.push(file);
    cb();
  });
};
