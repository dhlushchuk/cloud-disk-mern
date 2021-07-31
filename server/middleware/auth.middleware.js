const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    if(req.method === 'OPTIONS') return next()
    try {
        const token = req.headers.authorization.split(' ')[1]        
        if(!token) return res.status(401).json({ message: 'Нет авторизации' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({message: "Что-то пошло не так..."})
    }
}