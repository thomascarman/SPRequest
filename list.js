import { makeRequest } from "./util/makeRequest.js";
import { formatOptions } from "./util/formatOptions.js";

export default class List {
    constructor(defaultUrl) {
        this.defaultUrl = defaultUrl;
    }

    get(options, getAll, getFiles) {
        options = formatOptions(this.defaultUrl, options, getAll, getFiles);

        let deferred = $.Deferred();
        makeRequest(options, {}, deferred);
        return deferred.promise();
    }

    add(options) {
        if (!options || typeof options !== "object") {
            const error = new Error(
                "To Add Item(s) to list send as object or object Array"
            );
            error.description =
                "See Documentation at https://github.com/thomascarman/SPRequest";

            throw error;
        } else {
            if (!options.data || !options.list) {
                throw new Error(
                    "Include List name and data to be added"
                ).description(
                    "See Documentation at https://github.com/thomascarman/SPRequest"
                );
            } else {
                options.type = "POST";
                options = formatOptions(this.defaultUrl, options);

                let deferred = $.Deferred();
                makeRequest(options, {}, deferred);
                return deferred.promise();
            }
        }
    }
}
