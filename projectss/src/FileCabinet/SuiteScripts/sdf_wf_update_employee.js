/**
 *@NApiVersion 2.x
 *@NScriptType WorkflowActionScript
 */
define(['N/record','N/runtime'], 
/**
 * @param {record} record 
 * @param {runtime} runtime 
 */

//use runtime when pass values from 1 script type to another
//the value is inserted in the current record not on the new record created
//will trigger when create new record
//error -1 means mispelled field id

function(record,runtime) {

    function onAction(context) {
        
        //from workflow to script
        //get script parameter from workflow
        var workflowTotal = runtime.getCurrentScript().getParameter({
            name : 'custscript_sdr_workflow_total'  //id of script parameter
        });

        //get copy of expense report
        var expRep = context.newRecord; //userventscript

        //get number of lines
        var expenseCount = expRep.getLineCount({
            sublistId: 'expense'
        });

        //get employee id
        var employeeId = expRep.getValue({
            fieldId: 'entity'
        });

        //displaying value
        var notes = 'workflow total : ' + workflowTotal + '\n' +
        'Expense count : ' + expenseCount;

        //load employee record
        var employee = record.load({
            type : record.Type.EMPLOYEE,
            id : employeeId
        });

        //set value for notes, id notes=comments
        employee.setValue('comments',notes)

        //save record
        //employee.save();    //when used it will return the internalid of the record that i have used

        employeeId  = employee.save();

        //push value from script to workflow
        //if employeeId is not true = false = empty
        if (!employeeId){
            return 'failed';
        }
        return 'success';

        //to return value from script to workflow
        //on script>parameter>return type
        //return type = free form text
        //then workflow expecting return a value
        //ex. script parameter attache to a script, workflow field attach to a workflow
        //storing value in workflow field update status

        //the record the record saved so need to need workflow history
        //go to record is the new record not the current record
        

    }



    return {
        onAction: onAction
    }
});
