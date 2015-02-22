<?xml version="1.0" encoding="windows-1250"?>
<%@ page contentType="text/xml" %>
<%@ page import="java.sql.*" %>
<%@ page import="proba.client.*" %>
<%@ page import="com.mysql.jdbc.*" %>
<%@ page pageEncoding="UTF-8"%>
<%
    try {
      String sql = "";
      String naslov = "";
      Class.forName("com.mysql.jdbc.Driver").newInstance();
      java.sql.Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test?" +
          "user=root&password=service");
      java.sql.Statement stmt = conn.createStatement();
      sql = "select sqltekst,naslov,idpart from sqlizraz where oznaka='" + request.getParameter("sql").trim() + "'";
      java.sql.ResultSet rs = stmt.executeQuery(sql);
      rs.first();
      sql = rs.getString(1);
      naslov = rs.getString(2).trim();
      if (request.getParameter("id")!=null) sql += " " + rs.getString(3).trim() + request.getParameter("id").trim();
      rs.close();
      rs = stmt.executeQuery(sql);
      int colNumber = rs.getMetaData().getColumnCount();    
      out.println("<PROBA>");
      out.println("<COLNAMES>");
      out.println("<COLNUMBER>" + colNumber + "</COLNUMBER>");
      out.println("<TITLE>" + naslov + "</TITLE>");
      for (int i = 1; i <= colNumber; i++)
      { 
         out.println("<COLNAME" + i + ">" + rs.getMetaData().getColumnName(i) + "</COLNAME" + i + ">");
         out.println("<COLTYPE" + i + ">" + rs.getMetaData().getColumnTypeName(i) + "</COLTYPE" + i + ">");
      }
      out.println("</COLNAMES>");
      while (rs.next()) {
        out.println("<ROW>");
        for (int i = 1; i <= colNumber; i++)
        { 
           out.println("<COL" + i + ">" + rs.getString(i) + "</COL" + i + ">");
      }
        out.println("</ROW>");
      }
    }
    catch (SQLException ex) {
      // handle any errors
      System.out.println("SQLException: " + ex.getMessage());
      System.out.println("SQLState: " + ex.getSQLState());
      System.out.println("VendorError: " + ex.getErrorCode());
    }
    out.println("</PROBA>");
%>   
