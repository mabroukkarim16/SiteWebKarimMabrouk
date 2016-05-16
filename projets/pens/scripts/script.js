
(function(){

    "use strict";
    
  var mypens=[    {
                titre:"JS Objets Passifs (Exercice)",
                reference:"EKoZyz"  
               
                },
    
                {
                 titre:"JS DOM innerHTML (exercice)",
                reference:"KzQgbK"  
                },
    
                {
                 titre:"JS stylage direct (exercice)",
                reference:"XdzLBW"               
                },
                {
                titre:"Flexbox Exercice",
                reference:"JXNMdx"        
                },
                {
                titre:"Précédence de proximit",
                reference:"BKRGYB"             
                }
               
             ];
    
    
       var conteneur=document.querySelector(".container");
       var template = conteneur.firstElementChild;
     
       conteneur.innerText = "";
       ajouterPens();
function ajouterPens()
{
 for(let i=0 ; i<mypens.length; i++)
    {
        var clone = template.cloneNode(true);           
       
        var attData=mypens[i].reference;
        clone.setAttribute("data-slug-hash", attData);
        var firstLink=clone.querySelector("a:first-child");
        var path="http://codepen.io/mabroukkarim/pen/"+mypens[i].reference+"/";
        firstLink.setAttribute("href",path);
        firstLink.textContent =mypens[i].titre; 
        conteneur.appendChild(clone);
    }
}
})();