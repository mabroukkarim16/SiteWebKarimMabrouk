(function(){

    "use strict";
    window.onload=()=>{initTodo();} 
    
    var zoneText=document.querySelector("#input"); 
    var listeTodo=document.querySelector("#todolist"); 
    var doneListe=document.querySelector("#donelist"); 
    var selectliste=document.querySelectorAll("#todolist >article");
    var btns=document.querySelector("#boutons");
    var listeAfaire=[];
    var listeComplete=[];
    var template = document.querySelector("template").content.firstElementChild; 
    var root=document.documentElement;
    
    function parseQueryString(qstr)   
    {
        var query={};
        var parameters=qstr.substr(1).split('&');
        for(var i=0;i<parameters.length;i++){
            var keyAndValue=parameters[i].split('=');
            var key=decodeURIComponent(keyAndValue[0]);
            var value=decodeURIComponent(keyAndValue[1]||''); 
            query[key]=value;
        }
        return query;
    
    }
    
    
     function updateHTMLClass()   
      {
    
          var valeur=parseQueryString(location.search);
          if(valeur.skin){
              if(valeur.skin==="redonblack"||valeur.skin==="")
                  {
                  selectSkin.value="";
                  selectSkin.Selected;
                  root.setAttribute('class',"")     
                  }
              else{              
                  selectSkin.value=valeur.skin;
                  selectSkin.Selected;
                  root.setAttribute('class',valeur.skin)        
                } 
              }
          else {
               if(localStorage.getItem('selectSkin')!=0){              
                  selectSkin.selectedIndex=localStorage.getItem('selectSkin');
                  selectSkin.Selected;
                  root.setAttribute('class', selectSkin.value)
                  }
                else{
                  root.setAttribute('class',"")
                  selectSkin.value="";
                  selectSkin.Selected;              
                  }          
         }
      localStorage.setItem('selectSkin', selectSkin.selectedIndex);     
    }
 
    
selectSkin.addEventListener("change",verficationselect);
    function initSelectedSkin()
          {
           if(localStorage.getItem('selectSkin')!=0){ 
              selectSkin.selectedIndex=localStorage.getItem('selectSkin');   
              selectSkin.Selected;          
              }  
            verficationselect();
         }

  function  verficationselect(){     
    
      if(selectSkin.selectedIndex===0) 
          {
         root.setAttribute('class',"")    
          }
       else if( selectSkin.selectedIndex===1){
         root.setAttribute('class',selectSkin.value)   
       }
      else if( selectSkin.selectedIndex===2){
         root.setAttribute('class', selectSkin.value)   
         }
       localStorage.setItem('selectSkin', selectSkin.selectedIndex); 
        }
   
  AjouterBoutons();   
    
 //fonction pour inserer un article     
zoneText.onkeypress = function(e){
 if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13')
       {var textTodo =zoneText.value.trim();
        if(textTodo==null||textTodo==undefined||textTodo.trim()== "")
            {
            alert("Vous devez saisir du text !!!")
            }
        else
            {
            ajouterTodo(textTodo);         
            zoneText.value="";
            }  
       }
  }

function initTodo()
  {  
      if(!localStorage.getItem('listeAfaire') && !localStorage.getItem('listeComplete'))
         {          
         ajouterTodo("Encore une chose à  faire");  
          ajouterTodo("Autre chose à  faire");
          ajouterTodo("Chose à faire"); 
          }
        else  
          {
           setData();
           //verficationselect();
           } 
      initSelectedSkin();
      updateHTMLClass()  ;
    }
 
function  ajouterTodo(todoTexte){
    //creation des balises 
  /*  var article=document.createElement("article"); 
    var caseAcoucher=document.createElement("input");    
    var divText=document.createElement("div");
    var image=document.createElement("img");   
     //ajouter des attributs pour chaque balise
    caseAcoucher.setAttribute("type", "checkbox");
    caseAcoucher.setAttribute("class", "checkbox"); 
    image.setAttribute("src", "./delete64.png");
    image.setAttribute("alt", "delete");   
    image.setAttribute("tabindex","0");     
    divText.setAttribute("class", "text");  
    divText.setAttribute("tabindex","0");  
    divText.setAttribute("contenteditable", ""); 
    divText.appendChild(document.createTextNode(todoTexte));
    //positionner les balises dans le balise article  
    article.appendChild(caseAcoucher); 
    article.appendChild(divText); 
    article.appendChild(image); */

  var article = template.cloneNode(true);
  article.querySelector(".text").textContent = todoTexte;
 
    
    
    /*evennements*/

    article.querySelector("input").addEventListener("change",verficationChecked);  
    article.querySelector("input").addEventListener("keypress",keypressOnCheckBox); 
    article.querySelector("img").onclick=deleteTodo;
    article.querySelector("img").onkeypress=deleteTodo; 
    article.querySelector("div").onkeypress=setFocusTodo;
  
    article.querySelector("div").onblur=dataUpdated;
   
    if(listeTodo.hasChildNodes())
        {            
        var fristChildarticle=listeTodo.firstChild;
        listeTodo.insertBefore(article, fristChildarticle);
        }
    else{
        listeTodo.appendChild(article); 
    }
    updateVisibility();
    dataUpdated();
}  
    
function keypressOnCheckBox(event)
 {
    if (!event) { event = window.event; }
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
        this.click();
    }
}    
    
 
function setFocusTodo(event)
    { 
   if (!event) { event = window.event; }
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) 
     {
        if(this.parentNode === listeTodo.lastElementChild)
          {
          this.parentNode.parentNode.nextElementSibling.firstChild.children[1].focus();
          event.preventDefault();
          }        
        else if((!doneListe.hasChildNodes() && this.parentNode === listeTodo.lastElementChild)||         this.parentNode === doneListe.lastElementChild )
            {
               zoneText.focus(); 
            }
         else   
         {
          this.parentNode.nextElementSibling.children[1].focus();
          event.preventDefault();
          }   
     }
   }  
