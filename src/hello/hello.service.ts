import {Injectable} from '@nestjs/common';

@Injectable()
export class HelloService {

    getHello() {
        return 'Hello World!';
    }

    getHelloWithName(name: string) {
        return 'Hello ' + name;
    }
}
