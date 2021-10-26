/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/redirect','N/record'], 
/**
 * @param {redirect} redirect 
 * @param {record} record 
 */
function(redirect, record) {

    /*function beforeLoad(context) {
        
    }*/

    /*function beforeSubmit(context) {
        
    }*/

    function afterSubmit(context) {
        
        //1 get a copy of sales order
        var so = context.newRecord;

        //var soid = so.getValue('tranid');

        //2 get sales info ex. order£
        redirect.toSuitelet({
            scriptId: 'customscript_sdr_sl_salesorder_finance', //suitelet script
            deploymentId: 'customdeploy_sdr_sl_salesorder_finance', //suitelet script
            parameters: {
                //sdr_orderno : so.getValue('tranid'),  //sdr_orderno newly created variable
                sdr_orderno : so.id,    //get internal id of newly created SO
                sdr_customer : so.getValue('entity'),  //sdr_orderno newly created variable
                sdr_total : so.getValue('total'),  //sdr_orderno newly created variable

            }
            
        });
        log.debug('internalid: ', so.id);

    }

    return {
        //beforeLoad: beforeLoad,
        //beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
});
