const path = require('path');
const fs = require('fs');

const DIR = path.join('.', 'assets', 'db');

function convert(filename) {
    try {
        console.log('Converting', `${filename}...`);

        const data = fs.readFileSync(path.join(DIR, filename));
        const statements = data
            .toString()
            .replace('\n', '')
            .split(';')
            .map((stmt) => stmt.toString().trim())
            .filter((stmt) => !stmt.startsWith('--'))
            .filter((stmt) => stmt.length > 0);

        for (let i = 1; i < statements.length; i++) {
            if (statements[i].toString().trim().toLowerCase() === 'end') {
                statements[i - 1] += ';end';
                statements.splice(i, 1);
            }
        }

        const json = JSON.stringify(statements);
        fs.writeFileSync(path.join(DIR, `${filename}.json`), json);
    } catch (e) {
        console.error(e);
    }
}

convert('schema.sql');
convert('data.sql');
convert('dropSchema.sql');
