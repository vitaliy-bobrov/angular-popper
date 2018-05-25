const fs = require('fs');

fs.createReadStream('./README.md').pipe(fs.createWriteStream('./projects/angular-popper/README.md'));
