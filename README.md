# SPRequest

This library is used to make SharePoint API request simpler.

## Usage / Examples

### Importing

There are 2 options initializing the scripts. If no url defined it will try to use the SharePoint URL available.

```js
// If URL is undefined it will use the SharePoint URL available

// create a new instance passing in a desired url.
import SPRequest from "SPRequest";
const spReq = new SPRequest("URL");

// Or use the predefined value spRequest. Uses "_spPageContextInfo.siteAbsoluteUrl" as default url.
import { spRequest as spReq } from "SPRequest";
```

---

### UpdateDefaultUrl Method

Used to change the default base url used by all methods. Useful if using the predefined SPRequest or getting all data from a diffrent sharepoint site or subsite.

#### Usage example

```js
spReq.updateDefaultUrl("URL");
```

---

### Get Method

Used to make a request to sharepoint API to get list data. This method returns a promise. You can use then/catch to deal with results.

#### Usage example

```js
// Get the first 100 of a given list
spReq.lists
    .get("ListName")
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Get all items
spReq.lists.get("ListName", true);

// Get file's info from document library (top 100)
spReq.lists.get("ListName", false, true);
spReq.lists.get("ListName", "files");

// Get all file's info
spReq.lists.get("ListName", true, true);
```

You can also pass objects and arrays to the get method.

```js
spReq.lists.get({ list: "ListName" });

spReq.lists.get([
    {
        list: "ListName",
        baseUrl: "/subsite"
    },
    "ListName2"
]);
```

#### Usefull Lists

Some usefull lists that are part of a sharepoint site.

| Name        | Discription                              |
| ----------- | ---------------------------------------- |
| lists       | Get a list of all lists                  |
| currentuser | Get infomation on the current user.      |
| siteusers   | Get a list of all sites users.           |
| sitegroups  | Get a list of all the sites user groups. |

#### Options

| Property | Type    | Default   | Example                                           | Discription                                                                                                               |
| -------- | ------- | --------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| list     | String  | `"lists"` | `"ListName"`                                      | The name of the list.                                                                                                     |
| baseUrl  | String  | `null`    | `"/subsite"`                                      | Get list from a subsite from your default url.                                                                            |
| select   | String  | `null`    | `"ID,Title,Created,LookupColumn"`                 | Select individual column(s) of the request list.                                                                          |
| expand   | String  | `null`    | `"LookupColumn/Title"`                            | Expand to get data from any lookup column(s).                                                                             |
| filter   | String  | `null`    | `"Created ge datetime'2020-01-15T00:00:00.000Z'"` | Apply filter to data being collected.                                                                                     |
| getAll   | Boolean | `false`   | `false`                                           | Promises will be deferred to get all. <br/> **Note**: Use "top" to limit the number of requests.                          |
| getFiles | Boolean | `false`   | `false`                                           | Get file info from a document library.                                                                                    |
| order    | String  | `null`    | `"Created desc"`<br/> _get new items_             | The order that the data will be collected. <br/> **Note**: This is not to sort the data just the order they are received. |
| top      | Number  | `100`     | `10`                                              | Get "X" number of items. <br/> **Note**: Used with "getAll" set batch size for each deferred promise.                     |
