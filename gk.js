function loadgktable() {
  try {
    loadTable(grid,'gk');
    var newTH = document.createElement('th');
	grid.tHead.rows[0].appendChild(newTH);
	newTH.innerHTML="knji�enje";
    for(i=1;i<grid.rows.length;i++) {
      grid.rows[i].insertCell(grid.rows[i].cells.length);
      grid.rows[i].cells[grid.rows[i].cells.length-1].innerHTML="<center><img src='book.jpg' alt='knji�enje' title='knji�enje' onClick='alert(" + grid.rows[i].cells[0].innerHTML + ")';></center>";
    }
  } catch(err) {
    alert(err);
  } 
}
