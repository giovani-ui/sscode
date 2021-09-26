/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
require(['N/search'], 
/**
 * @param {search} search
 */
function(search) {

        var ssSearchProPref = search.load({
            id: 'customsearch_sdr_prod_shortages',
            type: 'customrecord_sdr_prod_pref'
        });

        //10 results 0 to 9
        var resultSearchProdPref = ssSearchProPref.run().getRange({
            start: 0,
            end: 9
        });

        //for loop
        for(var i = 0; i< resultSearchProdPref.length; i++){
            var itemName = resultSearchProdPref[i].getValue({
                name : 'item'
            });
            
        
        //display
        log.debug('Result testing:'+itemName);
        }

});
