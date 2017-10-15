export const HTTP_OPTIONS = {
    method: 'GET',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
};

export const API_ROUTES = {
    // COMMON | GLOBAL
    GetToken: {
      url: '/login/vkontakte/?access_token={token}',
      options: {
        method: 'GET',
        credentials: 'include'
      }
    },

  GetUser: {
    url: '/login/vkontakte/user',
    options: {
      method: 'GET',
      credentials: 'include'
    }
  }
};
