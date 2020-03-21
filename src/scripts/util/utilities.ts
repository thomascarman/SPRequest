export const GetServerRelativeUrl = (url: string) => {
    return "/" + url.replace(/^(?:\/\/|[^/]+)*\//, "");
};

export const GetItemTypeForListName = (name: string) => {
    return {
        type: `SP.Data.${name.charAt(0).toUpperCase() +
            name
                .split(" ")
                .join("_x0020_")
                .slice(1)}ListItem`
    };
};
