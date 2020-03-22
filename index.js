require.config({
    baseUrl: "../siteassets/app/sprequest/scripts",
    paths: {
        app: "../"
    }
});

require(["SPRequest"], spRequest => {
    const spReq = spRequest.spRequest;
    console.log(spReq);

    spReq.lists
        .get({
            list: "TestList"
        })
        .then(data => console.log(data));
});
