/**
 *@NApiVersion 2.0
 *@NScriptType MapReduceScript
 */
define(['N/search','N/runtime'], 
/**
 * @param {search} search
 * @param {runtime} runtime 
 */
function(search, runtime) {

    //get data that i need to process
    function getInputData() {
        

        //access parameter values module 10 exercise 3
        var paramValues = runtime.getCurrentScript().getParameter({
            name : 'custscript_customer_internalid' //customer internal id of script parameters
        });
        log.debug('customer internalid: '+paramValues);
        var convertedString = new String(paramValues);
        var converStr = convertedString.toString();
        log.debug('converted string: '+converStr);

        //create search
        var invSearch = search.create({
            type: search.Type.TRANSACTION,  //transaction type

            filters: [

                //search expression
                //['type', search.Operator.ANYOF, 'CustInvc'], 'and',
                //['mainline', search.Operator.IS, true],

                search.createFilter({ //1sr filter
                    name: 'type',
                    operator: search.Operator.ANYOF,
                    values: 'CustInvc'
                }),


                search.createFilter({ //1sr filter
                    name: 'mainline',
                    operator: search.Operator.IS,
                    values: true 
                }),

                search.createFilter({ //2nd filter
                    name: 'internalid',
                    join: 'customer',
                    operator: search.Operator.ANYOF,
                    values: converStr
                })
            ],
                //add columns
                columns: [
                    'entity',
                    'total'
            ],

            //add title etc
            title: 'Map reduce search invoice totals',
            id: 'mapreducsearch_invoicetol',
            isPublic: true
        });

        //return search
        return invSearch;

    }

    //does not give result but give a single element/one map one result
    //no need to use loop
    //map stage group key and value pairs
    function map(context) {
        
        //result will be returned as json string so need to parse it
        var searchResult = JSON.parse(context.value);

        //prepare grouping by getting value
        var customer = searchResult.values.entity.text; //key
        var total = searchResult.values.total; //value

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
                            'Total:    ' + total);

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
