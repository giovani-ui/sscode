/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
define(['N/search'], //search module
/**
 * @param {search} searchVar
 */
    function(searchVar) {   //schedule script

    function execute(context1) {
        
        //grab the search from netsuite
        var caseSearch = searchVar.load({
            id: 'customsearch_sdr_escalated_searches'   // id of ss
        });


        //display result
        //2 functions or search rsults. page range=set of result= max 1000 results=obtain set of results
        //result set=loops all of the results=used to loop through all the results. need to use each to        
        //use run method and getRange method
        var searchResult = caseSearch.run().getRange({
            start : 0,  //first result
            end   : 9   //number of result to be displayed
        });


    }

    return {
        execute: execute
    }
});
