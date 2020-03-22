import * as util from "util/utilities";
export interface Options {
    list: string;
    title?: string;
    data?: {
        __metadata?: object;
        [key: string]: any;
    };
    baseUrl?: string;
    url?: string;
    type?: string;
    select?: string;
    expand?: string;
    filter?: string;
    order?: string;
    top?: string | number;
    getAll?: boolean | string;
    getFiles?: boolean | string;
    id?: string | number;
}

export const formatOptions = (
    defaultUrl: string,
    options: string | Options,
    getAll?: string | boolean,
    getFiles?: string | boolean
) => {
    if (!options || options === "" || options === "lists") {
        options = {
            list: "lists"
        };
    }
    if (typeof options === "string" && !Array.isArray(options)) {
        options = {
            list: options
        };
    } else if (Array.isArray(options)) {
        throw new Error(`List can not contain arrays`);
    }

    if (options.data) {
        options.data.__metadata = util.GetItemTypeForListName(options.list);
    }

    options.baseUrl = options.baseUrl ? options.baseUrl : defaultUrl;
    options.type = options.type ? options.type : "GET";
    options.select = options.select ? options.select : "";
    options.expand = options.expand ? options.expand : "";
    options.filter = options.filter ? options.filter : "";
    options.order = options.order ? options.order : "";
    options.top = options.top ? options.top : 100;
    options.getAll = options.getAll
        ? options.getAll
        : getAll && typeof getAll === "boolean"
        ? true
        : false;
    options.getFiles = options.getFiles
        ? options.getFiles
        : getFiles || getFiles == "files"
        ? true
        : false;

    if (typeof getAll === "string")
        if (getAll === "files") options.getFiles = true;

    if (!options.url) {
        options.url = options.getFiles
            ? `${
                  options.baseUrl
              }/_api/web/GetFolderByServerRelativeUrl('${util.GetServerRelativeUrl(
                  options.baseUrl
              )}/${options.list}')/Files?`
            : `${options.baseUrl}/_api/web/lists/getbytitle('${options.list}')/Items`;

        if (options.id) options.url += `(${options.id})`;

        if (options.type == "GET")
            options.url += `?$select=${options.select}&$expand=${options.expand}&$filter=${options.filter}&$orderby=${options.order}&$top=${options.top}`;
    }

    if (
        options.list === "sitegroups" ||
        options.list === "siteusers" ||
        options.list === "currentuser"
    ) {
        options.url = `${options.baseUrl}/_api/web/${options.list}`;
    } else if (options.list === "lists") {
        options.url = `${options.baseUrl}/_api/web/lists`;
    }

    return options;
};
