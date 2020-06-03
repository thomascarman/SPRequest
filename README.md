# SPRequest

This library is used to make SharePoint API request simpler.

## Usage / Examples

There are 2 options initializing the scripts. If no url defined it will try to use the SharePoint URL available.

```js
// If URL is undefined it will use the SharePoint URL available

// create a new instance passing in a desired url.
import SPRequest from "../siteassets/app/sprequest/index.js";
const spReq = new SPRequest("URL");

// Or use the predefined value spRequest
import { spRequest as spReq } from "../siteassets/app/sprequest/index.js";
```

To get a list's data. By default you will receive up to 100 items.

```js
// Get first 100
spReq.lists.get("ListName");

// Get all items
spReq.lists.get("ListName", true);

// Get file's info from document library (top 100)
spReq.lists.get("ListName", false, true);
spReq.lists.get("ListName", "files");

// Get all file's info
spReq.lists.get("ListName", true, true);
```

SPRequest returns a promise. Use can then/catch to deal with results.

```js
spReq.lists
    .get("ListName")
    .then(data => console.log(data))
    .catch(err => console.log(err));
```
