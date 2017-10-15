import {fillTemplate} from 'common/helpers/utils';
import {BASE_API_URL} from 'configuration/global.config'
import {HTTP_OPTIONS, API_ROUTES} from 'configuration/api.routes.config';

/**********************************************************************************************
 * API ROUTINE SERVICE
 **********************************************************************************************

 /**********************************************************************************************
 * DECLARATION
 **********************************************************************************************/
export class ApiRouterService {
  /******************************************************************************************
   INITIALIZATION
   ******************************************************************************************/
  constructor(
    /* Object */ filler
  ){
    console.info('SERVICE: ApiRouterService');
  }
  /******************************************************************************************
   PUBLIC METHODS
   ******************************************************************************************
   simple HTTP request options generator
   ******************************************************************************************/
  getRoute(
    /* String */ routeName,
    /* Object */ parameters = {}
  ){
    let route, headers = {};
    if (API_ROUTES.hasOwnProperty(routeName)) {
      // copy route options
      route = JSON.parse(JSON.stringify(API_ROUTES[routeName]));
      // fulfilling of URL by parameters if any
      route.url = BASE_API_URL + fillTemplate(route.url, parameters);
      // merge request options
      route.options = route.options || {};
      // merge & save headers section
      headers = Object.assign({}, HTTP_OPTIONS.headers, route.options.headers || {});
      // merge options section
      route.options = Object.assign({}, HTTP_OPTIONS, route.options);
      // attach saved headers
      route.options.headers = headers;
    }
    return route;
  }
  /******************************************************************************************
   secure HTTP request options generator
   ******************************************************************************************/
  getSecureOptions(
    /* String */ routeName
  ){
    return API_ROUTES.hasOwnProperty(routeName) ? JSON.parse(JSON.stringify(API_ROUTES[routeName])).options : {};
  }
}
