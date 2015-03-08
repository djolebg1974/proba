function getXMLDoc(sql,id,where) {
  try { 
    xmlhttp=new XMLHttpRequest();
    idsql=""; wheresql="";
    if (id!=null) {
      idsql = "&id=" + id;
    }  
    if (where!=null) {
      wheresql = "&where=" + where;
    }  
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/xmlLoader.jsp?sql=" + sql + idsql + wheresql,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    if (xmlDoc.getElementsByTagName("ERR")[0]) throw xmlDoc.getElementsByTagName("ERR")[0].getElementsByTagName("COL")[0].childNodes[0].nodeValue;
    return xmlDoc;
  } catch(err) {
    throw err;
  }    
}

function getColumn(xmlDoc,colNum) {
  try {
    var str="";
    if(xmlDoc.getElementsByTagName("ROW")[0].getElementsByTagName("COL"+colNum)[0].childNodes[0]!=null) {
      str = xmlDoc.getElementsByTagName("ROW")[0].getElementsByTagName("COL"+colNum)[0].childNodes[0].nodeValue;
      if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+colNum)[0].childNodes[0].nodeValue=="INT") str = formatNumber(str,0,0,true);
      if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+colNum)[0].childNodes[0].nodeValue=="DECIMAL") str = formatNumber(str,0,2,true);
      if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+colNum)[0].childNodes[0].nodeValue=="DATE") str = formatDate(str,true);
    }
    return str;
  } catch(err) {
    throw err;
  }    
}

function fusnotaIspis(fusnota, brredova) {
  try {
    redStr="redova";
    if ((brredova%10==1) && (brredova%100!=11)) redStr="red";
    if ((brredova%10==2) && (brredova%100!=12)) redStr="reda";
    if ((brredova%10==3) && (brredova%100!=13)) redStr="reda";
    if ((brredova%10==4) && (brredova%100!=14)) redStr="reda";
    fusnota.innerHTML = "Ukupno " + brredova + " " + redStr;
  } catch(err) {
    throw err;
  } 
}

function loadTable(table,sql,where) {
  try {
    table.innerHTML = "";
    filter.innerHTML = "";
    naslov.innerHTML = "";
    fusnota.innerHTML = "";
    xmlDoc = getXMLDoc(sql,null,where);
    var colNum = xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNUMBER")[0].childNodes[0].nodeValue;
    var naslovStr = xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    var str = "";
  
    imaFilter=true; try { eval("load" + sql + "filter") } catch(err) { imaFilter=false; }
    if (imaFilter) {
      filter.style.height=25;
      naslovStr += "<br>";
      eval("load" + sql + "filter")();
    } else {
      filter.style.height=0;
    }
  
    str += "<tr color='red'>";
    for (j=1;j<=colNum;j++) {
      str += "<th>";
      str += xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNAME"+j)[0].childNodes[0].nodeValue;
      str += "</th>"; 
    }
    str += "<th><img src='Add.png' alt='novi' title='novi' onClick=load" + sql + "(null,'insert');></th>"  
    str += "<th><img src='Reload.png' alt='osveži' title='osveži' onClick=loadTable(" + table + "'" + sql + "');></th>"    
    str += "</tr>";

    var x=xmlDoc.getElementsByTagName("ROW");

    for (i=0;i<x.length;i++) {
      str += "<tr>";
      for (j=1;j<=colNum;j++) {
        align = "left";
        if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DECIMAL") align="right";
        if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="INT") align="right";
        if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="TINYINT") align="center";
        str += "<td align='" + align + "'>";
        if(x[i].getElementsByTagName("COL"+j)[0].childNodes[0]!=null) {
          if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DECIMAL") str += formatNumber(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue,0,2,true);
          else if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="INT") str += formatNumber(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue,0,0,true);
          else if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DATE") str += formatDate(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue,true);
          else if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="TINYINT") str += formatBoolean(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue);
          else str += x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue;
        }
        str += "</td>"; 
      }
      str += "<td><img name='" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + "' src='Edit.png' alt='izmena' title='izmena' onClick=load" + sql + "(" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + ",'update');></td>"
      str += "<td><img name='" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + "' src='Delete.gif' alt='brisanje' title='brisanje' onClick=exec" + sql + "('delete'," + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + ");></td>"
      str += "</tr>";
    }
    table.innerHTML = str;
    naslov.innerHTML = naslovStr;
    fusnotaIspis(fusnota, x.length);
    sorttable.makeSortable(table);
  } catch(err) {
    alert(err);
  }
}

