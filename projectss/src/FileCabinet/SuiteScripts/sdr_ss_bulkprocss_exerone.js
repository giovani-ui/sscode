/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
 define(['N/search'], 
 /**
  * @param {search} search 
  */
 function(search) {
 
 
     return {
         execute: function (context) {   //callback function
             
             var createSearch = search.create({
                 type: search.Type.SUPPORT_CASE,
    
                 filters: [
    
                 search.createFilter({ //1sr filter
                     name: 'status',
                     operator: search.Operator.ANYOF,
                     values: [3,4] //3=escalted, 4=re-opened setup>support>case status
                     //if freetext use text if list or select using internal id
                 }),
    
                 search.createFilter({ //2nd filter
                    name: 'title',
                    join: 'employee',
                    operator: search.Operator.HASKEYWORDS,
                    values: 'support' //3=escalted, 4=re-opened setup>support>case status
                    //if freetext use text if list or select using internal id
                })
            ],
                 columns: [
                     search.createColumn({
                         name: 'title',
                     }),
                     search.createColumn({
                        name: 'startdate',  //incident date
                    }),
                    search.createColumn({
                        name: 'assigned',
                    }),
                    search.createColumn({
                        name: 'status',
                    }),
                    search.createColumn({
                        name: 'department', join : 'employee'
                    }),
                    search.createColumn({
                        name: 'title', join : 'employee'
                    })
                 ]
                 /*title: 'creating saved s scripting',
                 id: 'sdr_createss_escal_script',
                 isPublic: true*/
             });
    
     
             var searchResult = createSearch.run().getRange({
                 start : 0,  //first result
                 end   : 9   //number of result to be displayed
             });
     
             for(var i = 0; i < searchResult.length; i++){
                var subject = searchResult[i].getValue('title');
                //will get the name(getText) or id(getValue) of the employee
                var assignedTo = searchResult[i].getText('assigned');
                var status = searchResult[i].getValue('status');
                //retrieve join value
                var department = searchResult[i].getValue({
                    name : 'department',
                    join : 'employee'
                });
                //retrieve join value
                var jobTitle = searchResult[i].getValue({
                    name : 'title',
                    join : 'employee'
                });
    
                log.debug('Case Info','Subject : ' + subject + '\n' + 
                                      'Status : ' + status + '\n' +
                                      'Job Title : ' + jobTitle + '\n' +
                                      'Department : ' + department + '\n');
    
             }
 
         }
 
 
     }
 
 
 });
 