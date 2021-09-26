/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 */
 define(['N/record','N/email','N/runtime','N/task'], 
 /**
  * @param {record} recordVar
  * @param {email} emailVar
  * @param {runtime} runtimeVar
  * @param {task} task   
  */
 function(recordVar, emailVar, runtimeVar, task) {

 /*function beforeLoad(context) {
     
 }*/


 //module 6 exercise 3
 function beforeSubmit(context2) {   //start beforeSubmit
     
     //ue newRecord
     var customer = context2.newRecord;

     //execute only when create
     if (context2.type == context2.UserEventType.CREATE){

         //get salesrep value from customer record
         var salesRepre = customer.getValue('salesrep');

         //check if salesrep is empty
         if(!salesRepre){
             //throw = illustrates how to raise a non user-facing error:
             //error is displayed as a notice(suite script error)
             throw 'Save failed. Please make sure that the sales rep field is not empty.' ;
         }
     }

 }   //end beforeSubmit



 function afterSubmit(context1) {    //startafterSubmit
     
     var customer = context1.newRecord;   //user event =newRecord
     var getUser = runtimeVar.getCurrentUser().id;
     
     //execute only when create customer
     if (context1.type == context1.UserEventType.CREATE){    //start create task
         var companyCus = customer.getValue('companyname');
         var salesrepr = customer.getValue('salesrep');
         var taskCus = recordVar.create({
             type: recordVar.Type.TASK, 
             defaultValues : { customform : -120 }
         });

         //taskCus.setText({ fieldId:'company', text: customer.getText('companyname')});
         //taskCus.setText({ fieldId:'company', text: 'PCL'});
         //taskCus.setText({ fieldId:'priority', text:'Low'});

         taskCus.setValue('priority', 'LOW');   //priority is a list field or option string
         taskCus.setValue('status', 'PROGRESS'); //open url on form and add &xml=t to see the value that is used
         taskCus.setValue('title', 'New Customer Follow-up3');
         taskCus.setValue('message', 'new Message 3');

         if(salesrepr) {
             taskCus.setValue('assigned',salesrepr);
         }

         if(companyCus) {
             taskCus.setValue('company',customer.id); //take internalid of company ex.111
         }


         emailVar.send({
             author: getUser,
             body: 'Welcome! We are glad for you to be a customer of suiteDreams',
             recipients: getUser,
             subject: 'Welcome to suite dreams.'
         });

         taskCus.save();     //save task
     }   //end create task


     //create calendar event module 6 exercise3
     if (context1.type == context1.UserEventType.CREATE){

         var companyCus = customer.getValue('companyname');
         var salesrepresent = customer.getValue('salesrep');

         var calendarEv = recordVar.create({
             type: recordVar.Type.CALENDAR_EVENT,
             isDynamic: true,
             defaultValues :{    //it is a property
                 customform : -110  //calling standard phone call form internalID
             }
         });

         //header field
         calendarEv.setValue('title','Welcome conversation with' +companyCus);
         calendarEv.setValue('sendemail',true);  //bug with this field notify attendees by email
         //on UI if tick and save it is untick automatically
         //cannot find this field on standard netsuite field

         if(companyCus) {
             calendarEv.setValue('company',customer.id); //take internalid of company ex.111
         }

         //scripting sublist field add sales rep
         calendarEv.selectNewLine({
             sublistId: 'attendee'
         });
         calendarEv.setCurrentSublistValue({
             sublistId: 'attendee',
             fieldId: 'attendee',    //sublist field id=send invitation to
             value: salesrepresent   //sales rep
         });
         calendarEv.commitLine({
             sublistId: 'attendee',
         });


         //scripting sublist field add customer
         calendarEv.selectNewLine({
             sublistId: 'attendee'
         });
         calendarEv.setCurrentSublistValue({
             sublistId: 'attendee',
             fieldId: 'attendee',    //sublist field id=send invitation to
             value: customer.id   //customer
         });
         calendarEv.commitLine({
             sublistId: 'attendee',
         });

         calendarEv.save();    //save calendar event

     }   //end



     //module 10 exercise3
     if (context1.type == context1.UserEventType.CREATE){

        //create task event
        var createTask = task.create({
            taskType: task.TaskType.MAP_REDUCE, //create mapreduce script
            deploymentId: 'customdeploysdr_mr_invoice_totals',  //deployment id
            scriptId: 167   //mapreduce payments script
        });

        //access parameter values
        var paramValues = runtimeVar.getCurrentScript().getParameter({
            name : 'custscript_customer_internalid' //customer internal id of script parameters
        });


        //assign values to task
        createTask.params = {
            'custscript_customer_internalid' : paramValues
        }

        
        //submit task
        var subTask = createTask.submit();


        //check status
        var checkStatuses = task.checkStatus({
            taskId: subTask
        });
        log.debug('Initial status' + checkStatuses.status);

     }



 }   //end aftersubmit

 return {
     //beforeLoad: beforeLoad,
     beforeSubmit: beforeSubmit,
     afterSubmit: afterSubmit
 }
});
