const fs = require('fs');
const path = require('path');

// Read the instructions file
const instructions = fs.readFileSync(
  path.join(__dirname, '../public/.well-known/instructions.txt'),
  'utf8'
);

// Process the instructions:
// 1. Replace newlines with double space + \n
const processedInstructions = instructions.replace(/\n/g, '  \n');

// Read the ai-plugin.json file
const pluginJson = fs.readFileSync(
  path.join(__dirname, '../public/.well-known/ai-plugin.template.json'),
  'utf8'
);

// Replace the ${INSTRUCTIONS} placeholder with processed instructions
const updatedPluginJson = pluginJson.replace(
  '"${INSTRUCTIONS}"',
  JSON.stringify(processedInstructions)
);

// Write the updated ai-plugin.json
fs.writeFileSync(
  path.join(__dirname, '../public/.well-known/ai-plugin.json'),
  updatedPluginJson
); 