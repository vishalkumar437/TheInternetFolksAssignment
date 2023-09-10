export class APPError extends Error {
    errorCode: number;
    success: boolean;
    message: string;
    errorStatus: any;
    data: any;
    constructor(success:boolean, message:string, errorCode:number) {
      super(message);
      (this.errorCode = errorCode?errorCode:500),
        (this.message = message?message:"Unknown Error"),
        (this.success = success?success:false)
    }
  }