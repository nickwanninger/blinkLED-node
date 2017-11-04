#!/usr/local/bin/node
const { spawn } = require('child_process')
const fs = require('fs')
const leftPad = require('left-pad')

const message = 'hello world'

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
console.log(bits[bits.length - 1])
bits.forEach((b, i) => {
	setTimeout(() => flash(b), i * delay)
	if (i == bits.length) {
		setTimeout(() => {
			flash(0)
		}, i * delay + delay)
	}
})
