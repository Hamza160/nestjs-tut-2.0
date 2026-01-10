import {Injectable} from '@nestjs/common';
import {HelloService} from "../hello/hello.service";

@Injectable()
export class UserService {
    constructor(private helloService: HelloService) {}

    getAllUsers(){
        return [
            {
                id:1, name:'Hamza'
            },
            {
                id:1, name:'Jone'
            },
            {
                id:1, name:'Jane'
            }
        ]
    }

    getUserById(id:number){
        return this.getAllUsers().find(user => user.id === id);
    }

    getWelcomeMessage(userId: number){
        const user = this.getUserById(userId);

        if(!user){
            return "User not found";
        }

        return this.helloService.getHelloWithName(user.name)
    }
}
