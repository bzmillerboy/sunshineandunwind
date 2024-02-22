import client from "part:@sanity/base/client";
import uuidv4 from "uuid/v4";
// Run this script with: `sanity exec --with-user-token migrations/renameField.js`
//
// This example shows how you may write a migration script that renames a field (name => fullname)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
const fetchDocuments = () => client.fetch(`* [_type == 'equipmentBrand']`);

const buildDeletionsOfExisting = docs =>
  docs.map(doc => {
    return {
      id: doc._id,
      type: "delete"
    };
  });

const buildDocumentCopiesWithNewIds = docs =>
  docs.map(doc => {
    const { _id, _rev, _type, ...restOfDoc } = doc;

    const newDoc = { ...restOfDoc, _type: "equipmentMake" };

    return {
      id: doc._id,
      create: newDoc
    };
  });

const createTransaction = migs =>
  migs.reduce((tx, mig) => {
    if (mig.patch) {
      return tx.patch(mig.id, mig.patch);
    } else if (mig.create) {
      return tx.create(mig.create);
    } else if (mig.type && mig.type === "delete") {
      return tx.delete(mig.id);
    }
  }, client.transaction());

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();

  // modify these migs
  const creations = buildDocumentCopiesWithNewIds(documents);
  // const rereferences = buildReReferences(documents, creations);
  const deletions = buildDeletionsOfExisting(documents);
  const migs = creations.concat(deletions);
  // const migs = buildPatches(documents)

  if (migs.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(`Migrating batch:\n %s`, migs.map(mig => `Mig:   ${JSON.stringify(mig)}`).join("\n"));
  const transaction = createTransaction(migs);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch(err => {
  console.error(err);
  process.exit(1);
});
