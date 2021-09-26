/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/runtime','N/ui/dialog'], 
/**
 * @param {runtime} runtime
 * @param {dialog} dialog 
 */
function(runtime,dialog) {

    function saveRecord(context) {

        //access parameter values
        var paramValues = runtime.getCurrentScript().getParameter({
            name : 'custscript_sdr_save_record_type'
        });

        console.log('param: '+ paramValues);

        var msgTxt = 'Click Ok if you would like to submit your changes for this '+
        paramValues +' record. Click to continue editing.';

        //retrieve check box value
        var displayMsg = runtime.getCurrentScript().getParameter({
            name : 'custscript_sdr_save_confirmation'
        });


        //var boolrsult = confirm(msgTxt);
        var txt;

        console.log(displayMsg);
        

        if (!displayMsg) {
            console.log('falsess: '+boolrsult);
            return true;
        }

        if(displayMsg) {
            var boolrsult = confirm(msgTxt);
        if (boolrsult) {
            console.log('trueee: '+boolrsult);
            txt = "You pressed OK!";
            return true;    //return true in saverecord will save the transaction
          } else {
            txt = "You pressed Cancel!";
          }

          console.log('message: '+txt);

        }  
        

    }

    return {
        saveRecord: saveRecord
    }

});
