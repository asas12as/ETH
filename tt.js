const ethWallet = require('ethereumjs-wallet').default;
var fs = require('fs');
let x = [];
let z = [];

async function balance() {
    var BL = fs.readFileSync('./t/known_addresses.json').toString().split("\n");
    for (i in BL) {
        z.push(BL[i]);
    }
}

async function main() {
    await balance();
    let index = 0
    let breakPoint = 1
    while (index < 1000000000000000) {
        try {
            while (index < breakPoint) {
                let addressData = ethWallet.generate();
                x.push(addressData.getAddressString());

                // Check if the newly generated address already exists in the `known_addresses.json` file.
                if (z.includes(addressData.getAddressString())) {
                    fs.writeFileSync(`./${index}`, `${x}\n`, { flag: 'a+' }, err => { });
                    fs.writeFileSync(`./${index}P`, `${addressData.getPrivateKeyString()}\n`, { flag: 'a+' }, err => { });
                    console.log('this is the one');
                }


                x.length = 0;
                index = index + 1

            }
            console.log(index);
            breakPoint = breakPoint + 10000
        } catch (error) {
            console.log(error)
        }
    }


}

main();

/*
for (let index = 0; index < 1000000000000000; index++) {
    let addressData = ethWallet.generate();
    x.push(addressData.getAddressString());

    // Check if the newly generated address already exists in the `known_addresses.json` file.
    if (z.includes(addressData.getAddressString())) {
        fs.writeFileSync(`./${index}`, `${x}\n`, { flag: 'a+' }, err => { });
        fs.writeFileSync(`./${index}P`, `${addressData.getPrivateKeyString()}\n`, { flag: 'a+' }, err => { });
        console.log('this is the one');
    }

    // Write the address and private key to disk.
    //fs.writeFileSync(`./${index}`, `${x}\n`, { flag: 'a+' }, err => { });
    //fs.writeFileSync('./t/UNA.json', `${addressData.getAddressString()}\n`, { flag: 'a+' }, err => { });
    //fs.writeFileSync('./t/UNP.json', `${addressData.getPrivateKeyString()}\n`, { flag: 'a+' }, err => { });
    console.log(index);
    x.length = 0;
}*/
