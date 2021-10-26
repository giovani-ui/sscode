/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record'], 
/**
 * @param {record} record
 */
function(record) {

    /*function beforeLoad(context) {
        
    }

    function beforeSubmit(context) {
        
    }*/

    function afterSubmit(context) {
        
        var so = context.newRecord; 
        var memo = so.getValue('memo');

        if (context.type == context.UserEventType.CREATE){

            var customer = record.create({
                type : record.Type.CUSTOMER,
                defaultValues :{    //it is a property
                    customform : 48  //calling standard phone call form internalID
                }
            });
            customer.setValue('companyname',memo);
            customer.setValue('subsidiary','Canada');
            customer.setValue('custentity_sdr_coupon_code', 'sales order hold');
            customer.save();
            log.debug(memo);

        }


    }

    return {
        //beforeLoad: beforeLoad,
        //beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
});
