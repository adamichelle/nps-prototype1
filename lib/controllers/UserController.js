const UserService = require('../services/UserService');

class UserController {
    static async login(req, res) {
        try {
            if(req.body.password === null || req.body.password === undefined || req.body.email === null || req.body.email === undefined) 
                return res.status(400).json({ status: 'error', message: "Some login detail is missing", data: null });

            const userServiceRes = await UserService.loginUser(req.body);
            if(!userServiceRes.success && userServiceRes.isCatchError) 
            return res.status(500).json({ status: 'error', message: "Internal server error", data: userServiceRes.message });

            if(!userServiceRes.success)
            return res.status(401).send({status: 'error', message: 'Unable to login', data: userServiceRes.message });

            return res.status(200).header('auth-token', userServiceRes.data.userToken).send({ status: 'success', message: 'Login successful', data: userServiceRes.data });
            
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: userServiceRes.message })
        }
    }

    static async signup(req, res) {
        try {
            const userServiceRes = await UserService.signUp(req.body);
            if(!userServiceRes.success && userServiceRes.isCatchError) 
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });

            if(!userServiceRes.success) 
            return res.status(400).json({ status: 'error', message: "Error creating user", data: error.message })

            return res.status(201).json({ status: 'success', message: 'User created successfully', data: userServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = UserController;