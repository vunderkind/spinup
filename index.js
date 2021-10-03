#! /usr/bin/env node

const { Command } = require("commander");
const cli = new Command();
const { spawn, exec } = require("child_process");
const process = require('process');
cli.version('0.0.1');
const chalk = require("chalk");

cli.description(chalk.yellow('Automation of recurrent CLI commands Node/JS\ndevelopers consistently have to use.'));
cli.name('spinup');
cli.usage('<command> [options]');
cli.addHelpCommand(false);

cli
    .command('repo')
    .description(
        chalk.green('Spin up a new repository, cd into folder, and (optionally) run an npm init'
    ))
    .argument('<url>', 'URL of the repo you\'d like to clone')
    .argument('<folder_name>', 'Name of folder you\'d like to rename the git folder into')
    .argument('[init]', 'Run npm init after cloning')
    .action((url, folderName, init) => {
        const callback = (err, stdout, stderr) => {
            if (err) {
                console.log(chalk.red(err.message));
            }
            console.log(stdout);
            
            console.log(stderr);
        };

        if (folderName && init=='y') {
            spawn('git', ['clone', url, folderName], { stdio: 'inherit' }, callback)
                .on('exit', (code) => {
                    if (code === 0) {
                        console.log(chalk.green(`Successfully cloned ${url}`));
                    }
                    process.chdir(`./${folderName}`);
                    console.log(chalk.green(`Successfully cd into ${folderName}`));
                            spawn('npm', ['init', '-y'], { stdio: 'inherit' }, callback)
                            .on('exit', () => {
                                console.log(chalk.green('Node modules installed. \nHappy coding!'));
                                return;
                            });
                        })
        }
        if (folderName && init!=='y') {
            spawn('git', ['clone', url, folderName], { stdio: 'inherit' }, callback)
                .on('exit', (code) => {
                    if (code === 0) {
                        console.log(chalk.green(`Successfully cloned ${url}`));
                    }
                    try {
                        console.log(process.cwd())
                        process.chdir(`./${folderName}`);
                        console.log(process.cwd());
                    } catch {
                        console.error('hahahaha');
                    }
                    console.log(chalk.green(`Successfully cd into ${folderName}`));
                                console.log(chalk.green(`Happy coding!`));
                                return;
                            });
        }
    })

    cli.parse(process.argv);