/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/record'], 
/**
 * @param {record} record 
 */
function(record) {

    /*function pageInit(context) {
        
    }

    function saveRecord(context) {
        
    }

    function validateField(context) {
        
    }*/

    function fieldChanged(context) {
        
        var casef = context.currentRecord;

        if (context.fieldId == 'company'){
            
            var compan = casef.getValue('company');

            if (compan){
                casef.setValue('quicknote',compan);
            }
        }

    }

    /*function postSourcing(context) {
        
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
        /*pageInit: pageInit,
        saveRecord: saveRecord,
        validateField: validateField,*/
        fieldChanged: fieldChanged
        /*postSourcing: postSourcing,
        lineInit: lineInit,
        validateDelete: validateDelete,
        validateInsert: validateInsert,
        validateLine: validateLine,
        sublistChanged: sublistChanged*/
    }
});
