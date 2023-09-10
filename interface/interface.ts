export interface response {
  [x: string]: any;
}

export interface request {
  [x: string]: any;
}

export interface signUpdata {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface signIndata {
  email: string;
  password: string;
}
