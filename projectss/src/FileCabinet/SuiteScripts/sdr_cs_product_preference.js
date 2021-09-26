/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/record'], 
/**
 * @param {record} record 
 */
    function(record) {

    function pageInit(context1) {

        //declar customer
        var customer = context1.currentRecord;

        //getLineCount
        var productPref = customer.getLineCount({
            sublistId: 'recmachcustrecord_sdr_prod_pref_customer'
        });

        //storing total number of product preferences
        var totalnumProdPref = 'Total number of product preferences on this customer is '+ productPref +'.'; 
        alert(totalnumProdPref);

    }

    /*function saveRecord(context) {
        
    }*/

    function validateField(context3) {
        
        //use currentRecord for cs
        var customer = context3.currentRecord;

        //check context sublist
        if (context3.sublistId == 'recmachcustrecord_sdr_prod_pref_customer'){
            var preferredQty = customer.getCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_qty'
            });

            //check qty value
            if (preferredQty > 25){
                alert('The total preferred quantity across all the product preferences has exceeded'+
                ' the limit of 25.');
                return false;
            }

        }

        return true;

    }



    /*function postSourcing(context) {
        
    }*/


    function lineInit(context2) {
        
        //declar customer
        var customer = context2.currentRecord;

        //check if on sublist
        if (context2.sublistId == 'recmachcustrecord_sdr_prod_pref_customer'){

            var reviewType = customer.getCurrentSublistValue({    //get the current point where the user is at at the sublist
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_qty'
            });

            var qty = parseInt(reviewType);
            if (isNaN(qty)){ //Not a number
                customer.setCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_qty',
                value: 10
            });
            //since this is a client script no need to use save() function to save data
            //it is automatically save unliked user event script
            }



            /*customer.setCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_item',
                value: 332
            });


            customer.setCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_customer',
                value: 2076
            });*/


            /*customer.commitLine({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
            });


            customer.save(); */           

        }
    }

    /*function validateDelete(context) {
        
    }

    function validateInsert(context) {
        
    }

    function validateLine(context) {
        
    }

    function sublistChanged(context) {
        
    }*/

    return {
        pageInit: pageInit,
        //saveRecord: saveRecord,
        validateField: validateField,
        //fieldChanged: fieldChanged
        //postSourcing: postSourcing,
        lineInit: lineInit
        //validateDelete: validateDelete,
        //validateInsert: validateInsert,
        //validateLine: validateLine
        //sublistChanged: sublistChanged
    }
});
