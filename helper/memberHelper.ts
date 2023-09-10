const memberModel = require("../model/member");
import {APPError} from "../utils/Error";
const ResponseTemp = require("../utils/ResponseTemp");

class MemberService{

async createMemberService(community: any,user: any,role: any){
    const memberExists = await memberModel.findOne({community,user,role})
    if(memberExists){
        return new ResponseTemp(false,"alreadyExist",409)
    }
    else{
        const resp = await memberModel.create({community,user,role})
        if(resp){
            return new ResponseTemp(true,"member created",200,resp)
        }
        else{
            throw new APPError(true,"new member not created",400)
        }
    }
}

async removeMemberService(id:string){
    const resp  = await memberModel.findOneAndDelete({id})
    if(resp){
        return new ResponseTemp(true,"successfull",200)
    } 
    else{
        throw new APPError(false,"cant delete",500)
    }

}
}

module.exports = MemberService