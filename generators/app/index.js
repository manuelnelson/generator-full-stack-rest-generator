'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    initializing() {
        this.destingationClientBasePath = 'src/client/';
        this.destingationServerBasePath = 'src/server/';
    }
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('generator-full-stack-rest-generator') + ' generator!'
        ));

        const prompts = [{
            type: 'input',
            name: 'modelName',
            message: 'What is the name of your model?'
        }];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('client/_model.model.ts'),
            this.destinationPath(destingationClientBasePath +'models/' + this.props.modelName + '.model.ts'),
            {
                modelName: this.props.modelName
            }
        )
    }

    install() {
        this.installDependencies();
    }
};
