/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/record','N/redirect'], 
/**
 * @param {serverWidget} serverWidget
 * @param {record} record
 * @param {redirect} redirect   
 */
function(serverWidget, record, redirect) {

    function onRequest(context) {

        //get request and response
        var request = context.request;
        var response = context.response;


        //otherwise if click continue result will be undefined
        if (request.method == 'GET'){ //GET request from url

            //after get method and query string obtain on url now need to post info on form
        //parameters = sdr_ue_employee line 100
        var name = request.parameters.sdr_name;
        var notes = request.parameters.sdr_notes;
        var empid = request.parameters.sdr_empid;
        
        //create form
        var form = serverWidget.createForm({
            title: 'Update Employee notes',
            hideNavBar: false
        });


        //adding new fields
        var nameFId = form.addField({
            id: 'custpage_sdr_emp_name',
            label: 'Name',
            type: serverWidget.FieldType.TEXT,
        });


        //adding new fields
        var notesFId = form.addField({
            id: 'custpage_sdr_emp_notes',
            label: 'Notes',
            type: serverWidget.FieldType.TEXTAREA,
        });
        
        
        //adding new fields
        var empFId = form.addField({
            id: 'custpage_sdr_emp_id',
            label: 'Emp Id',
            type: serverWidget.FieldType.TEXT,
        });


        //display submit button
        //colorful button are submit button and take all info and submit all data
        //regular button , need to add function
        form.addSubmitButton({
            label: 'Continue'
        });


        //posting the values
        nameFId.defaultValue = name;
        notesFId.defaultValue = notes;
        empFId.defaultValue = empid;


        //to add page to specific path(script deployment), on script go to link and select

        //change display type for name field
        nameFId.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE   //enum value
        });


        //change display type for emp field
        empFId.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN   //enum value
        });

        //send info
        response.writePage(form);

        }   else {  //if POST, POST from form

            //no local variable no global js will still read it even if outside statement
            empid = request.parameters.custpage_sdr_emp_id;
            notes = request.parameters.custpage_sdr_emp_notes;

            var employee = record.load({
                type : record.Type.EMPLOYEE,
                id  : empid
            });

            employee.setValue('comments',notes);
            employee.save();

            redirect.toRecord({
                type : record.Type.EMPLOYEE,
                id  : empid
            });

        }



    }

    return {
        onRequest: onRequest
    }
});
