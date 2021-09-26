/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
 define(['N/search','N/record'], 
 /**
  * @param {search} search
  * @param {record} record 
  */
 function(search,record) {
 
 
     return {
         execute: function (context) {   //callback function
             
            //load saved search
             var createSearch = search.load({
                id : 'customsearch_sdr_prod_shortages',     //id of saved search
                type : 'customrecord_sdr_prod_pref'         //id of custom record
             });
    
             //set range
             var searchResult = createSearch.run().getRange({
                 start : 0,  //first result
                 end   : 9   //number of result to be displayed
             });
     
             //loop to retrieve value
             for(var i = 0; i < searchResult.length; i++){
                
                 //retrieve customer value
                var cus = searchResult[i].getText('custrecord_sdr_prod_pref_customer');

                //retrieve customers email
                var custEmail = searchResult[i].getValue({
                    name : 'email',
                    join : 'custrecord_sdr_prod_pref_customer'
                });

                //retrieve customer subsidiary
                var custSubsi = searchResult[i].getText({
                    name : 'subsidiary',
                    join : 'custrecord_sdr_prod_pref_customer'
                });

                //retrieve item
                var itemName = searchResult[i].getText('custrecord_sdr_prod_pref_item');

                //retrieve preferrred qty
                var preferredQtyProdPref = searchResult[i].getValue('custrecord_sdr_prod_pref_qty');

                //retrieve available from item record
                var itemAvaila = searchResult[i].getValue({
                    name : 'quantityavailable',
                    join : 'custrecord_sdr_prod_pref_item'
                }); 


                //convert to int
                var itemAvailableInt = parseInt(itemAvaila,10);
                var prefQtyInt = parseInt(preferredQtyProdPref,10);

                //display results
                //import to insert a comma after first string so that it refers to title
                //then after the comma, all the details will be inserted into Details
                log.debug('Saved Search Result Info - Product Shortages:','Customer: ' + cus + '\n' +
                        'Customer email: ' + custEmail + '\n' +
                        'Customer subsidiary: ' + custSubsi + '\n' +
                        'Item: ' + itemName + '\n' +
                        'Preferred Quantity: ' + preferredQtyProdPref +'\('+ prefQtyInt +'\)'+'\n' +
                        'Qty Item Available: ' + itemAvaila +'\('+ itemAvailableInt +'\)'+ '\n');


                //check if available qty is less than preferred qty
                if (itemAvailableInt < prefQtyInt){

                    //create support case record
                    var supportRecord = record.create({
                        type: record.Type.SUPPORT_CASE,
                        defaultValues: {
                            customform  : 51    //custom form internal id
                        }
                    });

                    //set values subject
                    supportRecord.setText('title','Item Low for Customer');

                    //set values company
                    supportRecord.setText('company',cus);

                    //set values message
                    supportRecord.setText('incomingmessage','This company prefers '+
                    'to purchase ('+ preferredQtyProdPref + ') (' + itemName + ') each time they' +
                    ' create a sales order, but only (' + itemAvaila + ') are left in stock.');

                    //save record
                    supportRecord.save();

                }   //end ifstatement qty
    
             }  //end loop

             

 
         }
 
 
     }
 
 
 });
 