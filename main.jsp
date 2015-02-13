<html>

<head>
<script language="JavaScript" type="Text/JavaScript">
function callJSP () {
  var jsp = new XMLHttpRequest();
  jsp.open("GET","http://127.0.0.1:8080/proba/main.jsp",false);
  jsp.send();
  //alert(jsp.responseText);
  row = tabela.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

// Add some text to the new cells:
cell1.innerHTML = "NEW CELL1";
cell2.innerHTML = "NEW CELL2";
}
</script>


<title>NAZIV</title>

</head>

<body onload="callJSP()">
<div style="position: absolute; left: 400px; top: 500 px; width: 100px; height: 100px; z-index: 3" id="layer1">
   <input name="x" id="x" type="button" disabled="true" value="x">
</div>
<div style="position: absolute; left: 50px; top: 100 px; width: 100px; height: 100px; z-index: 2" id="layer2">
   <input name="trt" id="trt" type="button" value="TRT">
</div>
<br><br>
<div style="position: absolute; left: 50px; top: 100 px; width: 300px; height: 400px; z-index: 2" id="layer2">
<table id="tabela" border="0"  style="width:50%"><tr>
<th>Kolona 1</th><th>Kolona 2</th></tr>

</table>
</div>

<div style="position: absolute; left: 200px; top: 100 px; width: 100px; height: 100px; z-index: 2" id="layer3">
   <input name="mrt" id="mrt" type="button" value="MRT" onClick="callJSP()">
</div>

</body>

</html>
