/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/redirect','N/record'], 
/**
 * @param {serverWidget} serverWidget 
 * @param {redirect} redirect 
 * @param {record} record 
 */
function(serverWidget, redirect, record) {

    function onRequest(context) {
        

        //4 get request
        var request = context.request;
        var response = context.response;

        


//otherwise if click continue result will be undefined
if (request.method == 'GET'){ //GET request from url


        //6 extract values from ue sdr_ue_order
        //parameters=reserved word,sdr_orderno from ue
        var ordernum = request.parameters.sdr_orderno; //becoz not retrieving orderno from ue
        //var ordernum = context.newRecord;   //test
        var customer = request.parameters.sdr_customer;
        var total = request.parameters.sdr_total;




        //1 create form
        var form = serverWidget.createForm({
            title: 'Sales Order Financing',
            hideNavBar: false
        });


        //2 add fields to form
        var nameFid = form.addField({
            id: 'custpage_sdr_financing_help',
            label: 'Please assign a price to the financing of this sales order, then click Submit'
            + ' Financing',
            type: serverWidget.FieldType.HELP
        });


        //7 add new fields OrderNum
        var sonumFid = form.addField({
            id: 'custpage_sdr_sonumber',
            label: 'Order #: ',
            type: serverWidget.FieldType.TEXT
        });
        var customerFid = form.addField({
            id: 'custpage_sdr_customer',
            label: 'Customer: ',
            type: serverWidget.FieldType.TEXT
        });
        var totalFid = form.addField({
            id: 'custpage_sdr_sototal',
            label: 'Total: ',
            type: serverWidget.FieldType.CURRENCY
        });




        //3 add submit button
        form.addSubmitButton({
            label: 'Save Finance Info'
        });



        //8 posting values
        sonumFid.defaultValue = ordernum;   //get order number after load so//TESTING!!!!!!
        customerFid.defaultValue = customer;
        totalFid.defaultValue = total;





        //11




        //9 change display type for name field
        sonumFid.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE   //enum value
        });
        customerFid.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE   //enum value
        });
        totalFid.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE   //enum value
        });


        //5
        response.writePage(form);



    }   else {  //if POST, POST from form

        

    }//end else

    }

    return {
        onRequest: onRequest
    }
});
