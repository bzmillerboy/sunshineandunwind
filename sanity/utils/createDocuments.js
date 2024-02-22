/* eslint-disable no-console */
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-10-21" });

// Run this script with: `sanity exec utils/createDocuments.js --with-user-token`

const inputData = [
  "Rated speed, rpm",
  "Engine Output - Net, kW (hp)",
  "Number Of Carrier Rollers - Each Side",
  "Number Of Track Rollers - Each Side",
  "Track Shoe Width,  (inches)",
  "Transport Length Mono Boom, (ft/in)",
  "Transport Height - Maximum, mm (ft/in)",
  "Overall Undercarriage Width, (ft/in)",
  "Track Length On Ground, (ft/in)",
  "Overall Undercarriage Length, (ft/in)",
  "Tailswing Radius, (ft/in)",
  "Ground Clearance (inches)",
  "Digging Reach - Mono Boom, (ft/in)",
  "Ground Level Reach - Mono Boom,  (ft/in)",
  "Dig Height - Mono Boom, (ft/in)",
  "Dump Height - Mono Boom, (ft/in)",
  "Dig depth - 2.44m / 8'ft flat bottom (ft/in)",
  "Dig Depth - Mono Boom,  (ft/in)",
  "Fuel Tank, (gallons)",
  "Hydraulic Tank, (gallons)",
  "Ground Bearing Pressure (PSI)",
  "Swing Speed, rpm",
  "Swing Torque, (lbf / ft)",
  "Travel Speed - High, (mph)",
  "Tractive Force (lbf)",
  "Arm Tearout (lbf)",
  "Bucket Breakout, (lbf)",
  "Gradeability %",
  "End lift - 7.5m Reach, (lbs)",
  "Side lift - 7.5m Reach, (lbs)",
  "Total Flow (gallons (US) / min)",
  "Bucket Pressure  (PSI)",
  "Boost Pressure  (PSI)",
  "Operating Weight, (lbs)",
  "Base Warranty",
  "Open ROP or Closed Cab",
  "Heated/air ride/adjustable seat",
  "AC/Heat",
  "Bluetooth Connectivity",
  "Removable Counterweight/Counter weight removal system (SY500)",
  "Expandable Tracks",
  "Zero Tail Swing"
];

inputData.map(i => {
  const doc = {
    _type: "specifications",
    name: i
  };
  client.create(doc).then(res => {
    console.log(`Doc was created, document ID is ${res._id}`);
  });
});

// console.log(docArr);

// client.create(doc).then((res) => {
//   console.log(`Bike was created, document ID is ${res._id}`)
// })
