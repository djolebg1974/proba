//-------------------------- stope pdv-a ---------------------------------

function loadpdvstopa(broj,tip) {
  detaljidiv.innerHTML = "";
  loadTxtField("id","integer","ID:","",150,20,250,300,5,5);
  loadTxtField("naziv","string","Oznaka:","",150,50,250,300,50,50);
  loadTxtField("stopa","decimal","Stopa poreza:","",150,80,250,300,10,10);    
  loadPotvrdiBtn(300,110,"execpdvstopa('" + tip + "',null);");
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
}

function execpdvstopa(tip,id) {
  if ((tip=="insert") || (tip=="update")) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=pdvstopa&tip=" + tip + "&id=" + idTxt.value + "&naziv=" + nazivTxt.value + "&stopa=" + stopaTxt.value,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") {
      if (tip=="insert") tableRowAdd(grid,idTxt.value,"pdvstopa");
      for(i=0;i<grid.rows.length-1;i++) {
        if (grid.rows[i+1].cells[0].innerHTML==idTxt.value) {
          xmlDoc = getXMLDoc("pdvstopa",idTxt.value);
          grid.rows[i+1].cells[0].innerHTML = getColumn(xmlDoc,1);
          grid.rows[i+1].cells[1].innerHTML = getColumn(xmlDoc,2);
          grid.rows[i+1].cells[2].innerHTML = getColumn(xmlDoc,3);
        }
      }
      tableRowSelect(grid,null);
      detaljidiv.innerHTML = "";      
    } else {
      alert(str);
    }
  }  
  if (tip=="delete") {
    var x = confirm("Da li ste sigurni da želite brisanje ?");
    if (x==true) {
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=pdvstopa&tip=" + tip + "&id=" + id + "&naziv=&stopa=",false);
      xmlhttp.send();
      var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
      if (str.substring(0,6)=="Akcija") {
        for(i=0;i<grid.rows.length-1;i++) {
          if (grid.rows[i+1].cells[0].innerHTML==id) grid.deleteRow(i+1);
        }
        tableRowSelect(grid,null);      
        detaljidiv.innerHTML = "";
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
}

function execnalogvrsta(tip,id) {
  if ((tip=="insert") || (tip=="update")) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=nalogvrsta&tip=" + tip + "&id=" + idTxt.value + "&oznaka=" + oznakaTxt.value + "&naziv=" + nazivTxt.value,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") {
      if (tip=="insert") tableRowAdd(grid,idTxt.value,"nalogvrsta");
      for(i=0;i<grid.rows.length-1;i++) {
        if (grid.rows[i+1].cells[0].innerHTML==idTxt.value) {
          xmlDoc = getXMLDoc("nalogvrsta",idTxt.value);
          grid.rows[i+1].cells[0].innerHTML = getColumn(xmlDoc,1);
          grid.rows[i+1].cells[1].innerHTML = getColumn(xmlDoc,2);
          grid.rows[i+1].cells[2].innerHTML = getColumn(xmlDoc,3);
        }
      }
      tableRowSelect(grid,null);       
      detaljidiv.innerHTML = "";
    } else {
      alert(str);
    }
  }  
  if (tip=="delete") {
    var x = confirm("Da li ste sigurni da želite brisanje ?");
    if (x==true) {
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=nalogvrsta&tip=" + tip + "&id=" + id + "&oznaka=&naziv=",false);
      xmlhttp.send();
      var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
      if (str.substring(0,6)=="Akcija") {
        for(i=0;i<grid.rows.length-1;i++) {
          if (grid.rows[i+1].cells[0].innerHTML==idTxt.value) {
            xmlDoc = getXMLDoc("nalogvrsta",idTxt.value);
            grid.rows[i+1].cells[0].innerHTML = getColumn(xmlDoc,1);
            grid.rows[i+1].cells[1].innerHTML = getColumn(xmlDoc,2);
            grid.rows[i+1].cells[2].innerHTML = getColumn(xmlDoc,3);
          }
        }
        tableRowSelect(grid,null);       
        detaljidiv.innerHTML = "";
      } else {
        alert(str);
      }  
    }
  }  
}

//-------------------------- SQL izrazi ---------------------------------

function loadsqlizraz(broj,tip) {
  detaljidiv.innerHTML = "";
  loadTxtField("id","integer","ID:","",150,20,250,300,5,5);
  loadTxtField("oznaka","string","Oznaka:","",150,50,250,300,20,20);
  loadTxtField("sqlizraz","string","SQL izraz:","",150,80,250,300,100,100);    
  loadTxtField("idpart","string","ID deo:","",150,110,250,300,50,50); 
  loadPotvrdiBtn(300,140,"execsqlizraz('" + tip + "',null);");
  if (tip=="update") {
    tableRowSelect(grid,broj);
    xmlDoc = getXMLDoc("sqlizraz",broj);
    idTxt.value = getColumn(xmlDoc,1);
    idTxt.disabled = true;
    oznakaTxt.value = getColumn(xmlDoc,2);
    sqlizrazTxt.value = getColumn(xmlDoc,3);
    idpartTxt.value = getColumn(xmlDoc,4);
    oznakaTxt.focus();
  }
  if (tip=="insert") {
    idTxt.focus();
  }
}

function execsqlizraz(tip,id) {
  if ((tip=="insert") || (tip=="update")) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=sqlizraz&tip=" + tip + "&id=" + idTxt.value + "&oznaka=" + oznakaTxt.value + "&sqlizraz=" + sqlizrazTxt.value + "&idpart=" + idpartTxt.value,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") {
      if (tip=="insert") tableRowAdd(grid,idTxt.value,"sqlizraz");
      for(i=0;i<grid.rows.length-1;i++) {
        if (grid.rows[i+1].cells[0].innerHTML==idTxt.value) {
          xmlDoc = getXMLDoc("sqlizraz",idTxt.value);
          grid.rows[i+1].cells[0].innerHTML = getColumn(xmlDoc,1);
          grid.rows[i+1].cells[1].innerHTML = getColumn(xmlDoc,2);
          grid.rows[i+1].cells[2].innerHTML = getColumn(xmlDoc,3);
        }
      }
      tableRowSelect(grid,null);      
      detaljidiv.innerHTML = "";
    } else {
      alert(str);
    }
  }  
  if (tip=="delete") {
    var x = confirm("Da li ste sigurni da želite brisanje ?");
    if (x==true) {
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?akcija=sqlizraz&tip=" + tip + "&id=" + id + "&oznaka=&sqlizraz=&idpart=",false);
      xmlhttp.send();
      var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
      if (str.substring(0,6)=="Akcija") {
        for(i=0;i<grid.rows.length-1;i++) {
          if (grid.rows[i+1].cells[0].innerHTML==idTxt.value) grid.deleteRow(i+1);
        }
        tableRowSelect(grid,null);        
        detaljidiv.innerHTML = "";
      } else {
        alert(str);
      }  
    }
  }  
}
