
(function(){

"use strict";

var monTitre = document.querySelector('h1');
var monImage = document.querySelector('img');
var monBouton = document.querySelector('button');

    


monImage.onclick = function() {
    var maSrc = monImage.getAttribute('src');
    if(maSrc === 'images/firefox-icon.png') {
      monImage.setAttribute ('src','images/firefox2.png');
    } else {
      monImage.setAttribute ('src','images/firefox-icon.png');
    }
}

function définirNomUtilisateur() {
  var monNom = prompt('Veuillez saisir votre nom.'); 
 
  if(monNom==null||monNom==undefined||monNom.trim()== "")
      {
      var nomEnregistré = localStorage.getItem('nom');
          if(nomEnregistré==null||nomEnregistré==undefined||nomEnregistré.trim()== "") {
              monTitre.textContent = 'Mozilla est cool,inconnu ';
             }
          else{
              monTitre.textContent = 'Mozilla est cool, ' + nomEnregistré;   
             }
      }
 else{      
	localStorage.setItem('nom', monNom.trim());
    monTitre.textContent = 'Mozilla est cool, ' + monNom.trim();
     }
  
}

if(!localStorage.getItem('nom')) {
  définirNomUtilisateur();
} else {
       monTitre.textContent = 'Mozilla est cool, '+ nomEnregistré;   
       }



monBouton.onclick = function() {
  définirNomUtilisateur();
}
})();