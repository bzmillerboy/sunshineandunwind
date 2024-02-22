import sanityClient from "@sanity/client";

// Node 17+ required. If on node 16, uncomment the following line.
// const fetch = (url, init) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));

// Specify projectId, dataset, and document type to search
const projectId = "agnoplrn";
const dataset = "development";
const documentType = "inventory";

// Specify the time in UTC to pass into Sanity's History API in the expected format: https://www.sanity.io/docs/datetime-type
const time = "2023-02-05T21:25:00Z"; // Currently set at February 5, 2023, at 9:25 p.m. UTC

// Specify a read token obtained from sanity.io/manage:
const token =
  "skfOejKmh0l5rDbB92uQNq3kJCeRsIMAmOxozE3o1xd4ZGWduG0lsYkJtzBv9jo7wbBUqacDWFBfDKCJ18IuuNKzR9WuyP7B4X9XGuKFnjSjmDlrybJbqf3eCBFm7fIpC9GC9oLrwdzqrkGjgJla1XipZTPzkVqGFu0eI7Dku7uS7CC8r4gg";

// Save this snippet into your Sanity Studio directory locally and run it with:
// sanity exec utils/recoverDocByDateTime.mjs

// ***************** The following should not need to be changed *********************

const client = sanityClient({ projectId, dataset, useCdn: false, token, apiVersion: "2022-10-21" });

function getIds() {
  return client.fetch(`*[_type == '${documentType}']._id`);
}

function historyFetch(id) {
  return fetch(
    `https://${projectId}.api.sanity.io/v2022-10-21/data/history/${dataset}/documents/${id}?time=${time}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

async function getDocuments() {
  const ids = await getIds();
  const promises = ids.map(async id => {
    const json = await historyFetch(id);
    const data = await json.json();
    return JSON.stringify(data.documents?.[0]);
  });
  const docs = await Promise.all(promises);

  return docs;
}

async function showDocuments() {
  const docs = await getDocuments();
  console.log(docs);
  console.log("\n----------------\n");
  console.log("Document count: ", docs.length);
}

showDocuments();
