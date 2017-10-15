import RouterConfig from 'configuration/router.config';

export class App {

  /*configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
  }*/

  static inject() {
    return [RouterConfig];
  }
  constructor(
    /* Service */ routerConfig
  ) {
    this.routerConfig = routerConfig;
  }

  activate() {
    this.routerConfig.configure();
  }


}
