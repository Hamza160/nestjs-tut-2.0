import {Module} from '@nestjs/common';
import {HelloController} from './hello.controller';
import {HelloService} from './hello.service';

@Module({
    imports: [], // import other modules if needed
    exports: [HelloService], // export services if needed in other module
    controllers: [HelloController],
    providers: [HelloService]
})
export class HelloModule {
}
