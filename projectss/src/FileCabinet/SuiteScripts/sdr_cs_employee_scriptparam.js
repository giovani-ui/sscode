/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
 define(['N/runtime'], 
 /**
  * @param {runtime} runtime 
  */
 function(runtime) {


    function pageInit(context) {

        var employee = context.currentRecord;

        //values on employee record
        var empCode = employee.getValue('custentity_sdr_employee_code');

        if(!empCode){ //if not true=false=if empty

            //get referrence to the current script if schedule then schedule
            //if client then client
            //access script parameters values
            var defaultEmpCode = runtime.getCurrentScript().getParameter({
                name : 'custscript_sdr_default_emp_code'   //value of id we want
            });

            employee.setValue('custentity_sdr_employee_code',defaultEmpCode);

        }

    }



    //save record function needs to return boolean
    /*function saveRecord(context2) {
        var employee = context2.currentRecord;

        var empCode = employee.getValue('custentity_sdr_employee_code');

        if (empCode == 'x'){
            alert('Invalide Employee Code value. Please try again.');
            return false;
        }
        return true;
    }*/

    //when move away from a field
    /*function validateField(context3) {
        var employee = context3.currentRecord;

        if (context3.fieldId == 'custentity_sdr_employee_code'){
            var empCode = employee.getValue('custentity_sdr_employee_code');

            if (empCode == 'x'){
                alert('Invalide Employee Code value. Please try again.');
                return false;
            }
        }
        
        return true;
    }*/

    //function generates automatically
    /*function fieldChanged(context1) {
        var employee = context1.currentRecord; //cs use currentRecord,ss use new record
        
        //getField, setfield = internal id of field
        if (context1.fieldId == 'phone'){
            var fax = employee.getValue('fax');

            if (!fax){  //check if value is empty
                var phone = employee.getValue('phone');
                employee.setValue('fax',phone);
            }
        }
    }*/
    
/*
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
        //saveRecord: saveRecord,
        //validateField: validateField,
        //fieldChanged: fieldChanged
        //postSourcing: postSourcing,
        //lineInit: lineInit,
        //validateDelete: validateDelete,
        //validateInsert: validateInsert,
        //validateLine: validateLine,
        //sublistChanged: sublistChanged
    }
});
