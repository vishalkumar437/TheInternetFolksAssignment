import { request, response } from "../interface/interface";

const MemberService = require("../helper/memberHelper");
const RoleService = require("../helper/roleHelper");
import {APPError} from "../utils/Error";

class MemberController {

    memberServiceInstance = new MemberService;
   roleServiceInstance = new RoleService
   createMember = async(req:request,res:response)=>{
     const {community , user, role} = req.body
      
     if(!community || !user || !role){
        throw new APPError(false,"please give community, user and role",404)
     }
     else{
      // to check given role should not be admin
       if(await this.roleServiceInstance.checkIsAdminByid(role)){
        throw new APPError(false,"admin role cant be assign to this user",500)
       }   
    
        
        
      const newMember = await this.memberServiceInstance.createMemberService(community,user,role)
     
       return res.status(newMember.errorCode).json(newMember)

     }


   }

   removeMember = async(req:request,res:response)=>{

    const {id} = req.query;
      

    if(!id){
       throw new APPError(false,"please provide id",404)
    }
    const resp = await this.memberServiceInstance.removeMemberService(id)

    return res.status(resp.errorCode).json(resp)
   }
    


  
}

module.exports = MemberController;