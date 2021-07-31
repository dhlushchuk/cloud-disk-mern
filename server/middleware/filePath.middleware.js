exports.filePathFiles = path => {
    return (req, res, next) => {
        req.filePathFiles = path
        next()
    }
}

exports.filePathStatic = path => {
    return (req, res, next) => {
        req.filePathStatic = path
        next()
    }
}