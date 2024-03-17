import  express from "express"
import { deleteUser, getAllUsers, login, register } from "../controllers/auth.js"
import { authenticateToken } from "../middleware.js"


const router=express.Router()

router.post('/register',register)
router.get("/users",getAllUsers)
router.post('/delete',authenticateToken,deleteUser)
router.post('/login',login)


export default router