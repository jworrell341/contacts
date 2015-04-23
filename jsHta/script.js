/**
// Author: Abbas Abdulmalik
// Creation Date: April 2, 2015
// Revised: April 9, 2015
// Note: choose a person to contact
*/
//==============Global Variables=======================
var contactsURL = "https://1e41d4e24761a0109b26d3c1405243f4fb33cfc9.googledrive.com/host/0B4HC-e3WTADpfndhQkpFWDY0NUxhRDZlRzVYcmF6aE9hSG9GOWtPSmdXUEF1NV9zYmhha0k/contacts/"
var contacts = 
"Lastname, Firstname, Email, phone" + "\n" +
"Carr, Ryan, 13Carr7738@pit.edu, 610-555-1212" + "\n" +
"Fulginiti, Brian, 14Fulgin6944@pit.edu, 610-555-1212" + "\n" +
"Elansary, Omar, 13Elansa7009@pit.edu, 610-555-1212" 
"Ramos, Thomas, 13Ramos7668@pit.edu, 610-555-1212" + "\n" 
var recordsArray = [];
var currentRecordIndex = 1;
var ajax = new XMLHttpRequest();
//===============Event handlers =======================
window.addEventListener("load",init,false);
//-------------------------------------------------------
O("btn").addEventListener("click",function(){
  var upperIndex = recordsArray.length;
  if(currentRecordIndex < upperIndex -1){
    currentRecordIndex++;
    showRecord(currentRecordIndex);
  }
  else{
    currentRecordIndex = 1;
    showRecord(currentRecordIndex);
  }
},false);
//======================================================
/*
Store our csv file locally if localStorage
is supported.
*/
function init(){
  //check if localStorage is supported:
  //if so, see if our contacts are there ..
    // if they are not there,get them from the server (via ajax request)...
    // and 1.) save 'em to our contacts variable && then 2.)save in localStorage.
    // If they are already saved locally, put 'em into our contacts variable
  //if localStorage is not supported, then get contacts from server, and...
  // ...save them in our contacts variable (you can't save it to localStorage).  
  if(!!localStorage){
    if(!localStorage.getItem("contacts")){
      ajax.open("GET", contactsURL + "docs/contacts.csv", true);
      ajax.send();
      //=====================================
      ajax.onreadystatechange = function(){        
        if(ajax.readyState === 4){
          if(ajax.status === 200 || ajax.status === 0){
            alert("storage supported but nothing stored");
            alert("...But i will store this: \n" + ajax.response);
            //let's store our contacts
            contacts = ajax.response;//stores to our variable
            localStorage.setItem("contacts", contacts);//now store to browser
            recordsArray = contacts.split("\n");
            alert(recordsArray[3]); 
          }
          else{
            alert("Error from server: \n" + ajax.status);
          }
        }        
      }
    }
    else{//there was something stored: go get it.
      // put the response into our program's variable named "contacts".
      makeRecords( localStorage.getItem("contacts") );
      /*
      contacts = localStorage.getItem("contacts");
      recordsArray = contacts.split("\n");
      alert(recordsArray[3]);
      */  
    }
  }
  else{
    alert("local storage not supported");
    ajax.open("GET", contactsURL + "docs/contacts.csv", true);
    ajax.send();    
    //event to handle ajax request done
    ajax.onreadystatechange = function(){
      if(  (ajax.status === 200 || ajax.status === 0) && ajax.readyState === 4 ){
        //alert("Contacts: " + ajax.response);
        //store the response in our contacts variable
        //contacts = ajax.response;
        recordsArray = contacts.split("\n");
        alert(recordsArray[3]);
          
      }
      else{
        alert("Uh, oh! something went wrong.");
      }
    }
  }
}//end of init() function
//=============================================================
function makeRecords(csvString){
  contacts = csvString;
  recordsArray = contacts.split("\n");
  //display "first" contact
  showRecord(1);
}
//======================================
function showRecord(index){
  currentRecordIndex = index;
  var oneRecordArray = recordsArray[index].split(",");
  O("lastname").innerHTML = "&nbsp; &nbsp;&nbsp;" + oneRecordArray[0];
  O("firstname").innerHTML = "&nbsp; &nbsp;" + oneRecordArray[1];
  O("email").innerHTML = "&nbsp; &nbsp;" + oneRecordArray[2];
  O("phone").innerHTML = "&nbsp; &nbsp;" + oneRecordArray[3];  
}
//=======================================



