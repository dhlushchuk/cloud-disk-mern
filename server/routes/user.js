const Router = require('express')
const { register, login, authorization } = require('../controllers/UserController')
const { check } = require('express-validator') 
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()

router.post('/registration',
    [
        check('email', 'Некорректный E-Mail').isEmail(),
        check('password', 'Минимальная длина пароля - 4 символа').isLength({min: 4})
    ], 
    register
)

router.post('/login', login)

router.get('/auth', authMiddleware, authorization)

module.exports = router