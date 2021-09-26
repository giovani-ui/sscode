/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/record'], 
/**
 * @param {record} record 
 */

function(record) {

    function pageInit(context1) {
        /*nonpromiseCall(1536);   //test by creating a new SO/ will trigger when a page is load ex pageinit
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);
        nonpromiseCall(1536);*/
        
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        promiseCall(1536);
        
    }


    function nonpromiseCall(internalids){
        
        var objRecord = record.load({
            type: record.Type.SALES_ORDER,
            id: internalids //1536    //internal of the SO to be loaded
            //isDynamic: true,
        });
        
        var ponum = objRecord.getValue('otherrefnum');
        var docnum = objRecord.getValue('tranid');
        var custo = objRecord.getValue('entity'); //id
        var custo = objRecord.getValue('entityname'); //name check xml 
        var total = objRecord.getValue('total');

        log.debug({
            title: 'NON-PROMISE FUNCTION: Sales Order: ' + docnum,
            details: 'Customer: ' + custo + '. PO #: ' + ponum + '. Total: ' + total
        });
        console.log(docnum,total ,'NON-PROMISE FUNCTION');
    }




    function promiseCall(internalids){

        record.load.promise({
            type: record.Type.SALES_ORDER,
            id: internalids //1536
            //isDynamic: true,
        }).then(function(response){

        var ponum = response.getValue('otherrefnum');
        var docnum = response.getValue('tranid');
        var custo = response.getValue('entity'); //id
        var custo = response.getValue('entityname'); //name check xml 
        var total = response.getValue('total');

        log.debug({
            title: 'PROMISE FUNCTION: Sales Order: ' + docnum,
            details: 'Customer: ' + custo + '. PO #: ' + ponum + '. Total: ' + total
        });
        console.log(docnum,total ,'PROMISE FUNCTION');
            
        }, function(error){

        log.debug('Error loading Promise function');

        });
    }


    /*function saveRecord(context) {
        
    }

    function validateField(context) {
        
    }

    function fieldChanged(context) {
        
    }

    function postSourcing(context) {
        
    }

    function lineInit(context) {
        
    }

    function validateDelete(context) {
        
    }

    function validateInsert(context) {
        
    }

    function validateLine(context) {
        
    }

    function sublistChanged(context) {
        
    }*/

    return {
        pageInit: pageInit
        /*saveRecord: saveRecord,
        validateField: validateField,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        lineInit: lineInit,
        validateDelete: validateDelete,
        validateInsert: validateInsert,
        validateLine: validateLine,
        sublistChanged: sublistChanged*/
    }
});
