import { Injectable } from "@nestjs/common";
import Rollbar from 'rollbar';
import { ConfigService } from "@nestjs/config";
import { RollbarConfigSettings } from "../config";
import { ROLLBAR_CONFIG_KEY } from "./rollbar.constants";

@Injectable()
export class RollbarService {
  constructor(configService: ConfigService) {
    const rollbarConfig = configService.get<RollbarConfigSettings>(ROLLBAR_CONFIG_KEY) as RollbarConfigSettings;
    this.logger = new Rollbar({
      accessToken: rollbarConfig.accessToken,
      environment: rollbarConfig.environment,
      captureUncaught: true,
      captureUnhandledRejections: true
    });
  }

  readonly logger: Rollbar;
}
