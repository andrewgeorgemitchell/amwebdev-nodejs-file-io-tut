const fs = require('fs');

const csvToObject = (csvString) => {
  const splitByLineEndingAndCommas = csvString
    .split('\n') // splits the string by new line so we end of with an array where each line is now on its own
    .map((lineString) => lineString.split(',')); // Split each line by , so that each value is on its own

  // We end up with this:
  // [
  //   [ 'name', ' age', ' favAnimal' ],
  //   [ 'Eli Miller', ' 24', ' Dog' ],
  //   [ 'John Smith', ' 35', ' Tiger' ],
  //   [ 'Betsy Blue', ' 19', ' Warthog' ],
  //   [ 'Justin Long', ' 15', ' Cat' ]
  // ]

  // Create a header row for reference
  const headerRow = splitByLineEndingAndCommas[0];
  // Create our array of user objects
  const users = [];
  // Loop over the lines skipping the first header row because it doesn't represent a user
  for (let i = 1; i < splitByLineEndingAndCommas.length; i += 1) {
    // Create the blank object for the current user
    const newUser = {};
    // Create a reference variable to the current line array
    const line = splitByLineEndingAndCommas[i];
    // Loop over the headers row
    for (let b = 0; b < headerRow.length; b++) {
      const headerKey = headerRow[b];
      // Assign the key value pair for each header
      newUser[headerKey] = line[b];
    }
    // Push the finished user to the users array
    users.push(newUser);
  }

  return users;
}

const filepath = `${__dirname}/data/users.csv`;

// Asynchronous Function: Read file
fs.readFile(filepath, (error, file) => {
  // If there is an error deal with it
  if (error) {
    throw error;
  }
  // If there isn't an error do what I wanted
  const fileStringData = file.toString();
  const users = csvToObject(fileStringData);
  // Do something with users
});