const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller')

/**
 * @swagger
 * /user/signup:
 *   post:
 *    tags:
 *      - user
 *    description: Create a User
 *    operationId: post_signup
 *    requestBody:
 *      description: Created user object
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *           e-mail:
 *             type: string
 *             enum:
 *              - X-MERN@gmail.com
 *           password:
 *             type: string
 *             enum:
 *               - erwqerfedve
 *      required: true
 *    responses:
 *      '200':
 *        description: User Created
 *        content: {}
 * 
 */
router.post('/signup',user_controller.user_signup_post);


/**
 * @swagger
 * /user/login:
 *   post:
 *    tags:
 *      - user
 *    description: Login
 *    operationId: post_login
 *    requestBody:
 *      description: Created user object
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *           e-mail:
 *             type: string
 *             enum:
 *              - X-MERN@gmail.com
 *           password:
 *             type: string
 *             enum:
 *               - erwqerfedve
 *      required: true
 *    responses:
 *      '200':
 *        description: User Logged in 
 *        content: {}
 * 
 */
router.post("/login", user_controller.user_login_post);
  
module.exports = router;