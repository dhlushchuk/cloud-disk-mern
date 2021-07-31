const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult }= require('express-validator')
const { FileServiceCreateDir } = require('../services/file.service')
const File = require('../models/File')

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const { email, password } = req.body
        const candidate = await User.findOne({email})
        if(candidate) return res.status(400).json({message: "Пользователь с таким E-Mail уже существует"})
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()
        await FileServiceCreateDir(req, new File({user: user._id, name: ''}))
        return res.status(200).json({message: "Пользователь успешно создан"})
    } catch (e) {
        res.status(400).json({message: "Что-то пошло не так..."})
        console.log(e)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message: "Пользователь не найден"})
        const isPassValid = await bcrypt.compare(password, user.password)
        if(!isPassValid) return res.status(400).json({message: "Неверный пароль"})
        const token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.json({
            token, 
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        res.status(400).json({message: "Что-то пошло не так..."})
        console.log(e)
    }
}

exports.authorization = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.json({
            token, 
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (error) {
        res.status(400).json({message: "Что-то пошло не так..."})
    }
}