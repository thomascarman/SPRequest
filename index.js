import Lists from "./list.js";

export default class SPRequest {
    constructor(defaultUrl) {
        if (!defaultUrl || defaultUrl === "") {
            if (_spPageContextInfo) {
                this.defaultUrl = _spPageContextInfo.siteAbsoluteUrl;
            } else {
                throw new Error("Unable to get site URL.");
            }
        } else {
            this.defaultUrl = defaultUrl;
        }

        if (this.defaultUrl) this.lists = new Lists(this.defaultUrl);
    }
}

export const spRequest = new SPRequest();
