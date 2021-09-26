/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
 require(['N/search'], //search module
 /**
  * @param {search} search
  */
     function(search) {   //schedule script

         //grab the search from netsuite or load a search
         /*var caseSearch = search.load({
             id: 'customsearch_sdr_escalated_searches'   // id of ss
         });*/


         //create a saved search
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
             end   : 999   //number of result to be displayed
         });
 
var stop = 'this is the stopper';
 
 });
 