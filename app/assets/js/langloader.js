 const path = require('path')
const fs   = require('fs')

let lang = {}

exports.setupLanguage = function() {
    const langPath = path.join(__dirname, 'lang', 'es_ES.json')
    if(fs.existsSync(langPath)) {
        lang = JSON.parse(fs.readFileSync(langPath, 'utf8'))
    }
}

exports.queryJS = function(key) {
    return lang[key] || key
}

exports.queryEJS = function(key, placeHolders) {
    let val = lang[key] || key
    if(placeHolders != null) {
        Object.entries(placeHolders).forEach(([k, v]) => {
            val = val.replace(`{${k}}`, v)
        })
    }
    return val
}
