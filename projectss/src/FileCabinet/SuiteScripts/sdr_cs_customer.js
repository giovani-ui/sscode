/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define([], function() {

    //function generates automatically
    function fieldChanged(context1) {
        //debugger;
        var customer = context1.currentRecord; //cs use currentRecord,ss use new record
        
        //getField, setfield = internal id of field
        if (context1.fieldId == 'custentity_sdr_apply_coupon'){
            var applyCoupon = customer.getValue('custentity_sdr_apply_coupon');
            //var couponCode = customer.getField({fieldId: 'custentity_sdr_coupon_code'});
            //var couponCode = customer.getValue('custentity_sdr_coupon_code'); KO

            //if (couponCode.isDisplay){  //check if value is empty
            if (applyCoupon == true){
                //var str1 = "EnablingCouponCode";
                //customer.setValue('custentity_sdr_coupon_code',str1);//2nd parameter should a var else bug
                var couponCode = customer.getField({fieldId: 'custentity_sdr_coupon_code'});
                couponCode.isDisabled = false;
            }

            if (applyCoupon == false){
                var str2 = "DisablingCouponCode";
                var strB = '';
                customer.setValue('custentity_sdr_coupon_code',strB);//2nd parameter should a var else bug
                var couponCode = customer.getField({fieldId: 'custentity_sdr_coupon_code'});
                couponCode.isDisabled = true;
            }


        }
    }


    function validateField(context2) {
        var customer = context2.currentRecord;

        if (context2.fieldId == 'custentity_sdr_coupon_code'){
            var couponCodeValidate = customer.getValue('custentity_sdr_coupon_code');

            if (couponCodeValidate.length > 5){
                alert('Invalid Coupon Code length. Please try again.');
                return false;
            }
        }
        
        return true;
    }

    

    /*function saveRecord(context3) {
        var customer = context3.currentRecord;

        //if (context3.fieldId == 'custentity_sdr_coupon_code'){

            var Validatecp = customer.getValue('custentity_sdr_coupon_code');
            //var Validatecp = customer.getField({fieldId: 'custentity_sdr_coupon_code'}); KO

            if (Validatecp.length > 5){
                alert('Save Record Failed. Invalid Coupon Code length.');
                return false;
            }
        //}
        
        return true;
    }*/




    return {
        validateField: validateField, //code works only when edit customers not when create new
        fieldChanged: fieldChanged, //code works only when edit customers not when create new
       // saveRecord: saveRecord //code works only when edit customers not when create new
    }
});
