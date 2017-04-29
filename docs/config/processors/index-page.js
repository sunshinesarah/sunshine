/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

module.exports = function indexPageProcessor() {
    return {
        $runAfter: ['adding-extra-docs'],
        $runBefore: ['extra-docs-added'],
        $process: process
    };

    function process(docs){
        docs.push({
            docType: 'indexPage',
            template: 'indexPage.template.html',
            outputPath: 'index.html',
            path: 'index.html',
            id: 'index'
        })
    }
};
