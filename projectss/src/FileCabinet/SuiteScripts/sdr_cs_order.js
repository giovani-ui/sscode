/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/email','N/ui/dialog'], 
/**
 * @param {email} emailVar 
 * @param {dialog} dialogVar 
 */

function(emailVar, dialogVar) {

    function pageInit(context1) {
        var order = context1.currentRecord;
        var status = order.getText('orderstatus'); //internalid=orderstatus
        //promise execute while user still doing things

        if (context1.mode == 'edit' && status == 'Billed'){
            dialogVar.alert({   //dialog UI means a promise execute in separate thread
                title: 'Edit Warning',
                message: 'This order has already been billed'
            });


            //generated code with * needs to be replaced
            emailVar.send({     //email UI means a promise execute in separate thread
                author: -5, //default user
                body: 'Order' + order.getValue('tranid') + 'has been recently opened',
                recipients: -5, //email address of default user
                subject: 'User has edit a billed order'
            });

        }
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
