class AppError extends Error {
    errorCode: number;
    success: boolean;
    message: string;
    constructor(success:boolean, message:string, errorCode:number) {
      super(message);
      (this.errorCode = errorCode?errorCode:500),
        (this.message = message?message:"Unknown Error"),
        (this.success = success?success:false)
    }
  }
  module.exports = AppError;