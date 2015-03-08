//-------------------------- stope pdv-a ---------------------------------

function loadpdvstopa(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"naziv","string","Oznaka:","",150,50,250,300,50,2);
    loadTxtField(detaljidiv,"stopa","decimal","Stopa poreza:","",150,80,250,300,10,3);    
    loadPotvrdiBtn(detaljidiv,300,110,"execpdvstopa('" + tip + "',null);",4);
    if (tip=="update") {
      tableRowSelect(grid,broj);
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
  } catch(err) {
    alert(err);
  }      
}

function execpdvstopa(tip,id) {
  try { 
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=pdvstopa&tip=" + tip + "&id=" + idTxt.value + "&naziv=" + nazivTxt.value + "&stopa=" + stopaTxt.value;
    if (tip=="delete") str="akcija=pdvstopa&tip=" + tip + "&id=" + id + "&naziv=&stopa=";
    if (str=="") return;
    execTable(grid,"pdvstopa",tip,id,str);
  } catch(err) {
    alert(err);
  }        
}

//-------------------------- vrste naloga ---------------------------------

function loadnalogvrsta(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"oznaka","string","Oznaka:","",150,50,250,300,20,2);
    loadTxtField(detaljidiv,"naziv","string","Naziv:","",150,80,250,300,50,3);    
    loadPotvrdiBtn(detaljidiv,300,110,"execnalogvrsta('" + tip + "',null);",4);
    if (tip=="update") {
      tableRowSelect(grid,broj);
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
  } catch(err) {
    alert(err);
  }        
}

function execnalogvrsta(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=nalogvrsta&tip=" + tip + "&id=" + idTxt.value + "&oznaka=" + oznakaTxt.value + "&naziv=" + nazivTxt.value;
    if (tip=="delete") str="akcija=nalogvrsta&tip=" + tip + "&id=" + id + "&oznaka=&naziv=";
    if (str=="") return;
    execTable(grid,"nalogvrsta",tip,id,str);
  } catch(err) {
    alert(err);
  }      
}

//-------------------------- SQL izrazi ---------------------------------

function loadsqlizraz(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"oznaka","string","Oznaka:","",150,50,250,300,20,2);
    loadTxtField(detaljidiv,"sqlizraz","string","SQL izraz:","",150,80,250,300,400,3);    
    loadTxtField(detaljidiv,"idpart","string","ID deo:","",150,110,250,300,50,4); 
    loadTxtField(detaljidiv,"naslov","string","Naslov:","",150,140,250,300,50,5); 
    loadPotvrdiBtn(detaljidiv,300,170,"execsqlizraz('" + tip + "',null);",6);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("sqlizraz",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      oznakaTxt.value = getColumn(xmlDoc,2);
      sqlizrazTxt.value = getColumn(xmlDoc,3);
      idpartTxt.value = getColumn(xmlDoc,4);
      naslovTxt.value = getColumn(xmlDoc,5);
      oznakaTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }      
}

function execsqlizraz(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=sqlizraz&tip=" + tip + "&id=" + idTxt.value + "&oznaka=" + oznakaTxt.value + "&sqlizraz=" + sqlizrazTxt.value + "&idpart=" + idpartTxt.value + "&naslov=" + naslovTxt.value;
    if (tip=="delete") str="akcija=sqlizraz&tip=" + tip + "&id=" + id + "&oznaka=&sqlizraz=&idpart=&naslov=";
    if (str=="") return;
    execTable(grid,"sqlizraz",tip,id,str);
  } catch(err) {
    alert(err);
  }    
}

//-------------------------- stavke menija ---------------------------------

function loadmenustavka(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadComboBox(detaljidiv,"subjekat","string","orgjed",2,"Firma:","",150,50,250,180,2);
    loadTxtField(detaljidiv,"naziv","string","Oznaka:","",150,80,250,300,50,3);
    loadComboBox(detaljidiv,"menustavkaotac","string","menustavka",4,"Otac:","",150,110,250,180,4);
    loadTxtField(detaljidiv,"rb","integer","Rb:","",150,140,250,300,5,5);    
    loadTxtField(detaljidiv,"akcija","string","Akcija:","",150,170,250,300,50,6); 
    loadPotvrdiBtn(detaljidiv,300,200,"execmenustavka('" + tip + "',null);",7);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("menustavka",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      subjekatIdTxt.value = getColumn(xmlDoc,2);
      initializeComboBox(subjekatTxt,subjekatCmb,subjekatIdTxt);
      nazivTxt.value = getColumn(xmlDoc,4);
      menustavkaotacIdTxt.value = getColumn(xmlDoc,5);
      initializeComboBox(menustavkaotacTxt,menustavkaotacCmb,menustavkaotacIdTxt);    
      rbTxt.value = getColumn(xmlDoc,7);
      akcijaTxt.value = getColumn(xmlDoc,8);
      nazivTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }        
}

