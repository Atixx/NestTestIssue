import { Global, Module } from "@nestjs/common";
import { RollbarService } from "./rollbar.service";

@Global()
@Module({
  providers: [RollbarService],
  exports: [RollbarService]
})

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RollbarModule { }
