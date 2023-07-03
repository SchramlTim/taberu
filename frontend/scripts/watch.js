// Source: https://gist.github.com/int128/e0cdec598c5b3db728ff35758abdbafd

process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const paths = require('react-scripts/config/paths')
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const config = require('react-scripts/config/webpack.config.js')
const path = require('path')

const conf = config('development')

// We needed to output to a specific folder for cross-framework interop.
// Make sure to change the output path or to remove this line if the behavior
// of the original gist is sufficient for your needs!
conf.output.path = path.join(process.cwd(), './build')

webpack(conf).watch({}, (err, stats) => {
    if (err) {
        console.error(err)
    } else {
        copyPublicFolder()
    }
    console.error(
        stats.toString({
            chunks: false,
            colors: true,
        })
    )
})

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: (file) => file !== paths.appHtml,
    })
}
