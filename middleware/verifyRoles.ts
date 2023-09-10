const memberModel = require("../model/member");

const verifyRoles = (...roles: any[]) => {
  return async (req: { user: { _id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; error: string; }): any; new(): any; }; }; }, next: () => void) => {
    const user = req.user._id;
    const userRoleInCommunity = await memberModel
      .findOne({ user })
      .populate("role", "name id");

    const roleArray = [...roles];
    const data = roleArray.map((t) => t === userRoleInCommunity?.role?.name);
    if (data.includes(true)) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        error: "unauthorized access",
      });
    }
  };
};
module.exports = verifyRoles;