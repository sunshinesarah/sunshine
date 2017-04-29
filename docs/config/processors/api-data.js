/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

var _ = require('lodash');

function buildDocData(doc, extraData){
    var splitName = doc.name.split('.');
    doc.stateName = _.camelCase(splitName);
    return _.assign({
        name: doc.name,
        stateName: doc.stateName,
        type: doc.docType,
        outputPath: doc.outpathPath,
        url: doc.path
    }, extraData);
}

module.exports = function apiPagesProcessor(moduleMap){
    return {
        $runAfter: ['paths-computed'],
        $runBefore: ['rendering-docs'],
        $process: process
    };

    function process(docs){
        var apiPages = _(docs)
            .filter(function(doc){
                return doc.docType !== 'componentGroup' && !(/^guide/.test(doc.module));
            }).filter('module').groupBy('module')
            .map(function(moduleDocs, moduleName){
                var moduleDoc = _.find(docs,{
                    docType:'module',
                    name: moduleName
                });
                if(!moduleDoc) return;
                return buildDocData(moduleDoc, {
                    docs: moduleDocs
                        .filter(function(doc){
                            return doc.docType !== 'module';
                        })
                        .map(buildDocData)
                });
            }).filter().value();
        docs.push({
            name: 'API_DATA',
            template: 'constant-data.template.js',
            outputPath: 'src/api-data.js',
            items: apiPages
        });
    }
};
