/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/record'], 
/**
 * @param {record} Record 
 */

function(record) {

    function pageInit(context1) {
        var employee = context1.currentRecord;

        var perfRevCount = employee.getLineCount({    //recmach =record machine
            sublistId: 'recmachcustrecord_sdr_perf_subordinate'  //remac+sublistfield id
        });
        //alert('This employee has ' + perfRevCount + ' performnce reviews.');
        //possible errors when -1, 1st mispell id or check if sublist accessible via script
        //if its inline ediable then accessible else not

        /*var notes = 'This employee has ' + perfRevCount + ' performance reviews.\n';*/

        var fRatingCount = 0;
        for (var i=0; i < perfRevCount; i++) {
            var ratingCode = employee.getSublistValue({
                sublistId: 'recmachcustrecord_sdr_perf_subordinate', //the field id where it is parent record
                fieldId: 'custrecord_sdr_perf_rating_code',
                line : i
            });

            if (ratingCode == 'F'){
                fRatingCount +=1;
            }

        }
        /*notes += 'This employee has ' + fRatingCount + ' F-rated review.';
        alert(notes);*/
    }

    /*function saveRecord(context) {
        
    }

    function validateField(context) {
        
    }

    function fieldChanged(context) {
        
    }

    function postSourcing(context) {
        
    }*/

    function lineInit(context2) {   //trigger when click on button sublist
        var employee = context2.currentRecord;

        //if do action on this sublist do actions
        if (context2.sublistId == 'recmachcustrecord_sdr_perf_subordinate'){
            var reviewType = employee.getCurrentSublistValue({    //get the current point where the user is at at the sublist
                sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                fieldId: 'custrecord_sdr_perf_review_type'
            });

            //when click on new line review type sublist field is set to "2=no salary change"
            if (!reviewType){   //check if not empty
                employee.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId: 'custrecord_sdr_perf_review_type',
                    value: 2 //1=internal id or 'Salary Change' but need to use setCurrentSublistValue
                })
            }
        }
    }

    /*function validateDelete(context) {
        
    }

    function validateInsert(context) {
        
    }*/

    function validateLine(context3) {
        var employee = context3.currentRecord;

        if (context3.sublistId == 'recmachcustrecord_sdr_perf_subordinate'){
            var increaseAmount = employee.getCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                fieldId: 'custrecord_sdr_perf_sal_incr_amt',
                value: 1 //1=internal id or 'Salary Change' but need to use setCurrentSublistValue
            });


            if (increaseAmount > 5000){
                alert('Salary increase cannot be  greater than 5000');
                return false;
            }
        }

        return true;
    }

    /*function sublistChanged(context) {
        
    }*/

    return {
        pageInit: pageInit,
        /*saveRecord: saveRecord,
        validateField: validateField,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,*/
        lineInit: lineInit,  //reference to line on sublist ex. when use button add or cancel
        /*validateDelete: validateDelete,
        validateInsert: validateInsert,*/
        validateLine: validateLine
        /*sublistChanged: sublistChanged*/
    }
});
