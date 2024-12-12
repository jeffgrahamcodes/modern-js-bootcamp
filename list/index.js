#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
// const util = require("util");

//Method 2
// const lstat = util.promisify(fs.stat);

// Method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
    // throw new Error(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.red(filenames[index]));
    }
  }
});

// Method 1
// const lstat = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(file, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
