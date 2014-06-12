#!/usr/bin/env node
"use strict"

var fs      = require('graceful-fs')
var path    = require('path')
var carrier = require('carrier')
var findit  = require('findit')
var async   = require('async')
var Handlebars = require('handlebars')

Handlebars.registerHelper('eq', function(variable, value, block) {
	return (variable == value) ? block.fn(this) : block.inverse(this)
})

Handlebars.registerHelper('eachSorted', function(context, options) {
	var ret = ""
	Object.keys(context).sort().forEach(function(key) {
		ret = ret + options.fn({key: key, value: context[key]})
	})
	return ret
})

var patterns = require('./patterns')

function listFiles(folder, cb) {
	var finder = findit(folder)
	var files = []
	finder.on('file', function (file, stat) {
		files.push(file)
	})
	finder.on('end', function() {
		cb(null, files)
	})
}

function search(folder, cb) {
	var results = {}
	var done = 0
	listFiles(folder, function(err, files) {
		files.forEach(function(file) {
			var pkg = path.dirname(file).split('/').pop()
			var s = fs.createReadStream(file, {flags:'r'})
			carrier.carry(s).on('line', function(line) {
				Object.keys(patterns).forEach(function(p) {
					if(patterns[p].match.test(line)) {
						if(!(pkg in results)) {
							results[pkg] = {}
						}
						if(!(p in results[pkg])) {
							results[pkg][p] = {
								lines: [],
								info: patterns[p]
							}
						}
						results[pkg][p].lines.push(line)
					}
				})
			})
			s.on('end', function() {
				done++
				if(done == files.length) {
					cb(null, results)
				}
			})
		})
	})
}


search(process.argv[2] || '.', function(err, results) {
	var template = fs.readFileSync(__dirname + '/out.html', {encoding: "utf-8"})
	console.log(Handlebars.compile(template)({results: results}))
	
})
