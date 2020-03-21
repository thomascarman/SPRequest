import { makeRequest } from "./util/makeRequest.js";
import { formatOptions } from "./util/formatOptions.js";

export default class List {
    constructor(defaultUrl) {
        this.defaultUrl = defaultUrl;
    }

    get(options, getAll, getFiles) {
        if (Array.isArray(options)) {
            let deferred = $.Deferred();
            let listData = {};

            options.forEach((opts, index, arr) => {
                let dfd = $.Deferred();

                opts = formatOptions(this.defaultUrl, opts, getAll, getFiles);
                listData[opts.list] = listData[opts.list] || {};

                makeRequest(opts, listData[opts.list], dfd);

                dfd.promise().then(() => {
                    if (Object.keys(listData).length == arr.length) {
                        deferred.resolve(listData);
                    }
                });
            });

            return deferred.promise();
        } else {
            options = formatOptions(this.defaultUrl, options, getAll, getFiles);

            let deferred = $.Deferred();
            makeRequest(options, {}, deferred);
            return deferred.promise();
        }
    }

    add(options) {
        if (!options || typeof options !== "object") {
            const error = new Error(
                "To Update/Add Item(s) to list send as object or object Array"
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

    update(options) {
        if (!options || typeof options !== "object") {
            const error = new Error(
                "See Documentation at https://github.com/thomascarman/SPRequest"
            );
            error.description =
                "To Update Item(s) to list send as object or object Array";

            console.log(error);
            throw error;
        } else if (!options.id) {
            const error = new Error(
                "See Documentation at https://github.com/thomascarman/SPRequest"
            );
            error.description =
                "Update requires an Id of the item to be updated";

            console.log(error);
            throw error;
        } else {
            if (!options.data || !options.list) {
                throw new Error(
                    "See Documentation at https://github.com/thomascarman/SPRequest"
                ).description("Include List name and data to be added");
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
