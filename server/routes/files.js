const Router = require('express')
const { createDir, getFiles, uploadFile, downloadFile, deleteFile, searchFiles, uploadAvatar, deleteAvatar } = require('../controllers/FileController')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('', authMiddleware, createDir)
router.post('/avatar', authMiddleware, uploadAvatar)
router.post('/upload', authMiddleware, uploadFile)
router.get('', authMiddleware, getFiles)
router.get('/download', authMiddleware, downloadFile)
router.get('/search', authMiddleware, searchFiles)
router.delete('', authMiddleware, deleteFile)
router.delete('/avatar', authMiddleware, deleteAvatar)

module.exports = router