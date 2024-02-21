
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id
    }
  
static getAll(){
    return users;
}
}

let users= [{
    id:1,
    "name":"admin",
    "email":"admin@gmail.com",
    "password":"password",
    "type":"seller",
},
{
    id:2,
    "name":"admin",
    "email":"customer@gmail.com",
    "password":"password",
    "type":"customer",
}
]