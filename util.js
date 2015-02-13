function loadTable(sql) {
xmlhttp=new XMLHttpRequest();
xmlhttp.open("POST","http://127.0.0.1:8080/proba/xmlLoader.jsp?sql=" + sql,false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
//alert (xmlDoc).value;

var colNum = xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNUMBER")[0].childNodes[0].nodeValue

  document.write("<tr color='red'>");
  for (j=1;j<=colNum;j++) {
    document.write("<th>");
    document.write(xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLNAME"+j)[0].childNodes[0].nodeValue);
    document.write("</th>"); 
  }
  document.write("</tr>");

var x=xmlDoc.getElementsByTagName("ROW");

for (i=0;i<x.length;i++)
  {
  document.write("<tr onClick=changeTableColor();>");
  for (j=1;j<=colNum;j++) {
  align=xmlDoc.getElementsByTagName("COLNAMES")[0].getElementsByTagName("COLTYPE"+j)[0].childNodes[0].nodeValue=="DECIMAL"?"right":"left";
  document.write("<td align='" + align + "'>");
  document.write(x[i].getElementsByTagName("COL"+j)[0].childNodes[0].nodeValue);
  document.write("</td>"); 
  }
  document.write("</tr>");
  }
}

function clearDiv() {
  griddiv.innerHTML = "Dimèe majmune";
}
