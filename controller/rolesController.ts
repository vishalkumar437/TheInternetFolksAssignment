
const RoleService = require("../helper/roleHelper");
import {APPError} from "../utils/Error";

class RolesController {
  roleServiceInstance = new RoleService();
  createRole = async (req: { body: { name: any; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }) => {
    const {name} = req.body;
        
    if (!name) throw new APPError(false, "name not found please provide name", 404);
    else {
      const resp = await this.roleServiceInstance.createNewRole(name);

      return res.status(resp?.errorCode).json(resp);
    }
  };

  getRole = async (req: { query: { page: number; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; })=>{
    const pageNumber = req.query?.page || 1;

    const data = await this.roleServiceInstance.getAllRole(pageNumber)
    
    return res.status(data?.errorCode).json(data)
  }
}

module.exports = RolesController;