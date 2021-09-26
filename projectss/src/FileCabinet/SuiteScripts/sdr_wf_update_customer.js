/**
 *@NApiVersion 2.x
 *@NScriptType WorkflowActionScript
 */
define(['N/record','N/runtime'], 
/**
 * @param {record} record 
 * @param {runtime} runtime 
 */
function(record, runtime) {

    function onAction(context) {
        
        //get script parameter
        var getOrderDate = runtime.getCurrentScript().getParameter({
            name : 'custscript_sdr_order_date'
        });

        //get so record object from entry point's context object
        var getSO = context.newRecord;

        //num of line items in sublist items
        var soLineItems = getSO.getLineCount({
            sublistId : 'item'
        });


        //displaying value
        var notes = 'Last Order Date : ' + getOrderDate + '\n' +
        'Unique Items Ordered : ' + soLineItems;


        //get customer id
        var  customerId = getSO.getValue({
            fieldId: 'entity'
        });


        //load customer record
        var customer = record.load({
            type : record.Type.CUSTOMER,
            id : customerId
        });


        //set value for notes, id notes=comments
        customer.setValue('comments',notes)

        //save record
        //customer.save();

        //get boolean result
        customerId  = customer.save();

        //display failed or success
        if (!customerId){
            return 'failed';
        }
        return 'success';

    }

    return {
        onAction: onAction
    }
});
