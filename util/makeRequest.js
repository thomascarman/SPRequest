export const makeRequest = (options, items, deferred) => {
    const request = {
        url: options.url,
        type: options.type,
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose"
        },
        success: (data, status, xhr) => {
            if(data) {
                const results = data.d.results;
                items["Title"] = options.title || options.list;

                if (!results) {
                    items["results"] = data.d;
                    items["Title"] = options.title || data.d.Title || data.d.Id;
                } else {
                    for (let i in results) {
                        items["Items"] = items["Items"] || {};

                        if (results[i].Id) {
                            items["Items"][results[i].Id] = results[i];
                        } else {
                            items["Items"][i] = results[i];
                        }
                    }
                }

                if (data.d["__next"] && options.getAll) {
                    options.url = data.d["__next"];
                    makeRequest(options, items, deferred);
                } else {
                    deferred.resolve(items);
                }
            } else {
                deferred.resolve(`Item Updated.`);
            }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            deferred.reject(new Error(`${textStatus}: ${errorThrown}`));
        }
    };

    if (options.type == "POST") {
        request.headers["X-RequestDigest"] = $("#__REQUESTDIGEST").val();
        request.data = JSON.stringify(options.data);

        if (options.id) {
            request.headers["IF-MATCH"] = "*";
            request.headers["X-HTTP-Method"] = "MERGE";
        }
    }

    return $.ajax(request);
};
