import {HttpProxyService} from "common/services/httpProxy.service";

export default class {

    static inject() {
        return [HttpProxyService];
    }

    constructor(
        /* Service */ proxy
    ) {
        this.proxy = proxy;
    }

    getloggedUser() {
        return this.proxy
            .call(
                'GetUser'
            )
            .then((response) => {
                return response;
            });
    }

    getToken(token) {
        return this.proxy
            .call(
                'GetToken',
                {
                    token: token
                }
            )
            .then(response => {
                return response;
            });
    }

}
