//-------------------------- stope pdv-a ---------------------------------

function loadpdvstopa(broj,tip) {
  detaljidiv.innerHTML = "";
  loadTxtField("id","integer","ID:","",150,20,250,300,5,5);
  loadTxtField("naziv","string","Oznaka:","",150,50,250,300,50,50);
  loadTxtField("stopa","decimal","Stopa poreza:","",150,80,250,300,10,10);    
  loadPotvrdiBtn(300,110,"execpdvstopa('" + tip + "',null);");
  if (tip=="update") {
    xmlDoc = getXMLDoc("pdvstopa",broj);
    idTxt.value = getColumn(xmlDoc,1);
    idTxt.disabled = true;
    nazivTxt.value = getColumn(xmlDoc,2);
    stopaTxt.value = getColumn(xmlDoc,3);
    nazivTxt.focus();
  }
  if (tip=="insert") {
    idTxt.focus();
  }
}

function execpdvstopa(tip,id) {
  if ((tip=="insert") || (tip=="update")) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=pdvstopa" + tip + "&id=" + idTxt.value + "&naziv=" + nazivTxt.value + "&stopa=" + stopaTxt.value,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") {
      detaljidiv.innerHTML = "";
      loadTable("pdvstopa");
    } else {
      alert(str);
    }
  }  
  if (tip=="delete") {
    var x = confirm("Da li ste sigurni da želite brisanje ?");
    if (x==true) {
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=pdvstopa" + tip + "&id=" + id + "&naziv=&stopa=",false);
      xmlhttp.send();
      var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
      if (str.substring(0,6)=="Akcija") {
        detaljidiv.innerHTML = "";
        loadTable("pdvstopa");
      } else {
        alert(str);
      }  
    }
  }  
}

//-------------------------- vrste naloga ---------------------------------

function loadnalogvrsta(broj,tip) {
  detaljidiv.innerHTML = "";
  loadTxtField("id","integer","ID:","",150,20,250,300,5,5);
  loadTxtField("oznaka","string","Oznaka:","",150,50,250,300,20,20);
  loadTxtField("naziv","string","Naziv:","",150,80,250,300,50,50);    
  loadPotvrdiBtn(300,110,"execnalogvrsta('" + tip + "',null);");
  if (tip=="update") {
    xmlDoc = getXMLDoc("nalogvrsta",broj);
    idTxt.value = getColumn(xmlDoc,1);
    idTxt.disabled = true;
    oznakaTxt.value = getColumn(xmlDoc,2);
    nazivTxt.value = getColumn(xmlDoc,3);
    oznakaTxt.focus();
  }
  if (tip=="insert") {
    idTxt.focus();
  }
}

function execnalogvrsta(tip,id) {
  if ((tip=="insert") || (tip=="update")) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=nalogvrsta" + tip + "&id=" + idTxt.value + "&oznaka=" + oznakaTxt.value + "&naziv=" + nazivTxt.value,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") {
      detaljidiv.innerHTML = "";
      loadTable("nalogvrsta");
    } else {
      alert(str);
    }
  }  
  if (tip=="delete") {
    var x = confirm("Da li ste sigurni da želite brisanje ?");
    if (x==true) {
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=nalogvrsta" + tip + "&id=" + id + "&oznaka=&naziv=",false);
      xmlhttp.send();
      var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
      if (str.substring(0,6)=="Akcija") {
        detaljidiv.innerHTML = "";
        loadTable("nalogvrsta");
      } else {
        alert(str);
      }  
    }
  }  
}


