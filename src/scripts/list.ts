import { makeRequest } from "../../util/makeRequest.js";
import { formatOptions } from "../../util/formatOptions.js";

export default class List {
    constructor(defaultUrl) {
        this.defaultUrl = defaultUrl;
    }

    get(options, getAll, getFiles) {
        if (Array.isArray(options)) {
            let deferred = new $.Deferred();
            let listData = {},
                promises = [],
                fOptions = [],
                fulfulled = 0,
                optLen = options.length;

            options.forEach((opts, index) => {
                fOptions[index] = formatOptions(
                    this.defaultUrl,
                    opts,
                    getAll,
                    getFiles
                );
                promises[index] = () => {
                    let dfd = new $.Deferred();
                    makeRequest(fOptions[index], {}, dfd);
                    return dfd.promise();
                };
            });

            if (optLen === 0) {
                deferred.resolve(listData);
            } else {
                promises.forEach((promise, index) => {
                    promise().then(data => {
                        listData[
                            fOptions[index].title || fOptions[index].list
                        ] = data;
                        fulfulled++;
                        if (fulfulled === optLen) {
                            deferred.resolve(listData);
                        }
                    });
                });
            }

            return deferred.promise();
        } else {
            options = formatOptions(this.defaultUrl, options, getAll, getFiles);

            let deferred = new $.Deferred();
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
