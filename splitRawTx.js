

import fs from "fs";

// ------------ CONFIG ------------------
// Input file
const INPUT_FILE = "./rawTx.json";

// How many rawtx you want in the first file (dynamic input)
const FIRST_FILE_COUNT = 10000;

// Output files
const OUT_FILE_1 = "./rawTx_10k.json";
const OUT_FILE_2 = "./rawTx_40k.json";
// --------------------------------------


function splitRawTx() {
    console.log("Reading rawTx.json...");
    
    const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

    console.log(`Total rawtx in file: ${data.length}`);

    // Remove duplicates
    const unique = [...new Set(data)];

    console.log(`Unique rawtx count: ${unique.length}`);

    // Split into two files
    const part1 = unique.slice(0, FIRST_FILE_COUNT);
    const part2 = unique.slice(FIRST_FILE_COUNT);

    // Write the two files
    fs.writeFileSync(OUT_FILE_1, JSON.stringify(part1, null, 2));
    fs.writeFileSync(OUT_FILE_2, JSON.stringify(part2, null, 2));

    console.log(`Generated:`);
    console.log(` - ${OUT_FILE_1} (${part1.length} rawtx)`);
    console.log(` - ${OUT_FILE_2} (${part2.length} rawtx)`);
}

splitRawTx();
