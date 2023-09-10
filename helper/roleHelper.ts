const roleModel = require("../model/role");
import { Snowflake } from "@theinternetfolks/snowflake";
import { APPError } from "../utils/Error";
const responseTemp = require("../utils/ResponseTemp");
const Pagination = require("./pagination");

class RoleHelper {
  PaginationObject = new Pagination();
  async createNewRole(name: string) {
    const currentTimestamp = Date.now();
    const id = Snowflake.generate({ timestamp: currentTimestamp });
    const alReadyExistOrNot = await roleModel.findOne({ id });
    if (alReadyExistOrNot) {
      throw new APPError(false, "role already exist", 402);
    } else {
      const newRole = await roleModel.create({ id,name });
      await newRole.save();
      return new responseTemp(true, "new Role created", 200, newRole);
    }
  }
  async getAllRole(pageNumber: number) {
    const defaultPageSize = 3;

    const skip = (pageNumber - 1) * defaultPageSize;

    const data = await roleModel.find().limit(defaultPageSize).skip(skip);

    if (data.length) {
      const meta = await this.PaginationObject.pagination(
        roleModel.find(),
        defaultPageSize,
        pageNumber
      );

      return new responseTemp(true, "successful", 200, data, meta);
    } else {
      throw new APPError(false, "unsuccessful", 404);
    }
  }
  async getTypeOfRole(name: string) {
    const newRole = await roleModel.findOne({ name });
    if (newRole) {
      return new responseTemp(true, "successful", 200, newRole);
    } else {
      throw new APPError(false, "Role Not found", 404);
    }
  }
  async checkIsAdminByid(id: string) {
    const data = await roleModel.findOne({ id });

    if (data) {
      if (data?.name === "Community Admin") return true;
      else return false;
    }
    throw new APPError(false, "no role found", 404);
  }
}
module.exports = RoleHelper;
