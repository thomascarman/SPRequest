import * as util from "./utilities.js";

export const formatOptions = (defaultUrl, options, getAll, getFiles) => {
    if (!options || options === "" || options === "lists") {
        options = {
            list: "lists"
        };
    }
    if (typeof options === "string" && !Array.isArray(options)) {
        options = {
            list: options
        };
    } else if (!isNaN(options)) {
        throw new Error(`List can not be a number`);
    } else if (Array.isArray(options)) {
        // Array Handler
    }

    if (options.data) {
        options.data = Object.assign(
            { __metadata: util.GetItemTypeForListName(options.list) },
            options.data
        );
    }

    options.type = options.type ? options.type : "GET";
    options.select = options.select ? options.select : "";
    options.expand = options.expand ? options.expand : "";
    options.filter = options.filter ? options.filter : "";
    options.order = options.order ? options.order : "";
    options.top = options.top ? options.top : "100";
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
            ? `${defaultUrl}/_api/web/GetFolderByServerRelativeUrl('${util.GetServerRelativeUrl(
                  defaultUrl
              )}/${options.list}')/Files?`
            : `${defaultUrl}/_api/web/lists/getbytitle('${options.list}')/Items`;

        if (options.id) options.url += `(${options.id})`;

        if (options.type == "GET")
            options.url += `?$select=${options.select}&$expand=${options.expand}&$filter=${options.filter}&$orderby=${options.order}&$top=${options.top}`;
    }

    if (
        options.list === "sitegroups" ||
        options.list === "siteusers" ||
        options.list === "currentuser"
    ) {
        options.url = `${defaultUrl}/_api/web/${options.list}`;
    } else if (options.list === "lists") {
        options.url = `${defaultUrl}/_api/web/lists`;
    }

    return options;
};
