/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {

    function onRequest(context) {
        try {
            log.debug({
                title: 'title test2',
                details: 'detail test2'
            })
        } catch (error) {
            
        }


    }

    return {
        onRequest: onRequest
    }
});
