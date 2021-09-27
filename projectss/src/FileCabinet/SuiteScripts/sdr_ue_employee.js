/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

 /*define([], 
    function() {*/

        define(['N/record','N/redirect'], 
        //add jaxdoc tags
        /**
         * @param {record} record
         * @param {redirect} redirect  
         */
            function(record, redirect) { //paramters is a varaible any name
        
        
                return {        //name of entry point=aftersubmit, it has to be put here
                    afterSubmit: function(context1){ //context =parameters=information after the after submit execution
                        //log.debug('Hello August 2021');
        
                        var employee = context1.newRecord;  //get the current record
                        var empCode = employee.getValue('custentity_sdr_employee_code');
                        //do not use different method such as getValue,getText,getField when save record
                        //will get errors
                        //var supervisorName = employee.getText('supervisor'); //to get information from a list used get value
                        var supervisorId = employee.getValue('supervisor'); //to get information from a list used get value/get value get internal id
        
                        log.debug('Employee Code', empCode);
                        log.debug('Supervisor ID', supervisorId);
                        //log.debug('Supervisor Name', supervisorName);
        
        
        
                        //module 5 e.g1
                        if (context1.type == context1.UserEventType.CREATE){
        
                            var phoneCall = record.create({
                                type : record.Type.PHONE_CALL,
                                defaultValues :{    //it is a property
                                    customform : -150  //calling standard phone call form internalID
                                }
                            });
        
                            phoneCall.setValue('title','Call HR for benefits Module5');
                            phoneCall.setValue('assigned',employee.id);
                            phoneCall.save();   //required to saved record
                            
                            //server scripting sublist
                            var event = record.create({
                                type : record.Type.CALENDAR_EVENT,   //EVENT obsolete replace by CALENDAR_EVENT 
                                isDynamic : true,   //means what i am doing on client=server
                                defaultValues :{    //it is a property
                                    customform : -110  //calling standard phone call form internalID
                                }
                                //evaluate 1 line after the other/similar what we do in client side
                                //follow same sequence as we would do in client
                            });
                            event.setValue('title','welcome meeting with supervisor');  //set value because mandatory field
 
                            //server scripting sublist
                            event.selectNewLine({
                                sublistId : 'attendee' //check standard field value internal id sublist part
                            });
                            event.setCurrentSublistValue({
                                sublistId : 'attendee',
                                fieldId : 'attendee',
                                value : employee.id
                            });
                            event.commitLine({
                                sublistId : 'attendee'
                            });
        
        
                            //server scripting sublist
                            event.selectNewLine({
                                sublistId : 'attendee' //check standard field value internal id sublist part
                            });
                            event.setCurrentSublistValue({
                                sublistId : 'attendee',
                                fieldId : 'attendee',
                                value : employee.getValue('supervisor')
                            });
                            event.commitLine({
                                sublistId : 'attendee'
                            });
        
                            event.save();
        
                        }


                        //module 12 suitlet example
                        //redirect from ue to sl
                        redirect.toSuitelet({
                            scriptId : 'customscriptsdr_sl_update_emp_notes',
                            deploymentId : 'customdeploysdr_sl_update_emp_notes',
                            //object passing to request
                            parameters: {
                                sdr_name : employee.getValue('entity'), //sdr_name newly created
                                sdr_notes : employee.getValue('comments'),  //sdr_notes newly created
                                sdr_empid : employee.id //sdr_empid newly created
                            }
                        });

        
                    }      
            
            };
        });
        