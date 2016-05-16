(function(){

    "use strict";
    var iframe=document.querySelector("iframe");
    
         $("<button>Basculer iframe</button>")
        .appendTo($(retour))
        .on("click", ()=>$(iframe.contentDocument.body).fadeToggle(1000));
     
    
    $("<button>Basculer paragraphes</button>")
         .appendTo($(retour))               
         .on("click", ()=>$('p',iframe.contentDocument).slideToggle(1000));
      
     $("<button>Basculer boutons</button>")
         .appendTo($(retour))               
         .on("click", 
             ()=>$('article',$(iframe.contentDocument)[0]).find('button').fadeToggle(1000));    
 
    
     window.onload=resizer; 
     window.onresize=resizer;
     iframe.onload=manipulerArticles;
    
    function resizer() {         
        iframe.style.height="initial";
        iframe.style.height=iframe.contentDocument.body.scrollHeight;
        iframe.style.height=iframe.contentDocument.body.scrollHeight+200+'px'; 
         
    }
      
    
    
function manipulerArticles()
     { 
var articles=$('article',$(iframe.contentDocument)[0]);    
     articles.append('<button>Basculer affichage</button>') ;
     articles.find('button')
             .css(  { position:"absolute",right:"15px",top:"15px",
                         borderRadius:"10px", width:"90px", height:"50px",     
                         opacity:"0.5", padding:"5px",
                         fontSize:"1em", fontWeight:"bold",
                         marginLeft:"0px"
                       }
                    )            
              .hover(
                    function(){$(this).animate({opacity:1}, 1000);
                               $(this).css("color","red");
                              } , 
                    function(){$(this).animate({opacity:0.5}, 1000)
                              $(this).css("color","black");
                              }
                    )  
               
               .click(function( ) { $(this).parent().find("ol").fadeToggle(1000);
                                    $(this).parent().find("p").fadeToggle(1000);
                                  }
                     )
                .hide();                
             
    
    }
    
        })();