
(function(){

"use strict";
    var sourdine = document.querySelector("#checkbox");
    var ul = document.querySelector("#ulMenu");
    var box= document.querySelector("input");         
    var msgAudio=document.querySelector("#idAudio");
    initbox();
    positionnerSourdine();

    
    $.getJSON("./projets.json")
        .done(function(jsonData){ 
         var context={projets: jsonData};
         var thetemplateScripte=document.querySelector("#templateScripte").innerHTML ;
         var theTemplate=Handlebars.compile(thetemplateScripte);
         var compileHTML=theTemplate(context);
         ulMenu.innerHTML = compileHTML  ;
        })
       .fail(function(){
            console.log("Impossible de charger le JSON")        
        });
    

    
    
    
function positionnerSourdine() 
     {
      sourdine.style.position="absolute";
      sourdine.style.top="-2px";
      sourdine.style.right="-2px";
     }

   sourdine.addEventListener("mouseover", setInfoBulle);    
   box.addEventListener("change", boxChange);   
    
function boxChange()
 {
    setAudio();
    setInfoBulle();
    localStorage.setItem('check', box.checked);    
 }    
    
function setInfoBulle() 
 {    
    if(!box.checked)
      {
        sourdine.title="Activer la sourdine";       
      }
    else
      {        
        sourdine.title="Désactiver la sourdine";         
      }
 }
  
    
    
function setAudio() 
{    
       if(box.checked==false){
         msgAudio.play();
          
     }else
        {        
            msgAudio.load();     
        }
}
     
    
function initbox()
{
   if(localStorage.getItem('check')){
    box.checked = (localStorage.getItem('check')==="true");
   }
    setAudio();
}
 

    

})();