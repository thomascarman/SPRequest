export const makeRequest = (options, items, deferred) => {
    return $.ajax({
        url: options.url,
        type: options.type,
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: data => {
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
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            deferred.reject(new Error(`${textStatus}: ${errorThrown}`));
        }
    });
};
