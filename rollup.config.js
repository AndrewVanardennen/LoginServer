 import commonjs from '@rollup/plugin-commonjs'
 import resolve from '@rollup/plugin-node-resolve'

export default [{
	input: 'src/server.js',
	output: {
		dir: './dist',
		format: 'cjs'
	}
}, {
	input: 'src/client-server.js',
	output: {
		dir: './dist',
		format: 'cjs'
	}
}, {
	input: 'src/client.js',
	output: {
		dir: './dist',
		format: 'es'
	},
	plugins: [
		resolve(),
		commonjs()
	]
}]