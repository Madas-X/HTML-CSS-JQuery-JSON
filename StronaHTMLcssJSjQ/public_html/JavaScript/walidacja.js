/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var helper=false;
var editORnot=true;
var UArray = [];
function sprawdzPole(pole_id,obiektRegex) {
 var obiektPole = document.getElementById(pole_id);
 if(!obiektRegex.test(obiektPole.value)) return (false);
 else return (true);
}
function sprawdz()
{
var ok=true; //zmienna informująca o poprawnym wypełnieniu formularza
obiektNazwAndImie = /^[a-zA-Z]{2,20}$/; //wyrażenie regularne dla nazwiska itd.
obiektemail =
        /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+$/;
obiektNazwaZespolu = /^[a-zA-Z0-9\s]{2,30}$/;
obiektNrTel = /^[1-9][0-9]{8}$/;
//Sprawdzanie kolejnych pól formularza.
//NAZWISKO
if (!sprawdzPole("nazwisko",obiektNazwAndImie))
{ ok=false;
 document.getElementById("nazwisko").style.backgroundColor=
    "rgba(250,128,114,0.8)";
 document.getElementById("nazw_error").innerHTML=
    "Wpisz poprawnie nazwisko!";
}
else{ 
    document.getElementById("nazw_error").innerHTML="";
    document.getElementById("nazwisko").style.backgroundColor="#FFFFFF";
    }
//IMIE
if (!sprawdzPole("imie",obiektNazwAndImie))
{ ok=false;
 document.getElementById("imie").style.backgroundColor=
    "rgba(250,128,114,0.8)";
 document.getElementById("imie_error").innerHTML=
    "Wpisz poprawnie imie!";
}
else{
    document.getElementById("imie_error").innerHTML="";
    document.getElementById("imie").style.backgroundColor="#FFFFFF";
}
//EMAIL
if (!sprawdzPole("email",obiektemail))
{ ok=false;
 document.getElementById("email").style.backgroundColor=
    "rgba(250,128,114,0.8)";
 document.getElementById("email_error").innerHTML=
    "Wpisz poprawny e-mail";
}
else{
    document.getElementById("email_error").innerHTML="";
    document.getElementById("email").style.backgroundColor="#FFFFFF";
}
//NAZWA ZESPOLU
if (!sprawdzPole("nzespolu",obiektNazwaZespolu))
{ ok=false;
 document.getElementById("nzespolu").style.backgroundColor=
    "rgba(250,128,114,0.8)";
 document.getElementById("nzespolu_error").innerHTML=
    "Wpisz poprawną nazwę zespołu";
}
else{
    document.getElementById("nzespolu_error").innerHTML="";
    document.getElementById("nzespolu").style.backgroundColor="#FFFFFF";
}

if (!sprawdzPole("ntel",obiektNrTel))
{ ok=false;
 document.getElementById("ntel").style.backgroundColor=
    "rgba(250,128,114,0.8)";
 document.getElementById("ntel_error").innerHTML=
    "Wpisz poprawny nr. telefonu";
}
else{
    document.getElementById("ntel_error").innerHTML="";
    document.getElementById("ntel").style.backgroundColor="#FFFFFF";
}
helper=ok;
if(editORnot===true){
onWyslijPressed();
}
else{
   edycja(); 
}
return ok;
}
//reset danych
function restart(){
    document.getElementById("imie_error").innerHTML="";
    document.getElementById("imie").style.backgroundColor="#FFFFFF";
    
    document.getElementById("nazw_error").innerHTML="";
    document.getElementById("nazwisko").style.backgroundColor="#FFFFFF";
    
    document.getElementById("email_error").innerHTML="";
    document.getElementById("email").style.backgroundColor="#FFFFFF";
    
    document.getElementById("nzespolu_error").innerHTML="";
    document.getElementById("nzespolu").style.backgroundColor="#FFFFFF";
    
    document.getElementById("ntel_error").innerHTML="";
    document.getElementById("ntel").style.backgroundColor="#FFFFFF";
    
}
//odswierzanie local storage
var imie,nazwisko,email,nzespolu,ntel;
function init(){
    document.getElementById("regtable").innerHTML= "";
    if(localStorage.uczestniki){
        UArray = JSON.parse(localStorage.uczestniki);
        for(var i =0; i< UArray.length; i++){
            prepareTableCell(i,UArray[i].imie,UArray[i].nazwisko,
            UArray[i].email,UArray[i].nzespolu,UArray[i].ntel);
        }
    }
}
//dodawanie localStorage
function onWyslijPressed(){
    editORnot=true;
    if(helper===true){
        imie = document.getElementById("imie").value;
        nazwisko = document.getElementById("nazwisko").value;
        email = document.getElementById("email").value;
        nzespolu = document.getElementById("nzespolu").value;
        ntel = document.getElementById("ntel").value;
        var uczestnicy = {imie: imie, nazwisko: nazwisko,email:email,
            nzespolu:nzespolu,ntel:ntel};
        UArray.push(uczestnicy);
        localStorage.uczestniki = JSON.stringify(UArray);
        init();
        document.getElementById("imie").value = "";
        document.getElementById("nazwisko").value = "";
        document.getElementById("email").value = "";
        document.getElementById("nzespolu").value = "";
        document.getElementById("ntel").value = "";
    } 
};
//tabela localStorage
function prepareTableCell(index,imie,nazwisko,email,nzespolu,ntel){
    var table = document.getElementById("regtable");
    var row = table.insertRow();
    var imieCell = row.insertCell(0);
    var nazwCell = row.insertCell(1);
    var emailCell = row.insertCell(2);
    var nzespCell = row.insertCell(3);
    var ntelCell = row.insertCell(4);    
    var buttonsCell = row.insertCell(5);
    imieCell.innerHTML = imie;
    nazwCell.innerHTML = nazwisko;
    emailCell.innerHTML = email;
    nzespCell.innerHTML = nzespolu;
    ntelCell.innerHTML = ntel;
    buttonsCell.innerHTML = "<button id='edit' onClick='editTableRow("+index+")'>Edit</button><br><button id='del'\n\
onClick='deleteTableRow("+index+")'>Del</button>";
}
//usun element z localStorage
function deleteTableRow(index){
    var table = document.getElementById("regtable");
    table.deleteRow(index);
    UArray.splice(index,1);
    localStorage.uczestniki = JSON.stringify(UArray);
    init();
}
var j;
//edytuj z localStorage
function editTableRow(index){
    j=index;
    UArray = JSON.parse(localStorage.uczestniki);
    document.getElementById("imie").value = UArray[index].imie;
    document.getElementById("nazwisko").value = UArray[index].nazwisko;
    document.getElementById("email").value = UArray[index].email;
    document.getElementById("nzespolu").value = UArray[index].nzespolu;
    document.getElementById("ntel").value = UArray[index].ntel;
    editORnot=false;
}
function edycja(){
        editORnot=true;
        UArray = JSON.parse(localStorage.uczestniki);
        UArray[j].imie = document.getElementById("imie").value;
        UArray[j].nazwisko = document.getElementById("nazwisko").value;
        UArray[j].email = document.getElementById("email").value;
        UArray[j].nzespolu = document.getElementById("nzespolu").value;
        UArray[j].ntelntel = document.getElementById("ntel").value;
        localStorage.uczestniki = JSON.stringify(UArray);
}