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
      else if (akcija.equals("kontniplan")) {
        String id=request.getParameter("id").trim();
        String naziv=request.getParameter("naziv").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update kontniplan set naziv='" + naziv + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into kontniplan (id,naziv) values (" + id + ",'" + naziv + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from kontniplan where id=" + id);        
        }
      }  
      else if (akcija.equals("pdvstopa")) {
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

      else if (akcija.equals("sqlizraz")) {
        String id=request.getParameter("id").trim();
        String oznaka=request.getParameter("oznaka").trim();
        String sqlizraz=request.getParameter("sqlizraz").trim();
        String idpart=request.getParameter("idpart").trim();
        String naslov=request.getParameter("naslov").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update sqlizraz set sqltekst='" + sqlizraz + "', oznaka='" + oznaka + "', idpart='" + idpart + "', naslov='" + naslov + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into sqlizraz (id,oznaka,sqltekst,idpart,naslov) values (" + id + ",'" + oznaka + "','" + sqlizraz + "','" + idpart + "','" + naslov + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from sqlizraz where id=" + id);        
        }
      }

      else if (akcija.equals("menustavka")) {
        String id=request.getParameter("id").trim();
        String subjekat=request.getParameter("subjekat").trim();
        String naziv=request.getParameter("naziv").trim();
        String menustavkaotac=request.getParameter("menustavkaotac").trim();
        String rb=request.getParameter("rb").trim();
        String akcijaa=request.getParameter("akcijaa").trim();        
        if (tip.equals("update")) {
          conn.createStatement().execute("update menustavka set subjekat=" + subjekat + ", naziv='" + naziv + "', menustavkaotac=" + menustavkaotac + ", rb=" + rb + ", akcija='" + akcijaa + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into menustavka (id,subjekat,naziv,menustavkaotac,rb,akcija) values (" + id + "," + subjekat + ",'" + naziv + "'," + menustavkaotac + "," + rb + ",'" + akcijaa + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from menustavka where id=" + id);        
        }
      }

      else if (akcija.equals("komitent")) {
        String id=request.getParameter("id").trim();
        String subjekattip="1"; // kuc kuc
        String naziv=request.getParameter("naziv").trim();
        String adresa=request.getParameter("adresa").trim();
        String telefon=request.getParameter("telefon").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update subjekat set subjekattip=" + subjekattip + ", naziv='" + naziv + "', adresa='" + adresa + "', telefon='" + telefon + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into subjekat (id,subjekattip,naziv,adresa,telefon,subjekatotac) values (" + id + "," + subjekattip + ",'" + naziv + "','" + adresa + "','" + telefon + "'," + id + ")");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from subjekat where id=" + id);        
        }
      }
 
      else if (akcija.equals("valuta")) {
        String id=request.getParameter("id").trim();
        String oznaka1=request.getParameter("oznaka1").trim();
        String oznaka2=request.getParameter("oznaka2").trim();
        String naziv=request.getParameter("naziv").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update valuta set oznaka1='" + oznaka1 + "', oznaka2='" + oznaka2 + "', naziv='" + naziv + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into valuta (id,oznaka1,oznaka2,naziv) values (" + id + ",'" + oznaka1 + "','" + oznaka2 + "','" + naziv + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from valuta where id=" + id);        
        }
      }   
      
      else if (akcija.equals("valutakurs")) {
        String id=request.getParameter("id").trim();
        String valuta=request.getParameter("valuta").trim();
        String valutakurstip=request.getParameter("valutakurstip").trim();
        String datum=request.getParameter("datum").trim();
        String paritet=request.getParameter("paritet").trim();
        String kurs=request.getParameter("kurs").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update valutakurs set valutakurstip=" + valutakurstip + ", datum='" + datum + "', paritet=" + paritet + ", kurs=" + kurs + " where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into valutakurs (id,valuta,valutakurstip,datum,paritet,kurs) values (" + id + "," + valuta + "," + valutakurstip + ",'" + datum + "'," + paritet + "," + kurs + ")");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from valutakurs where id=" + id);        
        }
      }       
      
      else if (akcija.equals("korisnik")) {
        String id=request.getParameter("id").trim();
        String username=request.getParameter("username").trim();
        String password=request.getParameter("password").trim();
        String naziv=request.getParameter("naziv").trim();
        if (tip.equals("update")) {
          conn.createStatement().execute("update korisnik set username='" + username + "', password='" + password + "', naziv='" + naziv + "' where id=" + id);        
        } else if (tip.equals("insert")) {
          conn.createStatement().execute("insert into korisnik (id,username,password,naziv) values (" + id + ",'" + username + "','" + password + "','" + naziv + "')");        
        } else if (tip.equals("delete")) {
          conn.createStatement().execute("delete from korisnik where id=" + id);        
        }
      }       
      else throw new SQLException("Nepostojeæa akcija " + akcija + " na bazi");
      
      conn.createStatement().execute("commit");
      out.println("Akcija uspešno izvršena");
    }
    catch (SQLException ex) {
      conn.createStatement().execute("rollback");
      out.println("Greška pri upisu u bazu podataka: ");
      out.println(ex.getMessage());
    }
%>   
