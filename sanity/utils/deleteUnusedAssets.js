// This script will find and delete all assets that are not referenced (in use)
// by other documents. Sometimes refered to as "orphaned" assets.
//
// Place this script somewhere and run it through
// `sanity exec utils/deleteUnusedAssets.js --with-user-token`

/* eslint-disable no-console */
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({apiVersion: '2021-06-07'})

const query = `
  *[ _type in ["sanity.imageAsset", "sanity.fileAsset"] && !(_id in ["image-a64e0e22a5d81954d09db8e548675aa764f9193a-1440x599-jpg", "image-169fdc85bf3626d6436968f7c5a9f2298dd9431a-1x1-png", "image-cac6fa0c168e2bc05e1c1c69362916157858abe8-590x440-png", "image-16e97dad13b60aff76e855533c5a883f289ec395-860x608-jpg", "image-ee30f03d805cfc78890739ff56a160a6a1372b82-1200x744-png"]) ]
  {_id, "refs": count(*[ references(^._id) ])}
  [ refs == 0 ]
  ._id
`;

client
  .fetch(query)
  .then(ids => {
    if (!ids.length) {
      console.log("No assets to delete");
      return true;
    }

    // console.log(`${ids}`);
    console.log(`Deleting ${ids.length} assets`);
    return ids
      .reduce((trx, id) => trx.delete(id), client.transaction())
      .commit()
      .then(() => console.log("Done!"));
  })
  .catch(err => {
    if (err.message.includes("Insufficient permissions")) {
      console.error(err.message);
      console.error("Did you forget to pass `--with-user-token`?");
    } else {
      console.error(err.stack);
    }
  });
