class ResponseTemp {
    errorCode: string;
    message: string;
    success: boolean;
    content: { meta: any; data: any; };
    constructor(success:boolean, message:string, errorCode:string, data:any, meta:any) {
      (this.errorCode = errorCode),
        (this.message = message),
        (this.success = success),
        (this.content = {
         meta,data
        });
    }
  }
  
  module.exports = ResponseTemp;