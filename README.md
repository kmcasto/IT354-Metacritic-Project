IT 354 Project - Metacritic Picker
==================================

Completed for the Group Project Assignment of IT 354, by Alex Shaw and Kevin Castor.

This particular web application (Developed using MEAN) allows users to find video games they might enjoy by browsing whichever titles are available for any systems they have, and then selecting them based on the accumulative score given to each game by critics.

## Setup ##

The following development tools are required in order to build and execute this project from it's source code form:
* Node.js
* NPM

In addition, an active internet connection is required.

As long as those requirements are meet, any other dependencies will be automatically downloaded from the internet.

## Building ##

After cloning the repository from GitHub, and opening a Terminal/Command Prompt in the project directory, execute the following commands to build and test-run our project:

```shell
$ npm install
$ grunt
$ grunt run
```

If everything went okay, the server should now be running. The server will print out which URL to open, so open it in your web-browser to try it for yourself! 

Happy Gaming!!!

### Switching from GruntJS to GulpJS ###

At some time in the future, this project shall be switching from using [GruntJS] to [GulpJS]. The impact this will have on non-developers is very minimal. Simply use `gulp` in place of wherever the `grunt` command was used. So building/running will now look like:

```shell
$ npm install
$ gulp
$ gulp run
```

[GulpJS] is the preferred build solution, because it emphasizes code-over-configuration, whereas [GruntJS] instead places it's emphasis on configuration-over-code. Grunt depends very heavily on pre-built plugins, and does not give developers much control over their builds. Gulp is based around pipes: Take some input, pass it through one or more pipes, and output the result at a destination. This design even allows it to run several tasks and operations in parallel, at the same time. This dramatically decreases build time, and is just more pleasant to work with for developers in general.

