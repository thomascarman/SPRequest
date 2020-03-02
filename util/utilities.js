export const GetServerRelativeUrl = url => {
    return "/" + url.replace(/^(?:\/\/|[^/]+)*\//, "");
};
