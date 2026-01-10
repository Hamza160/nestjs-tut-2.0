import {Controller, Get, Param, Query} from '@nestjs/common';
import {HelloService} from "./hello.service";

@Controller('hello')
export class HelloController {
    constructor(private helloService: HelloService) {
    }

    @Get()
    getHello() {
        return this.helloService.getHello();
    }

    @Get('user/:name')
    getHelloWithName(@Param('name') name: string) {
        return this.helloService.getHelloWithName(name);
    }

    @Get('query')
    getHelloQuery(@Query('name') name: string) {
        return this.helloService.getHelloWithName(name || "world");
    }
}
