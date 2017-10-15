/**
 * Fill a string by parameters.
 * Useful for easy fulfilling String templates.
 *
 * @param template string.
 * @param parameters values for keys in the template.
 * @param options to override defaults.
 * @returns fulfilled string template.
 */
const TEMPLATE_FILLER_OPTIONS = {
    start: '{',
    end: '}'
};
export function fillTemplate(
    /* String */ template = '',
    /* Object */ parameters = {},
    /* Object */ options = {} // if requires to override defaults
) {
    let result = template,
        settings = Object.assign({}, TEMPLATE_FILLER_OPTIONS, options);

    if ((typeof result === 'string') && result.length) {
        for (let prop in parameters) {
            if (parameters.hasOwnProperty(prop)) {
                result = result.replace(new RegExp(`${settings.start}${prop}${settings.end}`, "g"), parameters[prop]);
            }
        }
    }
    return result;
}

export function isIe() {
    return window.navigator.userAgent.indexOf("Trident/") > -1;
}

export const __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        let c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

export function getParams (query) {
  if (!query) {
    return { };
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
}