function loadMenu() {
  try {
    drvodiv.innerHTML = "";
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/menuLoader.jsp",false);
    xmlhttp.send();
    drvodiv.innerHTML = xmlhttp.responseText;
  } catch(err) {
    alert(err);
  }
}

function loadLabel(div,ime,labText,labLeft,labTop,labWidth,txtAlign,fontSize) {
  try {
    str = "<div id='" + ime + "Div1' style='position:absolute; left:" + labLeft + "px; top:" + (labTop+2) + "px; width:" + labWidth + "px; text-align:" + txtAlign + "'>";
    str += "<label id='" + ime + "Lbl' style='font-family:Arial; font-weight:normal; font-size:" + fontSize + "'>" + labText + "</label>";
    str += "</div>";
    div.innerHTML += str;
  } catch(err) {
    throw err;
  }
}

function loadTxtField(div,ime,tip,labText,txtText,labLeft,txtTop,txtLeft,txtWidth,txtSize,tabIndex) {
  try {
    onBlurString="";
    textAlign="left";
    if (tip=="integer") {
      onBlurString = "onblur='this.value=formatNumber(this.value, 0, 0, true);'";
      textAlign = "right";
    }
    if (tip=="decimal") {
      onBlurString = "onblur='this.value=formatNumber(this.value, 0, 2, true);'";
      textAlign = "right";
    }
    str = "<div id='" + ime + "Div1' style='position:absolute; left:" + labLeft + "px; top:" + (txtTop+2) + "px; width:" + (txtLeft - labLeft - 10) + "px; text-align:right'>";
    str += "<label id='" + ime + "Lbl' style='font-family:Arial; font-weight:normal; font-size:14'>" + labText + "</label>";
    str += "</div><div id='" + ime + "Div2' style='position:absolute; left:" + txtLeft + "px; top:" + txtTop + "px; width:" + txtWidth + "px;'>";
    str += "<input id='" + ime + "Txt' style='text-align:" + textAlign + "; border:1px solid; font-family:Arial; font-weight:normal; font-size:14' type='text' size='" + txtSize + "' tabIndex='" + tabIndex + "' " + onBlurString + "></input></div>";
    div.innerHTML += str; 
  } catch (err) {
    throw err;
  }
}

function checkComboBox(txt,cmb,idtxt) {
  try {
    j=0;idtxt.value="";
    for (i=0;i<cmb.options.length;i++) { 
      cmb.options[i].selected=false;
      cmb.options[i].hidden=(cmb.options[i].value.indexOf(txt.value,0)==-1 && cmb.options[i].value!='');
      if (cmb.options[i].value.indexOf(txt.value,0)!=-1 || cmb.options[i].value=='') j++;
    }
    cmb.size=j; if (j>8) size=8;
    cmb.hidden=(j==0);
    if (j==1) { 
      for (i=0;i<cmb.options.length;i++) if (!cmb.options[i].hidden) { cmb.options[i].selected=true; txt.value=cmb.options[i].value;          idtxt.value=cmb.options[i].id;}
        
      var inputs = document.getElementsByTagName("input"); //get all tabable elements
      for(var i=0; i<inputs.length; i++) { //loop through each element
        if(inputs[i].tabIndex == txt.tabIndex+1) { //check the tabindex to see if it's the element we want
          inputs[i].focus(); //if it's the one we want, focus it and exit the loop
          break;
        }
      }
    }
  } catch(err) {
    throw err;
  }  
}

function initializeComboBox(txt,cmb,idtxt) {
  try {
    for (i=0;i<cmb.options.length;i++) if (cmb.options[i].id==idtxt.value) {cmb.options[i].selected=true;txt.value=cmb.options[i].value}
    checkComboBox(txt,cmb,idtxt);
    txt.focus();
  } catch(err) {
    throw err;
  }  
}

function fillAndCloseComboBox(txt,cmb,idtxt) {
  try {
    txt.value=cmb.options[cmb.selectedIndex].value; 
    idtxt.value=cmb.options[cmb.selectedIndex].id;
    cmb.hidden=true;
    for(var i=0; i<inputs.length; i++) { //loop through each element
      if(inputs[i].tabIndex == txt.tabIndex+1) { //check the tabindex to see if it's the element we want
        inputs[i].focus(); //if it's the one we want, focus it and exit the loop
        break;
      }
    }  
  } catch(err) {
    throw err;
  }  
}

