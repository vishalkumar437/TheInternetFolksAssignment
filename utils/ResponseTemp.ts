import { signIndata } from "../interface/interface";

class ResponseTemp {
    errorCode: string;
    message: string;
    success: boolean;
    content: { meta: { access_token: string }; data: any; };
    constructor(success:boolean, message:string, errorCode:string, data:signIndata, meta:{ access_token: string }) {
      (this.errorCode = errorCode),
        (this.message = message),
        (this.success = success),
        (this.content = {
         data,meta
        });
    }
  }
  
  module.exports = ResponseTemp;