function execmenustavka(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=menustavka&tip=" + tip + 
      "&id=" + idTxt.value + "&subjekat=" + subjekatIdTxt.value + "&naziv=" + nazivTxt.value + 
      "&menustavkaotac=" + menustavkaotacIdTxt.value + "&rb=" + rbTxt.value  + "&akcijaa=" + akcijaTxt.value.replace(/'/g,"''");
    if (tip=="delete") str="akcija=menustavka&tip=" + tip + "&id=" + id + "&subjekat=&naziv=&menustavkaotac=&rb=&akcijaa=";
    if (str=="") return;
    execTable(grid,"menustavka",tip,id,str);
  } catch(err) {
    alert(err);
  }        
}

//-------------------------- komitenti ---------------------------------

function loadkomitent(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"naziv","string","Naziv:","",150,50,250,300,50,2);
    loadTxtField(detaljidiv,"adresa","string","Adresa:","",150,80,250,300,50,3);    
    loadTxtField(detaljidiv,"telefon","string","Telefon:","",150,110,250,150,20,4); 
    loadPotvrdiBtn(detaljidiv,300,200,"execkomitent('" + tip + "',null);",5);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("komitent",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      nazivTxt.value = getColumn(xmlDoc,2);
      adresaTxt.value = getColumn(xmlDoc,3);
      telefonTxt.value = getColumn(xmlDoc,4);
      nazivTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch (err) {
    alert(err);
  }
}

function execkomitent(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=komitent&tip=" + tip + // fali subjekattip
      "&id=" + idTxt.value + "&subjekattip=1&naziv=" + nazivTxt.value + 
      "&adresa=" + adresaTxt.value + "&telefon=" + telefonTxt.value;
    if (tip=="delete") str="akcija=komitent&tip=" + tip + "&id=" + id + "&subjekattip=&naziv=&adresa=&telefon=";
    if (str=="") return;
    execTable(grid,"komitent",tip,id,str);
  } catch(err) {
    alert(err);
  }        
}

function loadkomitentfilter() {
  try {
    loadTxtField(filter,"idfilter","integer","ID:","",100,0,150,50,5,1);
    loadTxtField(filter,"nazivfilter","string","Naziv:","",220,0,260,200,40,2);
    loadTxtField(filter,"adresafilter","string","Adresa:","",540,0,590,120,40,3);  
    filter.innerHTML += "<br><br>";
    idfilterTxt.onkeyup=function(){tableFilter(grid,idfilterTxt.value,1);};
    nazivfilterTxt.onkeyup=function(){tableFilter(grid,nazivfilterTxt.value,2);};
    adresafilterTxt.onkeyup=function(){tableFilter(grid,adresafilterTxt.value,3);};
  } catch(err) {
    alert(err);
  }        
}

//-------------------------- valute i kursevi ---------------------------------

function loadvalutatable() {
  try {
    loadTable(grid,'valuta');
    var newTH = document.createElement('th');
	grid.tHead.rows[0].appendChild(newTH);
	newTH.innerHTML="kursevi";
    for(i=1;i<grid.rows.length;i++) {
      grid.rows[i].insertCell(grid.rows[i].cells.length);
      grid.rows[i].cells[grid.rows[i].cells.length-1].innerHTML="<center><img src='exchange.jpg' alt='kursevi' title='kursevi' onClick='loadvalutakurstable(" + grid.rows[i].cells[0].innerHTML + ")';></center>";
    }
  } catch(err) {
    alert(err);
  } 
}

function loadvalutakursfilter() {
  try {
    loadTxtField(filter,"valutafilter","integer","Valuta:","",350,0,400,50,3,1);
    loadTxtField(filter,"valutaoznakafilter","string","","",450,0,450,50,5,1);
    filter.innerHTML += "<br><br>";
    valutafilterTxt.disabled=true;
    valutaoznakafilterTxt.disabled=true;
  } catch(err) {
    alert(err);
  }        
}

function loadvalutakurstable(valuta) {
  try {
    loadTable(grid,'valutakurs','where vk.valuta=' + valuta);
    valutafilterTxt.value=valuta;
    valutaoznakafilterTxt.value=getColumn(getXMLDoc('valuta',valuta,null),2);
  } catch(err) {
    alert(err);
  } 
}

function loadvalutakurs(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"valuta","integer","Valuta:","",150,50,200,50,3,0);
    loadTxtField(detaljidiv,"valutaoznaka","string","","",250,50,250,50,5,0);
    loadComboBox(detaljidiv,"valutakurstip","string","valutakurstip",2,"Tip kursa:","",150,80,250,180,2);
    loadTxtField(detaljidiv,"datum","date","Datum:","",150,110,250,300,20,3);
    loadTxtField(detaljidiv,"paritet","integer","Paritet:","",150,140,250,300,5,4);
    loadTxtField(detaljidiv,"kurs","decimal","Kurs:","",150,170,250,300,10,5);
    loadPotvrdiBtn(detaljidiv,300,200,"execvalutakurs('" + tip + "',null);",5);
    valutaTxt.value=valutafilterTxt.value;
    valutaTxt.disabled=true;
    valutaoznakaTxt.value=valutaoznakafilterTxt.value;
    valutaoznakaTxt.disabled=true;
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("valutakurs",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      valutakurstipIdTxt.value = getColumn(xmlDoc,3);
      initializeComboBox(valutakurstipTxt,valutakurstipCmb,valutakurstipIdTxt);
      datumTxt.value = getColumn(xmlDoc,4);
      paritetTxt.value = getColumn(xmlDoc,5);
      kursTxt.value = getColumn(xmlDoc,6);
      datumTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }        
}

