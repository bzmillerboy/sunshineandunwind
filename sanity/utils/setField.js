// This script will find (by query) and update a field's value.
//
// Place this script somewhere and run it through
// `sanity exec utils/setField.js --with-user-token`

/* eslint-disable no-console */
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2021-10-21" });

const query = `*[_type == "inventory"][0...1] {_id}`;

client
  .fetch(query)
  .then(items => {
    console.log("item:", items);
    if (!items.length) {
      console.log("No assets to update");
      return true;
    }

    console.log(`Updating: ${JSON.stringify(items)}`);
    console.log(`Updating ${items.length} assets`);

    const createTransaction = () => {
      items.reduce((trx, item) => {
        // console.log("title:", item.title);
        console.log("id:", item._id);
        return trx.patch(item._id, p => p.set({ status: "stock" }));
      }, client.transaction());
    };
    const commitTransaction = tx => tx.commit().then(() => console.log(`Done!`));

    const transaction = createTransaction();
    return commitTransaction(transaction);

    //   .commit()
    //   .then(() => console.log(`Done!`));
  })
  .catch(err => {
    if (err.message.includes("Insufficient permissions")) {
      console.error(err.message);
      console.error("Did you forget to pass `--with-user-token`?");
    } else {
      console.error(err.stack);
    }
  });
