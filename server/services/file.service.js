const fs = require('fs')

exports.FileServiceCreateDir = (req, file) => {
        const filePath = `${req.filePathFiles}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: "Файл был успешно создан"})
                } else {
                    return reject({message: "Файл уже существует"})
                }
            } catch (e) {
                return reject({message: "Ошибка файла"})
            }
        })
}

exports.FileServiceDeleteFile = (req, file) => {
    const path = `${req.filePathFiles}\\${file.user}\\${file.path}`
    if(file.type === 'dir') {
        fs.rmdirSync(path)
    } else {
        fs.unlinkSync(path)
    }
}