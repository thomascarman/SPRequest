
console.log(spReq);

spReq.lists
    .get({
        list: "TestList"
    })
    .then(data => console.log(data));

