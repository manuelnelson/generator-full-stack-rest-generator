'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    initializing() {
        this.destinationClientBasePath = 'src/client/';
        this.destinationServerBasePath = 'src/server/';
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
        this.camelCaseName = this._camelCaseName(this.props.modelName);
        this.modelObj = {
            modelName: this.props.modelName,
            camelModelName: this.camelCaseName,
            fileName: this._camelCaseToDash(this.camelCaseName)
        }
        //client files
        this.fs.copyTpl(
            this.templatePath('client/_model.model.ts'),
            this.destinationPath(this.destinationClientBasePath +'models/' + this.modelObj.fileName + '.model.ts'),
            this.modelObj
        )
        this.fs.copyTpl(
            this.templatePath('client/_model-resolver.service.ts'),
            this.destinationPath(this.destinationClientBasePath +'services/resolvers/' + this.modelObj.fileName + '-resolver.service.ts'),
            this.modelObj
        )
        this.fs.copyTpl(
            this.templatePath('client/_model.service.ts'),
            this.destinationPath(this.destinationClientBasePath +'services/' + this.modelObj.fileName + '.service.ts'),
            this.modelObj
        )
        //server files
        this.fs.copyTpl(
            this.templatePath('server/_model.js'),
            this.destinationPath(this.destinationServerBasePath +'models/' + this.modelObj.camelModelName + '.js'),
            this.modelObj
        )
        this.fs.copyTpl(
            this.templatePath('server/_model-controller.js'),
            this.destinationPath(this.destinationServerBasePath +'controllers/' + this.modelObj.fileName + '-controller.js'),
            this.modelObj
        )
        this.fs.copyTpl(
            this.templatePath('server/_model-routes.js'),
            this.destinationPath(this.destinationServerBasePath +'api/' + this.modelObj.fileName + '-routes.js'),
            this.modelObj
        )
    }
    _camelCaseName(myStr){
        return myStr.replace(/(^[A-Z])/, (g) => `${g[0].toLowerCase()}`);
    }
    _camelCaseToDash(myStr) {
        return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
    }

    install() {
        this.installDependencies();
    }
};
