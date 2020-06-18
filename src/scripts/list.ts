module List {
    export class List {
        defaultUrl: string;

        constructor(defaultUrl: string) {
            this.defaultUrl = defaultUrl;
        }

        get(
            options: string | any[] | FormateOptions.Options,
            getAll?: string | boolean,
            getFiles?: string | boolean
        ) {
            if (Array.isArray(options)) {
                let deferred = $.Deferred();
                let listData: any = {},
                    promises: any[] = [],
                    fOptions: FormateOptions.Options[] = [],
                    fulfulled = 0,
                    optLen = options.length;

                options.forEach((opts, index) => {
                    fOptions[index] = FormateOptions.formatOptions(
                        this.defaultUrl,
                        opts,
                        getAll,
                        getFiles
                    );
                    promises[index] = () => {
                        let dfd = $.Deferred();
                        MakeRequest.makeRequest(fOptions[index], {}, dfd);
                        return dfd.promise();
                    };
                });

                if (optLen === 0) {
                    deferred.resolve(listData);
                } else {
                    promises.forEach((promise, index) => {
                        promise().then((data: any) => {
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
                options = FormateOptions.formatOptions(
                    this.defaultUrl,
                    options,
                    getAll,
                    getFiles
                );

                let deferred = $.Deferred();
                MakeRequest.makeRequest(options, {}, deferred);
                return deferred.promise();
            }
        }

        add(options: FormateOptions.Options) {
            if (!options || typeof options !== "object") {
                const error = new Error(
                    "To Update/Add Item(s) to list send as object or object Array. See Documentation at https://github.com/thomascarman/SPRequest."
                );

                throw error;
            } else {
                if (!options.data || !options.list) {
                    throw new Error(
                        "Include List name and data to be added. See Documentation at https://github.com/thomascarman/SPRequest."
                    );
                } else {
                    options.type = "POST";
                    options = FormateOptions.formatOptions(
                        this.defaultUrl,
                        options
                    );

                    let deferred = $.Deferred();
                    MakeRequest.makeRequest(options, {}, deferred);
                    return deferred.promise();
                }
            }
        }

        update(options: FormateOptions.Options) {
            if (!options || typeof options !== "object") {
                const error = new Error(
                    "To Update Item(s) to list send as object or object Array. See Documentation at https://github.com/thomascarman/SPRequest."
                );

                console.log(error);
                throw error;
            } else if (!options.id) {
                const error = new Error(
                    "Update requires an Id of the item to be updated. See Documentation at https://github.com/thomascarman/SPRequest."
                );

                console.log(error);
                throw error;
            } else {
                if (!options.data || !options.list) {
                    throw new Error(
                        "Include List name and data to be added. See Documentation at https://github.com/thomascarman/SPRequest."
                    );
                } else {
                    options.type = "POST";
                    options = FormateOptions.formatOptions(
                        this.defaultUrl,
                        options
                    );

                    let deferred = $.Deferred();
                    MakeRequest.makeRequest(options, {}, deferred);
                    return deferred.promise();
                }
            }
        }
    }
}