function execvalutakurs(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=valutakurs&tip=" + tip + "&id=" + idTxt.value + "&valuta=" + valutaTxt.value + "&valutakurstip=" + valutakurstipIdTxt.value + "&datum=" + formatDate(datumTxt.value,false) + "&paritet=" + paritetTxt.value + "&kurs=" + kursTxt.value;
    if (tip=="delete") str="akcija=valutakurs&tip=" + tip + "&id=" + id + "&valuta=&valutakurstip=&datum=&paritet=&kurs=";
    if (str=="") return;
    execTable(grid,"valutakurs",tip,id,str);
  } catch(err) {
    alert(err);
  }      
}

function loadvaluta(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,250,300,5,1);
    loadTxtField(detaljidiv,"oznaka1","string","Oznaka 1:","",150,50,250,300,20,2);
    loadTxtField(detaljidiv,"oznaka2","string","Oznaka 2:","",150,80,250,300,20,3);
    loadTxtField(detaljidiv,"naziv","string","Naziv:","",150,110,250,300,50,4);
    loadPotvrdiBtn(detaljidiv,300,140,"execvaluta('" + tip + "',null);",5);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("valuta",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      oznaka1Txt.value = getColumn(xmlDoc,2);
      oznaka2Txt.value = getColumn(xmlDoc,3);
      nazivTxt.value = getColumn(xmlDoc,4);
      nazivTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }        
}

function execvaluta(tip,id) {
  try {
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=valuta&tip=" + tip + "&id=" + idTxt.value + "&oznaka1=" + oznaka1Txt.value + "&oznaka2=" + oznaka2Txt.value + "&naziv=" + nazivTxt.value;
    if (tip=="delete") str="akcija=valuta&tip=" + tip + "&id=" + id + "&oznaka1=&oznaka2=&naziv=";
    if (str=="") return;
    execTable(grid,"valuta",tip,id,str);
  } catch(err) {
    alert(err);
  }      
}

//-------------------------- korisnici ---------------------------------

function loadkorisnik(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,300,300,5,1);
    loadTxtField(detaljidiv,"username","string","Korsinièko ime:","",150,50,300,300,20,2);
    loadTxtField(detaljidiv,"password","string","Lozinka:","",150,80,300,300,20,3);    
    loadTxtField(detaljidiv,"naziv","string","Naziv:","",150,110,300,300,50,4);    
    loadPotvrdiBtn(detaljidiv,300,140,"execkorisnik('" + tip + "',null);",5);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("pdvstopa",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      usernameTxt.value = getColumn(xmlDoc,2);
      passwordTxt.value = getColumn(xmlDoc,3);
      nazivTxt.value = getColumn(xmlDoc,4);      
      usernameTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }      
}

function execkorisnik(tip,id) {
  try { 
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=korisnik&tip=" + tip + "&id=" + idTxt.value + "&username=" + usernameTxt.value + "&password=" + passwordTxt.value + "&naziv=" + nazivTxt.value;
    if (tip=="delete") str="akcija=korisnik&tip=" + tip + "&id=" + id + "&username=&password=&naziv=";
    if (str=="") return;
    execTable(grid,"korisnik",tip,id,str);
  } catch(err) {
    alert(err);
  }        
}

//-------------------------- kontni planovi ---------------------------------

function loadkontniplan(broj,tip) {
  try {
    detaljidiv.innerHTML = "";
    loadTxtField(detaljidiv,"id","integer","ID:","",150,20,300,300,5,1);
    loadTxtField(detaljidiv,"naziv","string","Naziv:","",150,50,300,300,50,2);    
    loadPotvrdiBtn(detaljidiv,300,80,"execkontniplan('" + tip + "',null);",3);
    if (tip=="update") {
      tableRowSelect(grid,broj);
      xmlDoc = getXMLDoc("kontniplan",broj);
      idTxt.value = getColumn(xmlDoc,1);
      idTxt.disabled = true;
      nazivTxt.value = getColumn(xmlDoc,2);      
      nazivTxt.focus();
    }
    if (tip=="insert") {
      idTxt.focus();
    }
  } catch(err) {
    alert(err);
  }      
}

function execkontniplan(tip,id) {
  try { 
    if ((tip=="delete") && (confirm("Da li ste sigurni da želite brisanje ?")==false)) return;
    var str=""; if ((tip=="insert") || (tip=="update")) id=idTxt.value;
    if ((tip=="insert") || (tip=="update")) str="akcija=kontniplan&tip=" + tip + "&id=" + idTxt.value + "&naziv=" + nazivTxt.value;
    if (tip=="delete") str="akcija=kontniplan&tip=" + tip + "&id=" + id + "&naziv=";
    if (str=="") return;
    execTable(grid,"kontniplan",tip,id,str);
  } catch(err) {
    alert(err);
  }        
}
