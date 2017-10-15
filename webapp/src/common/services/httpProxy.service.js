import {HttpClient, json} from 'aurelia-fetch-client';
import {ApiRouterService} from 'common/services/apiRouterService';
/**********************************************************************************************
 DECLARATION
 **********************************************************************************************/
export class HttpProxyService {
  static inject() {
    return [HttpClient, ApiRouterService];
  }
  /******************************************************************************************
   INITIALIZATION
   ******************************************************************************************/
  constructor(
    /* Service */ http,
    /* Service */ router
  ){
    this.http = http;
    this.router = router;
  }
  /******************************************************************************************
   PUBLIC METHODS
   ******************************************************************************************
   simple HTTP request
   *******************************************************************************************/
  call(
    /* String */ routeName,
    /* Object */ parameters,
    /* Object */ data = undefined
  ){
    let options = this.router.getRoute(routeName, parameters);
    data ? options.options.body = json(data) : void(0);
    return this.http
      .fetch(
        options.url,
        options.options
      )
      .then(response => {
        //console.info(`OK status:`, response.status);
        return response.headers.get('Content-Type').indexOf('application/json') > -1 ? response.json() : response;
      });
  }
  /******************************************************************************************
   secure HTTP request
   *******************************************************************************************/
  login(
    /* Object */ credentials = {},
    /* String|int */ redirectUri = '' //no redirect by default
  ){
    return this.auth
      .login(
        credentials,
        this.router.getSecureOptions('login'),
        redirectUri
      );
  }
  /******************************************************************************************
   secure HTTP request
   *******************************************************************************************/
  logout(
    /* String|int */ redirectUri = 0 //no redirect by default
  ){
    return this.auth
      .logout(
        redirectUri
      );
  }
}
