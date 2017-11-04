#!/usr/local/bin/node
const { spawn } = require('child_process')
const fs = require('fs')
const leftPad = require('left-pad')

const program = require('commander')
program.parse(process.argv)

const message = program.args[0]

if (message != null) {
	console.log('flashing ' + message + ' to your capslock LED')
	const chars = message.split('')
	const delay = 50

	let bits = []
	chars.forEach(c => {
		const n = c.charCodeAt(0)
		const binaryString = n.toString('2')
		const binaryList = leftPad(binaryString, 8, '0').split('')
		bits = [ ...bits, ...binaryList ]
	})

	const flash = b => {
		const s = b == 0 ? '-' : '+'
		spawn('./setleds', [ `${s}caps` ])
	}

	bits.forEach((b, i) => {
		setTimeout(() => flash(b), i * delay)
		if (i == bits.length) {
			setTimeout(() => {
				flash(0)
				console.log('done flashing')
			}, i * delay + delay)
		}
	})
} else {
	console.log('please enter a message')
}
