/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define([], function() {

    return {
        afterSubmit: function(context1){
            //log.debug('Hello customer Aug');

            
                //module 3 exercise 2
                var customer = context1.newRecord;
                var customerID = customer.getValue('entityid');
                var customerEmail = customer.getValue('email'); //getText('email')
                var customerSalesRepName= customer.getValue('salesrep'); //getText('email')
                var couponCode = customer.getValue('custentity_sdr_coupon_code'); //getText('email')

                log.debug('Customer ID', customerID);
                log.debug('Customer Email', customerEmail);
                log.debug('Sales Person', customerSalesRepName);
                log.debug('Coupon Code', couponCode);

        }
    }
});
