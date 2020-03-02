# SPRequest

This library is used to make SharePoint API request simpler.

## Usage / Examples

Initialize SPRequest with SharePoint Site URL (optional)

```js
// If URL is undefined it will use the SharePoint URL available
const spReq = new SPRequest("URL");
```

To get a list's data. By default you will receive up to 100 items.

```js
// Get first 100
spReq.lists.get("ListName");

// Get all items
spReq.lists.get("ListName", true);

// Get file info from document library
spReq.lists.get("ListName", false, true);
spReq.lists.get("ListName", "files");
```
