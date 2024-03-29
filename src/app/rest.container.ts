import { Container } from 'inversify';
import RestApplication from './rest.js';
import { AppComponent } from '../types/app-component.enum.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import ConfigService from '../core/config/config.service.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import PinoService from '../core/logger/pino.service.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';
import { ExceptionFiltersInterface } from '../core/exception-filters/exception-filters.interface.js';
import ExceptionFilters from '../core/exception-filters/exception-filters.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();
  restApplicationContainer
    .bind<RestApplication>(AppComponent.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface)
    .to(ConfigService)
    .inSingletonScope();
  restApplicationContainer
    .bind<LoggerInterface>(AppComponent.LoggerInterface)
    .to(PinoService)
    .inSingletonScope();
  restApplicationContainer
    .bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface)
    .to(MongoClientService).inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFiltersInterface>(AppComponent.ExceptionFiltersInterface)
    .to(ExceptionFilters).inSingletonScope();

  return restApplicationContainer;
}
