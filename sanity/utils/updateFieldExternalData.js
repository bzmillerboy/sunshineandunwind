/* eslint-disable no-console */
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-10-21" });

// Run this script with: `sanity exec utils/updateFieldExternalData.js --with-user-token`

const docs = [{ _id: "da4e9e29-7936-44d8-bc1e-f97ff9fa1f29" }];

const specsRaw = [
  {
    _key: "f50755d68a79",
    _type: "modelSpecContent",
    specName___ref: "1ff46130-de5e-4238-a1b3-d665e23a216a",
    specName___type: "reference",
    specValue: "824"
  },
  {
    _key: "f9bd18e40955",
    _type: "modelSpecContent",
    specName___ref: "22e83e58-e514-4db5-b7ce-f4b492b45b88",
    specName___type: "reference",
    specValue: "Tier 4 / Stage IV"
  },
  {
    _key: "5315450b4c04",
    _type: "modelSpecContent",
    specName___ref: "2dfbb48f-2a73-4cee-a6f4-861afcacef03",
    specName___type: "reference",
    specValue: "John Deere Power Tech"
  },
  {
    _key: "7c07bfebdd44",
    _type: "modelSpecContent",
    specName___ref: "fef53e23-4a32-4407-9ad3-eb9d5c76a278",
    specName___type: "reference",
    specValue: "6"
  },
  {
    _key: "d48a802c4853",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrqhG",
    specName___type: "reference",
    specValue: "39' 5\""
  },
  {
    _key: "182650101598",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrr0W",
    specName___type: "reference",
    specValue: "67,564"
  },
  {
    _key: "84bd29c1853b",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrr6w",
    specName___type: "reference",
    specValue: "35"
  },
  {
    _key: "c635e9b7fd76",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrrA9",
    specName___type: "reference",
    specValue: "41' "
  },
  {
    _key: "150328b9026a",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrrDM",
    specName___type: "reference",
    specValue: "9"
  },
  {
    _key: "f64207f08ad6",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrrGZ",
    specName___type: "reference",
    specValue: "14' 8\""
  },
  {
    _key: "abeb3b3f5987",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrrJm",
    specName___type: "reference",
    specValue: "45,925"
  },
  {
    _key: "e4efca3ade2a",
    _type: "modelSpecContent",
    specName___ref: "gZHZOd9lLky5KkplrWrrTP",
    specName___type: "reference",
    specValue: "112,916"
  },
  {
    _key: "194ae6d68ba9",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbx6a",
    specName___type: "reference",
    specValue: "10' 10\""
  },
  {
    _key: "cb293e4f5e05",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbxmo",
    specName___type: "reference",
    specValue: "109,159"
  },
  {
    _key: "53ac8509e612",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbxsq",
    specName___type: "reference",
    specValue: "29"
  },
  {
    _key: "d6a7ff13bfd3",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbxvr",
    specName___type: "reference",
    specValue: "17' 11\""
  },
  {
    _key: "ef096c48a0ab",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbxys",
    specName___type: "reference",
    specValue: "178"
  },
  {
    _key: "2939058907de",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdby1t",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "9f883e059147",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdby7v",
    specName___type: "reference",
    specValue: "73,937"
  },
  {
    _key: "171b569f53c8",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyAw",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "2fa18bb477f7",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyDx",
    specName___type: "reference",
    specValue: "4,627"
  },
  {
    _key: "c2de7479df05",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyGy",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "49fb11c6f982",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyJz",
    specName___type: "reference",
    specValue: "9.5"
  },
  {
    _key: "b1549d494270",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyN0",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "d1284a24d254",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyQ1",
    specName___type: "reference",
    specValue: "212"
  },
  {
    _key: "80cf3229a686",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyT2",
    specName___type: "reference",
    specValue: "70"
  },
  {
    _key: "d428c579b68f",
    _type: "modelSpecContent",
    specName___ref: "Hp6p1Se2MoX7sPDYpdbyW3",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "d36e73ed7bb5",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQFj",
    specName___type: "reference",
    specValue: "367 HP"
  },
  {
    _key: "ab4acb1cf399",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQIx",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "b7a9bd4642a1",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQpD",
    specName___type: "reference",
    specValue: "36' 7\""
  },
  {
    _key: "30750632c49c",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQPP",
    specName___type: "reference",
    specValue: "40' 3\""
  },
  {
    _key: "f11c67c5fbc8",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQqp",
    specName___type: "reference",
    specValue: "8.9"
  },
  {
    _key: "b92d40288620",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQR1",
    specName___type: "reference",
    specValue: "3"
  },
  {
    _key: "17c06834dbb0",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQsR",
    specName___type: "reference",
    specValue: "3.4"
  },
  {
    _key: "971cbbd94c92",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQu3",
    specName___type: "reference",
    specValue: "26' 8\""
  },
  {
    _key: "aaa1a685f0b2",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQvf",
    specName___type: "reference",
    specValue: "27' 2\""
  },
  {
    _key: "a5379fc22845",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTQxH",
    specName___type: "reference",
    specValue: "82"
  },
  {
    _key: "fe7cd513e1cb",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTR27",
    specName___type: "reference",
    specValue: "12' "
  },
  {
    _key: "3d7b1f05876b",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTR5L",
    specName___type: "reference",
    specValue: "11' 6\""
  },
  {
    _key: "b5b12bf57ab3",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTR8Z",
    specName___type: "reference",
    specValue: "21,190"
  },
  {
    _key: "b218f08a0adb",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRAB",
    specName___type: "reference",
    specValue: "2000"
  },
  {
    _key: "9e3ae4e4fdcc",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRBn",
    specName___type: "reference",
    specValue: "5,120"
  },
  {
    _key: "4a690fb649bb",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRDP",
    specName___type: "reference",
    specValue: "34,010"
  },
  {
    _key: "6d0b45ab5ae4",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRF1",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "18fc8d4ea832",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRGd",
    specName___type: "reference",
    specValue: "-"
  },
  {
    _key: "891625850999",
    _type: "modelSpecContent",
    specName___ref: "VFtdfrbx4mANsihdWLTRIF",
    specName___type: "reference",
    specValue: "25' 6\""
  }
];

const specs = specsRaw.map(spec => {
  return {
    _key: spec._key,
    _type: "modelSpecContent",
    specName: {
      _ref: spec.specName___ref,
      _type: "reference"
    },
    specValue: spec.specValue
  };
});

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: { specifications: specs }
    }
  }));

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = docs;
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return;
  // return migrateNextBatch();
};

migrateNextBatch().catch(err => {
  console.error(err);
  process.exit(1);
});
