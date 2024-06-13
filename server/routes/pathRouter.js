import { Router } from 'express';
import controller from '../controllers/controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { requireAuth, checkUser } = authMiddleware

const router = Router() // basci tay new nai

// router.get('/registration', controller.registration_get)
router.post('/signup/saveusers', controller.saveuser_post)
router.post('/users/register', controller.registration_post)
// router.get('/login', controller.login_get)
router.post('/users/login', controller.login_post)
// router.get('/logout', controller.logout_get)
router.post('/signup/sendotp', controller.otp_post)
router.get('/logout', controller.logout_get)
router.get('/profile/showdata', requireAuth, controller.profile_get)
router.get('/api/inventory', requireAuth, controller.inventory_get)
router.post('/api/inventory/create', controller.inventory_post)
router.put('/api/inventory/update/:id', controller.inventory_update)

//this one is for delete
router.delete('/api/inventory/delete/:id', controller.inventory_delete)

export default router
