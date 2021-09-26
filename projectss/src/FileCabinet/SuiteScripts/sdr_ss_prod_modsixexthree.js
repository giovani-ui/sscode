/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
require(['N/search'], 
/**
 * @param {search} search 
 */
function(search) {

    //function execute(context) {
        
        //create search
        var createSearch = search.create({
            type: 'customrecord_sdr_prod_pref',

            //create filters
            filters: [
                //add filter 1 - preferred qty >2
                search.createFilter({
                    name: 'custrecord_sdr_prod_pref_qty',
                    operator: search.Operator.GREATERTHAN,
                    values: 2
                }),

                //add filter 2 - customer's subsidiary is HQ>Americas>USWest
                search.createFilter({
                    name: 'subsidiary',
                    join: 'custrecord_sdr_prod_pref_customer',  //donot use customer since using custom record
                    //always check scriptrecord browser if not exist always used id on custom record
                    //which acts as a sublist or a link or a join ex. customer field created on customer record
                    operator: search.Operator.IS,
                    values: 1
                })
            ],

            //filterExpression: Object[],

            //add columns
            columns: [
                //add column 1 - show customer
                search.createColumn({
                    name: 'custrecord_sdr_prod_pref_customer' //donot use customer since using custom record
                }),

                //add column 2 - customer's email
                search.createColumn({
                    name: 'email',
                    join: 'custrecord_sdr_prod_pref_customer'
                }),

                //add column 3 - customers subsidiary
                search.createColumn({
                    name: 'subsidiary',
                    join: 'custrecord_sdr_prod_pref_customer' //donot use customer since using custom record
                }),

                //add column 4 - item
                search.createColumn({
                    name: 'custrecord_sdr_prod_pref_item'
                }),

                //add column 5 - preferred qty
                search.createColumn({
                    name: 'custrecord_sdr_prod_pref_qty'
                }),

                //add column 6 - available from item record
                search.createColumn({
                    name: 'quantityavailable',
                    join: 'custrecord_sdr_prod_pref_item', //do not use item since item does not exist in customrecord
                    //so use the field created as field in custom record
                })
            ],

            title: 'Module 7 exercises 03',
            id: 'sdr_ss_searchscript',
            isPublic: true
        });


        //run saved search/run search is an array since getRange
        var runSearch = createSearch.run().getRange({
            start : 0,
            end   : 9
        });


        //create loop to display values
        for(var i = 0; i < runSearch.length; i++){

            //retrieve customer value
            var cus = runSearch[i].getText('custrecord_sdr_prod_pref_customer');

            //retrieve customers email
            var custEmail = runSearch[i].getValue({
                name : 'email',
                join : 'custrecord_sdr_prod_pref_customer'
            });

            //retrieve customer subsidiary
            var custSubsi = runSearch[i].getText({
                name : 'subsidiary',
                join : 'custrecord_sdr_prod_pref_customer'
            });

            //retrieve item
            var itemName = runSearch[i].getText('custrecord_sdr_prod_pref_item');

            //retrieve preferrred qty
            var preferredQtyProdPref = runSearch[i].getValue('custrecord_sdr_prod_pref_qty');

            //retrieve available from item record
            var itemAvaila = runSearch[i].getValue({
                name : 'quantityavailable',
                join : 'custrecord_sdr_prod_pref_item'
            }); 

            //display results
            log.debug('Customer: ' + cus + '\n' +
                      'Customer email: ' + custEmail + '\n' +
                      'Customer subsidiary: ' + custSubsi + '\n' +
                      'Item: ' + itemName + '\n' +
                      'Preferred Quantity: ' + preferredQtyProdPref + '\n' +
                      'Qty Item Available: ' + itemAvaila + '\n');
        //}

    }

    //return {
    //    execute: execute
    //}
});
