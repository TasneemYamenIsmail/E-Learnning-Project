export type userType = 'student'| 'teacher';
export type tag = {tag:string};
export type token = {token:string};

export class User{
  name: string;
  email:string;
  password:string;
  phone: string;
  img?:string;
  tags?:tag[];
  role: userType;
  grade?:number;
  status?:boolean;
  token?:token[]

  public constructor(user: Partial<User>){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.img = user.img||'';
    this.tags = user.tags||[];
    this.role = user.role;
    this.grade = user.grade||0;
    this.status = user.status||false;
    this.token = user.token;
  }
}