function deleteTodo(){ 
  this.parentNode.outerHTML="";   
    updateVisibility(); 
    dataUpdated();
   }     
    
function deplaceVersDone(doneObject)
 {
      if(doneObject.parentNode.parentNode.hasChildNodes())
        {
        var fristChildarticle=doneListe.firstChild;  
        doneListe.insertBefore(doneObject.parentNode, fristChildarticle); 
    
        }
      else
        {
         doneListe.appendChild(doneObject.parentNode);     
        }
     doneObject.focus();
     updateVisibility();
     dataUpdated();
  }  
    
    
function deplaceVersTodo(objet){      
     listeTodo.appendChild(objet.parentNode);
      //doneList.removeChild(objet.parentNode);
    objet.focus(); 
    updateVisibility();
    dataUpdated();
  }    

function verficationChecked()
    {     
         if(this.checked)
           {
          deplaceVersDone(this);
           }
        else{
          deplaceVersTodo(this);  
          }
    }
     
  btnMarquer.onclick=()=>{    
      while(listeTodo.hasChildNodes())
          {
             listeTodo.children[0].children[0].click(); 
          }
      updateVisibility();
      dataUpdated();
   }  
  
  btnEffacer.onclick=()=>{        
      while(doneListe.hasChildNodes())
          {
             doneListe.removeChild(doneListe.lastChild); 
          }
      updateVisibility();
      dataUpdated();
  } 

function updateVisibility() {
    visibilityButtonEffacer();
    visibilityButtonMarquer();
 }  

function visibilityButtonMarquer()
   {    
       if(listeTodo.children.length === 0)
         {
         btnMarquer.disabled=true;
         }
       else
         {
         btnMarquer.disabled=false; 
         }
     localStorage.setItem('btnMarquer',  btnMarquer.disabled);   
   }
  
  
function visibilityButtonEffacer()
 {
    if(doneListe.children.length === 0)
    {
       btnEffacer.disabled=true; 
     
    }
   else{
       btnEffacer.disabled=false; 
     } 
     localStorage.setItem('btnEffacer', btnEffacer.disabled);                                              
 }
  
    
function initRecordList()
  {
    listeAfaire=[];
    listeComplete=[];
    localStorage.setItem('listeAfaire',JSON.stringify(listeAfaire));
    localStorage.setItem('listeComplete',JSON.stringify(listeComplete));   
  }

  function dataUpdated()    {
      initRecordList();
      if(todolist.childNodes.length >0)
       {         
       for(var i = 0; i < todolist.childNodes.length ; i++)
        {     
        listeAfaire.unshift(todolist.children[i].innerText) ; 
        }
       localStorage.setItem('listeAfaire',JSON.stringify(listeAfaire));
       } 
        if(donelist.childNodes.length >0)
       { 
     for(var j = 0; j < donelist.childNodes.length ; j++)
       {     
       listeComplete.unshift(donelist.children[j].innerText);  
       }
      localStorage.setItem('listeComplete',JSON.stringify(listeComplete)); 
       }  
    }
  
   function setData(){ 
       var listeAff=JSON.parse(localStorage.getItem('listeAfaire')); 
       var listecomp=JSON.parse(localStorage.getItem('listeComplete')); 
       
       for(var att in listeAff )
         {
         ajouterTodo(listeAff[att])  ;
         }
       for(var complet in listecomp )
         {
         ajouterTodo(listecomp[complet])
         todolist.children[0].children[0].click(); 
         }
       
    }
    
  function AjouterBoutons()  
    {
    var btnMarque= document.createElement("button"); 
    var imgMarquer = document.createElement("img");
    var spanMarquer = document.createElement("span"); 
    btnMarque.id='btnMarquer';      
    imgMarquer.src ='./checkbox.png';
    imgMarquer.alt='image checkbox';     
    spanMarquer.textContent = 'marquer toutes les tâches à faire comme complétées';    
    btnMarque.appendChild(imgMarquer);
    btnMarque.appendChild(spanMarquer);
    btns.appendChild(btnMarque); 
    /*button 2*/    
    var btnEfface= document.createElement("button");        
    var spanEffacer = document.createElement("span"); 
    var imgEffacer = document.createElement("img");     
    btnEfface.id='btnEffacer';   
    imgEffacer.src ='./delete64.png';
    imgEffacer.alt='image supprimer'; 
    spanEffacer.textContent = 'd’effacer de la liste toutes les tâches complétées'; 
    btnEfface.appendChild(imgEffacer);    
    btnEfface.appendChild(spanEffacer);    
    btns.appendChild(btnEfface);   
        btnMarquer.disabled=localStorage.getItem('btnMarquer');
        btnEffacer.disabled=localStorage.getItem('btnEffacer'); 
    }
   
})();