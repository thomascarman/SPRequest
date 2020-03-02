import Lists from "./list.js";

export default class SPRequest {
    constructor(defaultUrl) {
        if (!defaultUrl || defaultUrl === "")
            throw new Error("SPReqest requires a URL of a sharepoint site.");

        this.defaultUrl = defaultUrl;
        this.lists = new Lists(this.defaultUrl);
    }
}
