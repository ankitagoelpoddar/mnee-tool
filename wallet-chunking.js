import fs from 'fs';


async function chunkwallets( chunkSize) {
    //read wallets.js
    const wallets = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));

    //iterate through wallet and slice into chunks , create a new wallet_{index}.json file for each chunk
    for (let i = 0; i < wallets.length; i += (chunkSize - 1)) {
        const chunk = wallets.slice(i, i + chunkSize);
        const chunkFileName = `wallets_chunk_${i}_to_${i + (chunkSize - 1)}.json`;
        fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
        console.log(`Created ${chunkFileName} with ${chunk.length} wallets.`);
    }
}

await chunkwallets(100000);
