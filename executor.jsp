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
      String tip=request.getParameter("tip").trim();
      Class.forName("com.mysql.jdbc.Driver").newInstance();
      conn = DriverManager.getConnection("jdbc:mysql://localhost/test?" +
          "user=root&password=service");

      if (akcija.equals("nalogvrsta")) {
        String id=request.getParameter("id").trim();
        String oznaka=request.getParameter("oznaka").trim();
        String naziv=request.getParameter("naziv").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update nalogvrsta set oznaka='" + oznaka + "', naziv='" + naziv + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into nalogvrsta (id,oznaka,naziv) values (" + id + ",'" + oznaka + "','" + naziv + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from nalogvrsta where id=" + id);        
        }
      }
  
      if (akcija.equals("pdvstopa")) {
        String id=request.getParameter("id").trim();
        String naziv=request.getParameter("naziv").trim();
        String stopa=request.getParameter("stopa").trim().replace(",","");
        if (tip.equals("update")) {
          conn.createStatement().execute("update pdvstopa set naziv='" + naziv + "', stopa=" + stopa + " where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into pdvstopa (id,naziv,stopa) values (" + id + ",'" + naziv + "','" + stopa + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from pdvstopa where id=" + id);        
        }
      }

      if (akcija.equals("sqlizraz")) {
        String id=request.getParameter("id").trim();
        String oznaka=request.getParameter("oznaka").trim();
        String sqlizraz=request.getParameter("sqlizraz").trim();
        String idpart=request.getParameter("idpart").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update sqlizraz set sqltekst='" + sqlizraz + "', oznaka='" + oznaka + "', idpart='" + idpart + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into sqlizraz (id,oznaka,sqltekst,idpart) values (" + id + ",'" + oznaka + "','" + sqlizraz + "','" + idpart + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from sqlizraz where id=" + id);        
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
