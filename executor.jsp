<%@ page import="java.sql.*" %>
<%@ page import="java.net.*" %>
<%@ page import="proba.client.*" %>
<%@ page import="com.mysql.jdbc.*" %>
<%@ page contentType="text/html; charset=windows-1250" %>
<%  
    request.setCharacterEncoding("UTF-8");
    java.sql.Connection conn = null;
    try {
      String akcija=request.getParameter("akcija").trim();
      Class.forName("com.mysql.jdbc.Driver").newInstance();
      conn = DriverManager.getConnection("jdbc:mysql://localhost/test?" +
          "user=root&password=service");

      if (akcija.equals("nalogvrstaupdate") || akcija.equals("nalogvrstainsert") || akcija.equals("nalogvrstadelete")) {
        String id=request.getParameter("id").trim();
        String oznaka=request.getParameter("oznaka").trim();
        String naziv=request.getParameter("naziv").trim();
        if (akcija.equals("nalogvrstaupdate")) {
          conn.createStatement().execute("update nalogvrsta set oznaka='" + oznaka + "', naziv='" + naziv + "' where id=" + id);        
        } else if (akcija.equals("nalogvrstainsert")) {
          conn.createStatement().execute("insert into nalogvrsta (id,oznaka,naziv) values (" + id + ",'" + oznaka + "','" + naziv + "')");        
        } else if (akcija.equals("nalogvrstadelete")) {
          conn.createStatement().execute("delete from nalogvrsta where id=" + id);        
        }
      }
  
      if (akcija.equals("pdvstopaupdate") || akcija.equals("pdvstopainsert") || akcija.equals("pdvstopadelete")) {
        String id=request.getParameter("id").trim();
        String naziv=request.getParameter("naziv").trim();
        String stopa=request.getParameter("stopa").trim().replace(",","");
        if (akcija.equals("pdvstopaupdate")) {
          conn.createStatement().execute("update pdvstopa set naziv='" + naziv + "', stopa=" + stopa + " where id=" + id);        
        } else if (akcija.equals("pdvstopainsert")) {
          conn.createStatement().execute("insert into pdvstopa (id,naziv,stopa) values (" + id + ",'" + naziv + "','" + stopa + "')");        
        } else if (akcija.equals("pdvstopadelete")) {
          conn.createStatement().execute("delete from pdvstopa where id=" + id);        
        }
      }
     
      conn.createStatement().execute("commit");
      out.println("Akcija uspešno izvršena");
    }
    catch (SQLException ex) {
      conn.createStatement().execute("rollback");
      out.println("Greška pri upisu u bazu podataka: ");
      out.println(ex.getMessage());
    }
%>   
