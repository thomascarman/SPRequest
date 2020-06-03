import List from "list";

export default class SPRequest {
    defaultUrl: string;
    lists: List;

    constructor(defaultUrl?: string) {
        this.defaultUrl = location.origin;
        try {
            if (!defaultUrl || defaultUrl === "") {
                if (_spPageContextInfo) {
                    this.defaultUrl = _spPageContextInfo.siteAbsoluteUrl;
                } else {
                    throw new Error("Unable to get site URL.");
                }
            } else {
                this.defaultUrl = defaultUrl;
            }
        } catch (error) {}

        this.lists = new List(this.defaultUrl);
    }

    updateDefaultUrl(defaultUrl: string) {
        this.defaultUrl = defaultUrl;
        this.lists.defaultUrl = defaultUrl;
    }
}

export const spRequest = new SPRequest();
