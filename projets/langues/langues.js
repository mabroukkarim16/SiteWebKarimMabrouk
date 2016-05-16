String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};	

function decimalToHexString(number)
{
    if (number < 0)
    {
    	number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}

var contenu = document.querySelector('HTML').outerHTML.replace(/\s/g, "");
compte.innerHTML = contenu.length;
var hash = decimalToHexString( contenu.hashCode() );
hachage.innerHTML = hash;
version.innerHTML = "CONDOR";
var couleur = ( hash == "4D293D2A" | hash == "658DD459" ? "lime" : "red" );
[compte, version, hachage].forEach( function(elem){

	elem.style.color = couleur;
	elem.style.background = "black";
	elem.style.padding = "0.5ex";
	elem.style.borderRadius = "0.5ex";
}) 
