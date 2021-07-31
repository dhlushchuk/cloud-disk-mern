const File = require("../models/File")
const User = require("../models/User")
const { FileServiceCreateDir, FileServiceDeleteFile } = require("../services/file.service")
const fs = require('fs')
const uuid = require('uuid')

exports.createDir = async (req, res) => {
    try {
        const { name, type, parent } = req.body
        const file = new File({name, type, parent, user: req.user.id})
        const user = await User.findOne({_id: req.user.id})
        const parentFile = await File.findOne({_id: parent})
        if(!parentFile) {
            file.path = name
            await FileServiceCreateDir(req, file)
        } else {
            file.path = `${parentFile.path}\\${file.name}`
            await FileServiceCreateDir(req, file)
            parentFile.childs.push(file._id)
            await parentFile.save()
        }
        await file.save()
        user.files.push(file)
        await user.save()
        return res.json(file)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Что-то пошло не так..."})
    }
}

exports.getFiles = async (req, res) => {
    try {
        const {sort} = req.query
        let files = ''
        switch (sort) {
            case 'name':
                files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                break
            case 'type':
                files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                break
            case 'date':
                files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                break
            default:
                files = await File.find({user: req.user.id, parent: req.query.parent})
                break
        }
        return res.json(files)
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.uploadFile = async (req, res) => {
    try {
        const file = req.files.file
        const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
        const user = await User.findOne({_id: req.user.id})
        if(user.usedSpace + file.size > user.diskSpace) return res.json({message: "Недостаточно места на диске"})
        user.usedSpace = user.usedSpace + file.size
        let path
        if(parent) {
            path = `${req.filePathFiles}\\${user._id}\\${parent.path}\\${file.name}`
        } else {
            path = `${req.filePathFiles}\\${user._id}\\${file.name}`
        }
        if(fs.existsSync(path)) return res.json({message: "Файл с таким именем уже существует"})
        file.mv(path)
        const type = file.name.split('.').pop()
        let filePath = file.name
        if(parent) filePath = parent.path + '\\' + file.name
        const dbFile = new File({
            name: file.name, 
            type, size: file.size, 
            path: filePath, 
            parent: parent? parent._id : null,
            user: user._id
        })
        user.files.push(dbFile)
        await dbFile.save()
        await user.save()
        return res.json(dbFile)
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({_id: req.query.id, user: req.user.id})
        const path = req.filePathFiles + '\\' + req.user.id + '\\' + file.path 
        if(fs.existsSync(path)) return res.download(path, file.name)
        return res.status(404).json({message: "Файл не найден"})
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findOne({_id: req.query.id, user: req.user.id})
        const user = await User.findOne({_id: req.user.id})
        if(!file) return res.status(404).json({message: "Файл не найден"})
        FileServiceDeleteFile(req, file)
        await file.remove()
        //прочитать MongoDB Documentation и исправить некст строку
        user.files = user.files.filter(file => file._id != req.query.id)
        await user.save()
        return res.status(200).json({message: "Файл успешно удален"})
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.searchFiles = async (req, res) => {
    try {
        const searchName = req.query.search
        let files = await File.find({user: req.user.id})
        files = files.filter(file => file.name.includes(searchName))
        return res.json(files)
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.uploadAvatar = async (req, res) => {
    try {
        const file = req.files.file
        const user = await User.findById(req.user.id)
        const avatarName = uuid.v4() + ".jpg"
        file.mv(req.filePathStatic + '\\' + avatarName)
        user.avatar = avatarName
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}

exports.deleteAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        fs.unlinkSync(req.filePathStatic + '\\' + user.avatar)
        user.avatar = null
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: "Что-то полшо не так..."})
    }
}