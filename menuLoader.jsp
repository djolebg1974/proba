<%@ page import="java.sql.*" %>
<%@ page import="proba.client.*" %>
<%@ page import="com.mysql.jdbc.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%
    try {
      String endString="";
      Class.forName("com.mysql.jdbc.Driver").newInstance();
      java.sql.Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test?" +
          "user=root&password=service");
      java.sql.Statement stmt = conn.createStatement();
      java.sql.ResultSet rs = stmt.executeQuery("select id,naziv,akcija,menustavkaotac from menustavka order by rb");
      out.println("<ol class='tree'>"); 
      while (rs.next()) {
        if (rs.getInt(1)==rs.getInt(4)) {
          out.println(endString); 
          endString="";
        }
        java.sql.Statement stmt1 = conn.createStatement();
        java.sql.ResultSet rs1 = stmt1.executeQuery("select count(*) from menustavka where menustavkaotac=" + rs.getString(1));
        rs1.next();
        if (rs1.getInt(1)==0) {
          out.println("<li class='file'><text onClick=detaljidiv.innerHTML='';" + rs.getString(3) + ";>" + rs.getString(2).trim() + "</text></li>");
        } else {
          out.println("<li><label for='" + rs.getString(2) + "'>" + rs.getString(2).trim() + "</label> <input type='checkbox' id='" + rs.getString(2).trim() + "' /><ol>");
          endString = "</ol></li>" + endString;
        }
        rs1.close();
        stmt1.close();
      }
      out.println(endString + "</ol>");        
    }
    catch (SQLException ex) {
      // handle any errors
      System.out.println("SQLException: " + ex.getMessage());
      System.out.println("SQLState: " + ex.getSQLState());
      System.out.println("VendorError: " + ex.getErrorCode());
    }
    //out.println("</PROBA>");
%>   
