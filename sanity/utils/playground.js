// This script will find and delete all assets that are not referenced (in use)
// by other documents. Sometimes refered to as "orphaned" assets.
//
// Place this script somewhere and run it through
// `sanity exec utils/playground.js --with-user-token`

/* eslint-disable no-console */
import client from "part:@sanity/base/client";

// const query = `*[ _type == "inventory" ]{_id}`;
const query = `*[_type == "inventory" && !(_id in path("drafts.**")) && !defined(imageGallery.images)] | order(_id asc) [0..5000] {_id}`;

client
  .fetch(query)
  .then(ids => {
    if (!ids.length) {
      console.log("No items");
      return true;
    }

    console.table(`${ids.length}`);
    // return ids
    //   .reduce((trx, id) => trx.delete(id), client.transaction())
    //   .commit()
    //   .then(() => console.log('Done!'))
  })
  .catch(err => {
    if (err.message.includes("Insufficient permissions")) {
      console.error(err.message);
      console.error("Did you forget to pass `--with-user-token`?");
    } else {
      console.error(err.stack);
    }
  });
