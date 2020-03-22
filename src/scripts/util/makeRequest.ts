import { Options } from "formatOptions";

interface Request {
    url: string;
    type: string;
    headers: {
        Accept: string;
        "Content-Type": string;
        "X-RequestDigest"?: any;
        "IF-MATCH"?: string;
        "X-HTTP-Method"?: string;
    };
    data?: string;
    id?: number | string;
    success: (data: {
        d: { [x: string]: any; results: any; Title: any; Id: any };
    }) => void;
    error: (XMLHttpRequest: any, textStatus: any, errorThrown: any) => void;
}

class ItemList {
    Title?: string;
    List?: string;
    Items?: any;
    Results?: any;

    constructor(items: { Title?: string; List?: string; Items?: Object }) {
        this.Title = items.Title;
        this.List = items.List;
        this.Items = items.Items;
    }
}

export const makeRequest = (
    options: Options,
    items: any,
    deferred: JQuery.Deferred<any, any, any>
) => {
    const request: Request = {
        url: options.url,
        type: options.type,
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose"
        },
        success: (data: {
            d: { [x: string]: any; results: any; Title: any; Id: any };
        }) => {
            if (data && data.d) {
                const results = data.d.results;
                items["Title"] = options.title || options.list;
                items["List"] = options.list;

                if (!results) {
                    items["Results"] = data.d;
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
                    deferred.resolve(new ItemList(items));
                }
            } else {
                deferred.resolve(`Item Updated.`);
            }
        },
        error: (XMLHttpRequest: any, textStatus: any, errorThrown: any) => {
            deferred.reject(
                new Error(`${textStatus}: ${errorThrown} - ${XMLHttpRequest}`)
            );
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
