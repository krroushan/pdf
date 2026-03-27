# Generate Final Report PDF

Run this command from the project folder:

`npm run pdf`

This generates `report.pdf` from `index.html` using Puppeteer with reliable page numbering in the format:

`Page X of Y`

Optional custom input/output:

`node generate-pdf.js input.html output.pdf`

Invoice quick command:

`npm run pdf:invoice`
