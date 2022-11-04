const fs = require('fs');
const readline = require('readline');
const path = require('path');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const pathToFile = path.join(__dirname, 'text.txt');

const fileText = fs.createWriteStream(pathToFile);

readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name === 'c') {
        console.log ('\nДо свидания!');
    }
});

function write() {

    r1.question('Напишите что-нибудь - ', text => {
        console.log(text);
        if(text.toLocaleLowerCase() === 'exit') {
            console.log('До свидания!');
            r1.close();
            return;
        }

        fileText.write(text + '\n', err => {
            if (err) {
                console.log(err.message);
            } else {
                write();
            }
        });
    });
}

write();