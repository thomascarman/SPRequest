export const GetServerRelativeUrl = url => {
    return "/" + url.replace(/^(?:\/\/|[^/]+)*\//, "");
};

export const GetItemTypeForListName = name => {
    return { type: `SP.Data.${name.charAt(0).toUpperCase() + name.split(" ").join("_x0020_").slice(1)}ListItem` };
};