function loadComboBox(div,ime,tip,sql,showColumn,labText,txtText,labLeft,txtTop,txtLeft,txtWidth,tabIndex) {
  try {
    xmlDoc = getXMLDoc(sql,null,null);
    str = "<div id='" + ime + "Div1' style='position:absolute; left:" + labLeft + "px; top:" + (txtTop+2) + "px; width:" + (txtLeft - labLeft - 10) + "px; text-align:right'>";
    str += "<label id='" + ime + "Lbl' style='font-family:Arial; font-weight:normal; font-size:14'>" + labText + "</label>";
    str += "</div><div id='" + ime + "Div2' style='position:absolute; left:" + txtLeft + "px; top:" + txtTop + "px; width:" + txtWidth + "px;'>";
    str += "<input id='" + ime + "IdTxt' style='text-align:right; border:1px solid; font-family:Arial; font-weight:normal; font-size:14; width:20%;' type='text' size='2' disabled></input>";  
    str += "<input id='" + ime + "Txt' style='text-align:left; border:1px solid; font-family:Arial; font-weight:normal; font-size:14; width:80%;' type='text' tabIndex='" + tabIndex + "' onFocus='" + ime + "Cmb.hidden=false'; onBlur='fillAndCloseComboBox(" + ime + "Txt, " + ime + "Cmb," + ime + "IdTxt)'; onKeyUp='checkComboBox(" + ime + "Txt," + ime + "Cmb," + ime + "IdTxt)';></input>";
    str += "</div><div id='" + ime + "Div3' style='z-index:9999; position:absolute; left:" + txtLeft + "px; top:" + (txtTop+20) + "px; width:" + txtWidth + "px'>";
    str += "<select id='" + ime + "Cmb' style='border:1px solid; font-family:Arial; font-weight:normal; font-size:14; width:100%;' size='8' hidden='true' onChange='fillAndCloseComboBox(" + ime + "Txt, " + ime + "Cmb," + ime + "IdTxt)';>";
    var x=xmlDoc.getElementsByTagName("ROW");
    for (i=0;i<x.length;i++) str += "<option id='" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + "'>" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + ":" + x[i].getElementsByTagName("COL" + showColumn)[0].childNodes[0].nodeValue + "</option>";
    str += "</select></div>";
    div.innerHTML += str; 
  } catch(err) {
    throw err;
  }    
}

function loadPotvrdiBtn(div,btnLeft,btnTop,onClickString,tabIndex) {
  try {
    str = "<div id='potvrdiDiv' style='position:absolute; left:" + btnLeft + "px; top:" + btnTop + "px'>";
    str += "<input name='potvrdiBtn' id='potvrdiBtn' type='button' value='Potvrdi' tabIndex=" + tabIndex + " onClick=" + onClickString + "></div>";
    div.innerHTML += str;
  } catch(err) {
    throw err;
  }  
}

function formatNumber(number, digits, decimalPlaces, withCommas) {
  try {
    number = number.toString();
    var simpleNumber = '';
    // Strips out the dollar sign and commas.
    for (var i = 0; i < number.length; ++i)
      if ("0123456789.".indexOf(number.charAt(i)) >= 0) simpleNumber += number.charAt(i);
    number = parseFloat(simpleNumber);
    if (isNaN(number))      number     = 0;
    if (withCommas == null) withCommas = false;
    if (digits     == 0)    digits     = 1;
    var integerPart = (decimalPlaces > 0 ? Math.floor(number) : Math.round(number));
    var string      = "";
    for (var i = 0; i < digits || integerPart > 0; ++i) {
        // Insert a comma every three digits.
        if (withCommas && string.match(/^\d\d\d/)) string = "," + string;
        string      = (integerPart % 10) + string;
        integerPart = Math.floor(integerPart / 10);
    }
    if (decimalPlaces > 0) {
        number -= Math.floor(number);
        number *= Math.pow(10, decimalPlaces);
        string += "." + formatNumber(number, decimalPlaces, 0);
    }
    return string;
  } catch(err) {
    throw err;
  }    
}

function formatDate(oldStr,fromMySQL) {
  try {
    if (fromMySQL) newStr=oldStr.substring(8,10) + "." + oldStr.substring(5,7) + "." + oldStr.substring(0,4)
    else newStr=oldStr.substring(6,10) + "-" + oldStr.substring(3,5) + "-" + oldStr.substring(0,2);
    return newStr;
  } catch(err) {
    throw err;
  }
}

