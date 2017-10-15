import {Router} from 'aurelia-router';
/**********************************************************************************************
 DECLARATION
 **********************************************************************************************/
export default class{
    static inject() {
        return [Router];
    }
    /******************************************************************************************
     INITIALIZATION
     ******************************************************************************************/
    constructor(router){
        this.router = router;
    }
    /******************************************************************************************
     CONFIGURATION
     *******************************************************************************************/
    configure(){
        let appRouterConfig = function(config){
            config.title = 'NodeJS';
            config.map(
                [
                    { route: '', redirect: 'home' },
                    {
                        route: 'home',
                        name: 'home',
                        title: 'Home',
                        moduleId: 'modules/home/home'
                    },
                  {
                    route: '/:token',
                    name: 'token',
                    title: '',
                    moduleId: 'modules/home/home'
                  }
                ]
            );
        };
        this.router.configure(appRouterConfig);
    }
}
