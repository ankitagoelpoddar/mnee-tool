import fs from 'fs';

async function combinehex(fileList, outputFile){
    // Stream the output file and write a single JSON array by appending
    // the inner contents of each input array (stripping '[' and ']')
    const ws = fs.createWriteStream(outputFile, { flags: 'w' });
    return new Promise((resolve, reject) => {
        ws.on('error', reject);
        ws.write('[');
        (async () => {
            try {
                let first = true;
                for (const file of fileList) {
                    console.log(`Reading data from file: ${file}`);
                    const data = fs.readFileSync(file, 'utf8').trim();
                    let inner = data;
                    if (inner.startsWith('[') && inner.endsWith(']')) {
                        inner = inner.slice(1, -1).trim();
                    }
                    if (inner.length === 0) continue;
                    if (!first) ws.write(',');
                    ws.write(inner);
                    first = false;
                }
                ws.end(']', resolve);
            } catch (err) {
                ws.destroy();
                reject(err);
            }
        })();
    });
}

const fileList = [
   // 'wallets_chunk_0_to_99999_combined-hex.json',
   // 'wallets_chunk_100000_to_199999_combined-hex.json',
   // 'wallets_chunk_200000_to_299999_combined-hex.json',
   // 'wallets_chunk_300000_to_399999_combined-hex.json',
   // 'wallets_chunk_400000_to_499999_combined-hex.json',
   // 'wallets_chunk_500000_to_599999_combined-hex.json',
   // 'wallets_chunk_600000_to_699999_combined-hex.json',
   // 'wallets_chunk_700000_to_799999_combined-hex.json',
    'wallets_chunk_800000_to_899999_combined-hex.json',
    'wallets_chunk_900000_to_999999_combined-hex.json'
];

// function to find duplicate hex in json array
async function findDuplicateHex(file) {
    const data = fs.readFileSync(file, 'utf8');
    const jsonArray = JSON.parse(data);
    const hexSet = new Set();
    const duplicates = new Set();
    for (const item of jsonArray) {
        if (hexSet.has(item.hex)) {
            duplicates.add(item.hex);
        } else {
            hexSet.add(item.hex);
        }
    }
    return Array.from(duplicates);
}


await combinehex(fileList, 'twoLacrawTx.json');
//const duplicates = await findDuplicateHex('1M_rawTx.json');
// console.log(`Found ${duplicates.length} duplicate hex entries.`);
// console.log(duplicates);
