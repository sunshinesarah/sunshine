/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use-strict'

var path = require('canonical-path');
var Package = require('dgeni').Package;
var packagePath = __dirname;

module.exports = new Package('cma-docs', [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/nunjucks')
]).processor(require('./processors/index-page'))
    .processor(require('./processors/guide-data'))
    .processor(require('./processors/api-data'))

    .config(function(log,readFilesProcessor,writeFilesProcessor){
        log.level = 'info';
        readFilesProcessor.basePath = path.resolve(packagePath, '../..');
        readFilesProcessor.sourceFiles = [
            {include:'app/**/**/*.js', basePath: 'app'},
            {include: 'docs/content/**/*.md', basePath: 'docs/content', fileReader:'ngdocFileReader'}
        ];
        writeFilesProcessor.outputFolder = '.tmp/docs';
    })
    .config(function(templateFinder){
        templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
    })
    .config(function(computePathsProcessor, computeIdsProcessor){
        computeIdsProcessor.idTemplates.push({
            docTypes: ['content', 'indexPage'],
            getId: function(doc) {
                return doc.fileInfo.baseName;
            },
            getAliases: function(doc){
                return [doc.id];
            }
        });
        computePathsProcessor.pathTemplates.push({
            docTypes: ['content'],
            getPath: function(doc){
                var docPath = path.dirname(doc.fileInfo.relativePath);
                if(doc.fileInfo.baseName !== 'index'){
                    docPath = path.join(docPath, doc.fileInfo.baseName);
                }
                return docPath;
            },
            outputPathTemplate: 'partials/${path}.html'
        });
        computePathsProcessor.pathTemplates.push({
            docTypes: ['componentGroup'],
            pathTemplate: '${area}/${moduleName}/${groupType}',
            outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
        });
    });