function formatBoolean(value) {
  try {
    str="<input type='checkbox' disabled readonly " + (value==1?"checked":"") + ">";
    return str;
  } catch(err) {
    throw err;
  }
}

function tableFilter(table,str,rownum) {
  try {
    rowcount=0;
    for(i=0;i<table.rows.length-1;i++) 
      if (table.rows[i+1].cells[rownum-1].innerHTML.indexOf(str)==-1) {
        table.rows[i+1].style.display = "none";
      } else {
        table.rows[i+1].style.display = "";
        rowcount++;
      }
    fusnotaIspis(fusnota,rowcount);
  } catch(err) {
    throw err;
  }  
}

function tableRowSelect(table,broj) {
  try {
    for(i=0;i<table.rows.length-1;i++)
      if (table.rows[i+1].cells[0].innerHTML==broj) for(j=0;j<table.rows[i+1].cells.length;j++) table.rows[i+1].cells[j].style.backgroundColor = '#66FFFF';
      else for(j=0;j<table.rows[i+1].cells.length;j++) table.rows[i+1].cells[j].style.backgroundColor = '#CCFFFF';
  } catch(err) {
    throw err;
  }      
}

function tableRowAdd(table,broj,sql) {
  try {
    currRow=table.insertRow(); 
    for(j=0;j<table.rows[0].cells.length;j++) {
      currRow.insertCell(j); 
      if (table.rows.length>1) {
        currRow.cells[j].align=table.rows[1].cells[j].align;
        currRow.cells[j].innerHTML=table.rows[1].cells[j].innerHTML;
        if (currRow.cells[j].innerHTML.indexOf("<img")!=-1) {
          if (currRow.cells[j].innerHTML.indexOf("Edit.")!=-1)
            currRow.cells[j].innerHTML="<img name='" + broj + "' src='Edit.png' alt='izmena' title='izmena' onClick=load" + sql + "(" + broj + ",'update');>";
          if (currRow.cells[j].innerHTML.indexOf("Delete.")!=-1)
            currRow.cells[j].innerHTML="<img name='" + broj + "' src='Delete.gif' alt='brisanje' title='brisanje' onClick=exec" + sql + "('delete'," + broj + ");>";
        }
      }
    }
    currRow.cells[0].innerHTML=broj;
    //
    //
  } catch(err) {
    throw err;
  }    
}

function remodelDivs(smer) {
  try {
    if ((griddiv.style.height=='50%') && (smer='up')) {
      griddiv.style.height='10%';
      detaljidiv.style.height='81%';
      return;
    }
    if ((griddiv.style.height=='50%') && (smer='down')) {
      griddiv.style.height='86%';
      detaljidiv.style.height='5%';
      return;
    }
    if ((griddiv.style.height=='86%') && (smer='up')) {
      griddiv.style.height='50%';
      detaljidiv.style.height='41%';
      return;
    }
    if ((griddiv.style.height=='10%') && (smer='down')) {
      griddiv.style.height='50%';
      detaljidiv.style.height='41%';
      return;
    }  
  } catch(err) {
    throw err;
  }    
}

function execTable(grid,tableName,tip,id,str) {
  try {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://127.0.0.1:8080/proba/executor.jsp?" + str,false);
    xmlhttp.send();
    var str = xmlhttp.responseText.replace(/[\r\n]/g,"");
    if (str.substring(0,6)=="Akcija") { // ako je sve ok
      if (tip=="insert") tableRowAdd(grid,idTxt.value,tableName);
      if ((tip=="insert") || (tip=="update")) {
        for(i=0;i<grid.rows.length-1;i++) {
          if (grid.rows[i+1].cells[0].innerHTML==id) {
            xmlDoc = getXMLDoc(tableName,id,null);
            for (j=0;j<grid.rows[i+1].cells.length-2;j++) {
              if (grid.rows[0].cells[j].innerHTML.indexOf("<img src")==-1) 
                grid.rows[i+1].cells[j].innerHTML = getColumn(xmlDoc,j+1);
            }
          }
        }
      } else {
        if (tip=="delete") {
          for(i=0;i<grid.rows.length-1;i++) {
            if (grid.rows[i+1].cells[0].innerHTML==id) grid.deleteRow(i+1);
          }
        }
      }          
      tableRowSelect(grid,null);      
      detaljidiv.innerHTML = "";      
    } else {
      throw str;
    }
  } catch(err) {
    throw err;
  }    
}
