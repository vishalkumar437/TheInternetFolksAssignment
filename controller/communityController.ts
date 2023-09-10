
const CommunityHelper = require("../helper/communityHelper");
const MemberService = require("../helper/memberHelper");
const RoleService = require("../helper/roleHelper");
import {APPError} from "../utils/Error";

class CommunityController {
  CommunityHelperInstance = new CommunityHelper();
  memberServiceInsatance = new MemberService();
  roleServiceInstance = new RoleService();

  createCommunity = async (req: { body: { name: string;id:string; }; user: { id: string; }; }, res: { send: (arg0: any) => any; }) => {
    const { name } = req.body;
    if (!name) {
      throw new APPError(false, "community name not found", 404);
    } else {
      const newCommunity =
        await this.CommunityHelperInstance.createCommunityService(
          name,
          req.user.id,
        );

      // adding member
      if (newCommunity) {
        //  giving admin role to the creater of community
        const roleDetails = await this.roleServiceInstance.getTypeOfRole(
          "Community Admin"
        );

        await this.memberServiceInsatance.createMemberService(
          newCommunity?.content?.data?.id,
          req.user.id,
          roleDetails?.content?.data?.id
        );

        return res.send(newCommunity);
      }
    }
  };

  getCommunity = async (req: { query: { page: number; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }) => {
    // we assumer if page number is not specified it will be 1
    const pageNumber = req.query?.page || 1;

    const data = await this.CommunityHelperInstance.getCommunityService(pageNumber);

    return res.status(data?.errorCode).json(data);
  };

  getAllMember = async (req: { params: { id: any; }; query: { page: number; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }) => {
  
    const {id} = req.params;
    if(!id || id.includes("id")){
        
      throw new APPError(false,"please provide id",404)
   }
   else{
    const pageNumber = req.query?.page || 1;
   
    const data = await this.CommunityHelperInstance.getAllMemberService(id,pageNumber)

    return res.status(data?.errorCode).json(data)
   }
  };

  getUserAllCommunity = async(req: { query: { page: number; }; user: { id: any; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; })=>{

    const pageNumber = req.query?.page || 1;

    const data = await this.CommunityHelperInstance.getUserAllCommunityService(req.user.id,pageNumber)
    return res.status(data?.errorCode).json(data)
  }

  getMyJoinedCommunity = async(req: { query: { page: number; }; user: { id: any; }; },res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; })=>{
    const pageNumber = req.query?.page || 1;

    const data = await this.CommunityHelperInstance.getUserAllJoinedCommunity(req.user.id,pageNumber)
    return res.status(data?.errorCode).json(data)
  }
}

module.exports = CommunityController;