
import bcryptjs from "bcryptjs"
import { IUser, Role } from "../app/modules/user/user.interface"
import { envVars } from "../config/envConfig"
import { User } from "../app/modules/user/user.model"

export const seedSuperAdmin = async ()=>{
    try {

        const isSuperAdminExist = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL})
        if (isSuperAdminExist) {
            console.log("Super Admin Already Exist")
            return
            
        }
        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND))
      

        const payload:IUser = {
            name: "Labid Rahat",
            role: Role.ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,

         
        }

        const superAdmin = await User.create(payload)
        console.log(superAdmin,"super admin created")
        
    } catch (error) {
        console.log(error)
       
    }
}