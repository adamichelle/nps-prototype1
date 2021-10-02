const { sign, verify } = require('../utils/general/jwtServiceModule');
const { hashPasswordFunction, comparePassword } = require('../utils/general/utilFunctions');
const UserRepo = require('../repositories/UserRepo');

class UserService {
    static async loginUser(loginInfo) {
        try {
            const userRepoRes = await UserRepo.getUserByEmail(loginInfo.email);
            if(!userRepoRes.success) return { success: false, data: loginInfo, message: userRepoRes.message, isCatchError: false }

            const validPassword = await comparePassword(loginInfo.password, userRepoRes.data.password);
    
            if(!validPassword) return { success: false, data: loginInfo, message: "Invalid email or password", isCatchError: false  }
            
            const payLoad = {
                id: userRepoRes.data.id,
                firstName: userRepoRes.data.firstName,
                lastName: userRepoRes.data.lastName,
                email: userRepoRes.data.email
            };
            const userToken = sign(payLoad);
            
            return { success: true, data: { userId: userRepoRes.data.id, userToken}, message: "User login successful" }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async signUp(signUpInfo) {
        try {
            const checkEmailExists = await UserRepo.getUserByEmail(signUpInfo.email);

            if(checkEmailExists.success) 
            return { success: false, data: signUpInfo, message: 'A user with that email already exists', isCatchError: false }

            const hashPassword = await hashPasswordFunction(signUpInfo.password);

            const userInfo = {
                firstName: signUpInfo.firstName,
                lastName: signUpInfo.lastName,
                email: signUpInfo.email,
                userType: signUpInfo.userType,
                password: hashPassword
            }

            const userRepoRes = await UserRepo.createUser(userInfo);
            return { success: true, data: userRepoRes.data, message: 'User signed up successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = UserService;
