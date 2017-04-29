/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

var _ = require('lodash');

function buildDocData(doc, extraData){
    return _.assign({
        name: doc.title,
        stateName: doc.title,
        type: doc.docType,
        title: doc.title,
        outputPath: doc.outputPath,
        url: doc.path
    }, extraData);
}

module.exports = function guidePagesProcessor(moduleMap){
    return {
        $runAfter: ['paths-computed'],
        $runBefore: ['rendering-docs'],
        $process: process
    };

    function process(docs){
        var guides = _(docs)
            .filter('module')
            .groupBy('module')
            .map(function(moduleDocs,moduleName){
                var moduleDoc = _.find(docs, {
                    docType: 'module',
                    name: moduleName
                });
                if(!moduleDoc) return;
                return buildDocData(moduleDoc, {
                    docs: moduleDocs
                        .filter(function(doc){
                            return doc.docType !== 'module';
                        }).map(buildDocData)
                });
            }).filter().value();
        docs.push({
            name:'GUIDE_DATA',
            template: 'constant-data.template.js',
            outputPath: 'src/guide-data.js',
            items: guides
        });
    }
};