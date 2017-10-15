import {Router} from 'aurelia-router';
import {getParams} from 'common/helpers/utils';
import LoginService from 'common/services/login.service';
import loginSettings from 'configuration/login.config';

export class App {

    static inject() {
        return [Router, LoginService];
    }

    constructor(
        /* Service */ router,
        /* Service */ login
    ) {
        this.router = router;
        this.loginService = login;
    }

    url = `https://oauth.vk.com/authorize?client_id=${loginSettings.vk_settings.clientId}&display=${loginSettings.vk_settings.display}&redirect_uri=${loginSettings.vk_settings.redirectUri}&scope=${loginSettings.vk_settings.scope}&response_type=${loginSettings.vk_settings.responseType}&v=${loginSettings.vk_settings.v}`;

    canActivate(params) {
        this.loginService.getloggedUser()
            .then(user => {
                this.user = user;
            });
        if (params.token && params.token.indexOf('access_token') > -1) {
            this.token = getParams(params.token);
            this.loginService.getToken(this.token.access_token)
                .then(user => {
                    this.user = user;
                    this.router.navigateToRoute('home');
                });
        }
    }

    login() {
        window.location = this.url;
    }

}
