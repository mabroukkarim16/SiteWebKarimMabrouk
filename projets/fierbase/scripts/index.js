(function(){

    "use strict";
    initUserName();
     var nombreDeMessages=0;
     var myDataRef = new Firebase('https://shining-inferno-2559.firebaseio.com/');
                                                                    
 function AjouerMessage(name, text){
     myDataRef.push({name: name, text: text});      
  }
 function supprimerMessages(ref)
    {
    var oncomplete=function(error){if(error){console.error("Erreur: "+error);}
                                   else{  console.log("Toutes les données ont été effacées.");  } };
     ref.remove(oncomplete);                        
        
    }
    
     $('<p>').text(nombreDeMessages+' messages').appendTo($('#messagesDiv'));
     $('<pre>').text( 'Effacer').appendTo($('#messagesDiv'));
    
    $(messagesDiv).find('p').css({
                            'color':'lime',
                            'fontStyle':'italic',              
                            'position':'absolute',
                            'right':'20px',
                            'top':'-17px',
                            'textAlign':'center',                             
                            'fontSize':'1em'
                       })
                   .click( function( ) { 
                           for(var i=0; i<50;i++)
                             {                            
                             AjouerMessage('Anonymous', i+1) ;  
                             }
                          }
                         )
                   .hover(function(){ $(this).css({'color':'black',
                                             'background':'lime',
                                              'height':'35px', 
                                              'padding':'5px', 
                                              'flex':'1',
                                              'cursor':'pointer'});  
                                    } , 
                          function(){ $(this).css({'color':'lime',
                                             'background':'black'
                                               }); 
                                }
                        ) ; 
    
    $(messagesDiv).find('pre').css({
                            'color':'red',
                            'fontStyle':'italic',              
                            'position':'absolute',
                            'right':'100px',
                            'top':'-17px',
                            'textAlign':'center',                             
                            'fontSize':'1em',
                            'opacity':'0',
                            'right':'120px',
                            'transition': '1s'
                          })
                    .click(function(){                   
                             supprimerMessages(myDataRef) ;      
                      })

                   .hover(
                    function(){ $(this).css({'color':'black',
                                             'background':'red',
                                              'height':'35px', 
                                              'opacity':'1', 
                                              'padding':'5px', 
                                              'flex':'1',
                                               'cursor':'pointer' });  
                                                            } , 
                    function(){ $(this).css({'color':'red',                                            'background':'black',  
                                        'opacity':'0' });
                              }
                         ) ; 
    
      
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            
          var name = $('#nameInput').val();
            if(name.trim()==="")
                {
                    name="Anonymous";
                }
          var text = $('#messageInput').val();
         AjouerMessage(name, text);
          $('#messageInput').val('');  
        localStorage.setItem('userName', name);  
      
         }
      });
    
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
        initMesssageNumber();
      });
     myDataRef.on("child_removed", function(snapshot){ 
         var messagesDivDOM=$(messagesDiv)[0];
         messagesDivDOM.removeChild(messagesDivDOM.firstElementChild)});
    
function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
           initMesssageNumber();
      };
 
function initMesssageNumber(){
      nombreDeMessages=$(messagesDiv).find('div').length;
    if(nombreDeMessages>100)
        {
           $('p').text('100/ '+nombreDeMessages+' messages');   
        }
     else{
         $('p').text(nombreDeMessages+' messages');  
       }
}
    

function initUserName() {
   var oldname=localStorage.getItem('userName'); 
    if(oldname===null
                   ||oldname===undefined
                   ||oldname.trim()===""){
        $('#nameInput').val( "Anonymous");   
                   }
                else{
        $('#nameInput').val(localStorage.getItem('userName')); 
                    }   
    }
    
    
})();