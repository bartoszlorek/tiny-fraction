import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
    entry: 'src/tiny-fraction.js',
    output: [
        {
            file: './dist/tiny-fraction.umd.js',
            format: 'umd',
            name: 'tinyFraction'
        },
        {
            file: './dist/tiny-fraction.min.js',
            format: 'cjs'
        }
    ],
    plugins: [
        uglify({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                reduce_funcs: false
            },
            mangle: {
                toplevel: true
            }
        }),
        babel({
            exclude: ['node_modules/**']
        })
    ],
    external: []
}
