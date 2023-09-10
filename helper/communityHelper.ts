const communityModel = require("../model/community");
const memberModel = require("../model/member");
import {APPError} from "../utils/Error";
import { Snowflake } from "@theinternetfolks/snowflake";
const ResponseTemp = require("../utils/ResponseTemp");
const GlobalService = require("./pagination");

class CommunityService {
  // find user by email
  globalServiceInstance = new GlobalService 
 
  async createCommunityService(name:string, owner:string) {
    const currentTimestamp = Date.now();
      const id = Snowflake.generate({ timestamp: currentTimestamp })
    const communityExists = await communityModel.findOne({ name, owner });
    if (communityExists) {
      throw new APPError(
        false,
        "community with this name already exists, please give some another name",
        402
      );
    } else {
      const newCommunity = await communityModel.create({id,name, owner});
    
      await newCommunity.save();
      return new ResponseTemp(true, "new Community created", 200, newCommunity);
    }
  }

  async getCommunityService(pageNumber:number){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize;

    const communitydata = 
    await communityModel
    .find()
    .populate('owner', 'name id')
    .limit(defaultPageSize)
    .skip(skip);
  
  
   if(communitydata.length){
      const meta = await this.globalServiceInstance.pagination(communityModel
        .find(),defaultPageSize,pageNumber)
   
     return new ResponseTemp(true,"successfull",200,communitydata,meta)

   }
   else{
    throw new APPError(false,"no community found", 404)
   }

  }

  async getAllMemberService(community:any,pageNumber:number){
    const defaultPageSize = 3; 
    const skip = (pageNumber - 1) * defaultPageSize;

    const resp = await memberModel.find({community}) 
    .populate('community', 'name id')
    .populate('user', 'name id')
    .populate('role', 'name id')
    .limit(defaultPageSize)
    .skip(skip);


    if(resp.length){
      const meta = await this.globalServiceInstance.pagination(memberModel.find({community}) ,defaultPageSize,pageNumber)

      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new APPError(false,"no data found", 404)
    }
  }

  async getUserAllCommunityService(owner:string,pageNumber:number){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize; 
    
    const resp = await communityModel.find({owner})
    .limit(defaultPageSize)
    .skip(skip);

    if(resp.length){
      const meta = await this.globalServiceInstance.pagination(communityModel.find({owner}),defaultPageSize,pageNumber)
      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new APPError(false,"no data found", 404)
    }
  }

  async getUserAllJoinedCommunity(user: any,pageNumber: number){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize;

    const resp = await memberModel.find({user})
    .populate('community', 'name id')
    .populate('user', 'name id')
    .populate('role', 'name id')
    .limit(defaultPageSize)
    .skip(skip);

   

    if(resp.length){

      const meta = await this.globalServiceInstance.pagination(memberModel.find({user}),defaultPageSize,pageNumber)

      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new APPError(false,"no data found", 404)
    }
  }
}

module.exports = CommunityService;