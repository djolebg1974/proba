function getXMLDoc(sql,id) {
  xmlhttp=new XMLHttpRequest();
  idsql="";
  if (id!=null) {
    idsql = "&id=" + id;
  }  
  xmlhttp.open("POST","http://127.0.0.1:8080/proba/xmlLoader.jsp?sql=" + sql + idsql,false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML;
  return xmlDoc;
}

function getColumn(xmlDoc,colNum) {
  var str = xmlDoc.getElementsByTagName("ROW")[0].getElementsByTagName("COL"+colNum)[0].childNodes[0].nodeValue;
  if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+colNum)[0].childNodes[0].nodeValue=="INT") str = formatNumber(str,0,0,true);
  if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+colNum)[0].childNodes[0].nodeValue=="DECIMAL") str = formatNumber(str,0,2,true);
  return str;
}

function loadTable(sql) {
  grid.innerHTML = "";
  naslov.innerHTML = "";
  xmlDoc = getXMLDoc(sql,null);
  var colNum = xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNUMBER")[0].childNodes[0].nodeValue;
  var naslovStr = xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
  var str = "";
  str += "<tr color='red'>";
  for (j=1;j<=colNum;j++) {
    str += "<th>";
    str += xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNAME"+j)[0].childNodes[0].nodeValue;
    str += "</th>"; 
  }
  str += "<th><img src='Add.png' alt='novi' title='novi' onClick=load" + sql + "(null,'insert');></th>" 
  str += "<th><img src='Reload.png' alt='osveži' title='osveži' onClick=loadTable('" + sql + "');></th>"    
  str += "</tr>";

  var x=xmlDoc.getElementsByTagName("ROW");

  for (i=0;i<x.length;i++) {
    str += "<tr>";
    for (j=1;j<=colNum;j++) {
      align = "left";
      if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DECIMAL") align="right";
      if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="INT") align="right";
      str += "<td align='" + align + "'>";
      if(x[i].getElementsByTagName("COL"+j)[0].childNodes[0]!=null) {
        if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DECIMAL") str += formatNumber(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue,0,2,true);
        else if (xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="INT") str += formatNumber(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue,0,0,true);
        else str += x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue;
      }
      str += "</td>"; 
    }
    str += "<td><img name='" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + "' src='Edit.png' alt='izmena' title='izmena' onClick=load" + sql + "(" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + ",'update');></td>"
    str += "<td><img name='" + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + "' src='Delete.gif' alt='brisanje' title='brisanje' onClick=exec" + sql + "('delete'," + x[i].getElementsByTagName("COL1")[0].childNodes[0].nodeValue + ");></td>"
    str += "</tr>";
  }
  grid.innerHTML = str;
  naslov.innerHTML = naslovStr;
  fusnota1.innerHTML = "Ukupno " + x.length + " redova";
  if (x.length>10) fusnota2.innerHTML = "Ukupno " + x.length + " redova"; else fusnota2.innerHTML="";
  sorttable.makeSortable(grid);
}

function loadMenu() {
  drvodiv.innerHTML = "";
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("POST","http://127.0.0.1:8080/proba/menuLoader.jsp",false);
  xmlhttp.send();
  drvodiv.innerHTML = xmlhttp.responseText;
}

function loadTxtField(ime,tip,labText,txtText,labLeft,txtTop,txtLeft,txtWidth,txtSize,txtMaxLength) {
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
  str += "<input id='" + ime + "Txt' style='text-align:" + textAlign + "; border:1px solid; font-family:Arial; font-weight:normal; font-size:14' type='text' size='" + txtSize + "' maxlength='" + txtMaxLength + "' " + onBlurString + "></input></div>";
  detaljidiv.innerHTML += str; 
}

function loadPotvrdiBtn(btnLeft,btnTop,onClickString) {
  str = "<div id='potvrdiDiv' style='position:absolute; left:" + btnLeft + "px; top:" + btnTop + "px'>";
  str += "<input name='potvrdiBtn' id='potvrdiBtn' type='button' value='Potvrdi' onClick=" + onClickString + "></div>";
  detaljidiv.innerHTML += str;
}

function formatNumber(number, digits, decimalPlaces, withCommas)
{
  number = number.toString();
  var simpleNumber = '';

    // Strips out the dollar sign and commas.
    for (var i = 0; i < number.length; ++i)
    {
        if ("0123456789.".indexOf(number.charAt(i)) >= 0)
            simpleNumber += number.charAt(i);
    }

    number = parseFloat(simpleNumber);

    if (isNaN(number))      number     = 0;
    if (withCommas == null) withCommas = false;
    if (digits     == 0)    digits     = 1;

    var integerPart = (decimalPlaces > 0 ? Math.floor(number) : Math.round(number));
    var string      = "";

    for (var i = 0; i < digits || integerPart > 0; ++i)
    {
        // Insert a comma every three digits.
        if (withCommas && string.match(/^\d\d\d/))
            string = "," + string;

        string      = (integerPart % 10) + string;
        integerPart = Math.floor(integerPart / 10);
    }

    if (decimalPlaces > 0)
    {
        number -= Math.floor(number);
        number *= Math.pow(10, decimalPlaces);

        string += "." + formatNumber(number, decimalPlaces, 0);
    }

    return string;
}
