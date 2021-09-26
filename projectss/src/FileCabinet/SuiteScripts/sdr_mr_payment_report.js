/**
 *@NApiVersion 2.0
 *@NScriptType MapReduceScript
 */
 define(['N/search'], 
 /**
  * @param {search} search 
  */
 function(search) {
 
     //get data that i need to process
     function getInputData() {
         
         //return and load search
         return {
             type : 'search',    //search.Type.TRANSACTION,
             id : 177   //id=customsearch_sdr_payments, internalid=177
         };
 
     }
 
     //does not give result but give a single element/one map one result
     //no need to use loop
     //map stage group key and value pairs
     function map(context) {
         
         //result will be returned as json string so need to parse it
         var searchResult = JSON.parse(context.value);
 
         //prepare grouping by getting value
         //always look for ex. on record browser look for SEARCH FILTERS
         //entity=name(internalid), amountpaid or amount(ok total tallies zone catering 234,562)
         var customer = searchResult.values.entity.text; //key/entity=name
         var total = searchResult.values.amount; //value
 
         //grouping
         context.write({
             key : customer,
             value : total
         });
 
 
     }
 
 
     function reduce(context) {
 
         var total = 0;
 
         //loop to get total per customer
         for(var i in context.values){
             total += parseFloat(context.values[i]);
         }
 
         log.debug('Totals', 'Customer: ' + context.key + '\n' +
                             'Total Amount Paid:    ' + total);
 
     }
 
 
     //error handling or reporting
     function summarize(summary) {
 
         log.audit('Number of queues',summary.concurrency);
 
         log.error('Input error',summary.inputSummary.error);
 
         /*summary.mapSummary.errors.iterators().each(function (code, message){
             log.error('Map error' + code, message);
             return true;
         });
 
         summary.reduceSummary.errors.iterators().each(function (code, message){
             log.error('Reduce error' + code, message);
             return true;
         });*/
 
     }
 
 
     return {
         getInputData: getInputData,
         map: map,
         reduce: reduce,
         summarize: summarize
     }
 });
 