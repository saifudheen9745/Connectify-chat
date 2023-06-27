import express from 'express'
import { doLogin, doRegister } from '../controllers/authControllers'

const router = express.Router()

//User login
router.post('/login',doLogin)
//User register
router.post('/register',doRegister)


export default router