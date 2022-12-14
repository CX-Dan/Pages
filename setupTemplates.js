const fs = require('fs');
const path = require('path');
const { STAGE } = process.env
const OUT_FILE_PATH = path.join(__dirname, '/public/');

const configurations = {
  local: {
    baseUrl: 'https://cx-dan.github.io/Pages',
    assetsUrl: 'https://cx-dan.github.io/Pages/static/assets',
    introUrl: "https://pmrt.dev.transportinsights.nz/Home/HelpLink/new-to"

  },
  dev: {
    baseUrl: 'https://portal.dev.transportinsights.nz',
    assetsUrl: "https://portal.dev.transportinsights.nz/static",
    introUrl: "https://pmrt.dev.transportinsights.nz/Home/HelpLink/new-to"

  },
  b2c: {
    baseUrl: 'https://portal.b2c.transportinsights.nz',
    assetsUrl: "https://portal.b2c.transportinsights.nz/static",
    introUrl: "https://pmrt.b2c.transportinsights.nz/Home/HelpLink/new-to"
  },
  prod: {
    baseUrl: 'https://portal.transportinsights.nz',
    assetsUrl: "https://portal.transportinsights.nz/static",
    introUrl: "https://pmrt.transportinsights.nz/Home/HelpLink/new-to"
  },
}

function replaceVariables(replacements, templateContents) { 
    const  { htmlBody } = Object.keys(replacements).reduce((accumulator, key) => ({
      htmlBody: accumulator.htmlBody.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]),
    }), { htmlBody: templateContents.toString() });
    return htmlBody;
}

function main() {  
  const templatesFolder = path.join(__dirname, '/templates');
  
  fs.readdir(templatesFolder, (err, files) => {
    if (err) {
      return console.error(err);
    }
  
    for (const file of files) {
      const filePath = path.join(templatesFolder, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return console.error(err);
        }

        fs.writeFile(path.join(OUT_FILE_PATH, file), replaceVariables(configurations[STAGE], data), (err) => {
          if (err) {
            return console.error(err);
          }
        } )
      });
    }
  });
  
}

main();