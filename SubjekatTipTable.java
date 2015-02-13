import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Srle
 */
public class SubjekatTipTable implements Sifarnik {

  private int id = 0;
  private String oznaka;
  private String naziv;

  public SubjekatTipTable(int id) throws SQLException {
    try {
      setId(id);
      osvezi();
    }
    catch (SQLException ex) {
      throw new SQLException(ex);
    }
  }

  public String getOznaka() {
    return oznaka;
  }

  public void setOznaka(String oznaka) {
    this.oznaka = oznaka;
  }

  public String getNaziv() {
    return naziv;
  }

  public void setNaziv(String naziv) {
    this.naziv = naziv;
  }

  public SubjekatTipTable() {
    // TODO Auto-generated constructor stub
  }

  @Override
  public int getId() {
    // TODO Auto-generated method stub
    return id;
  }

  @Override
  public void setId(int id) {
    // TODO Auto-generated method stub
    this.id = id;
  }

  @Override
  public void osvezi() throws SQLException {
    ResultSet rs = Trt.conn.createStatement().executeQuery("select id, naziv from subjekattip where id=" + getId());
    if (rs.first()) {
      id = rs.getInt(1);
      naziv = rs.getString(2);
    }
    else {
      ResultSet rs1 = Trt.conn.createStatement().executeQuery("select max(id) from subjekattip");
      id = (rs1.first() ? rs1.getInt(1) : 0) + 1;
      rs1.close();
    }
    rs.close();
  }

  @Override
  public void novi() throws SQLException {
    Trt.conn.createStatement().execute(
        "insert into subjekattip(id, naziv) values (" + getId() + ",'" + getNaziv() + "')");
    Trt.conn.createStatement().execute("commit");
  }

  @Override
  public void izmena() throws SQLException {
    Trt.conn.createStatement().execute(
        "update subjekattip set naziv='" + getNaziv() + "' where id=" + getId());
    Trt.conn.createStatement().execute("commit");
  }

  @Override
  public void brisanje() throws SQLException {
    Trt.conn.createStatement().execute(
        "delete from subjekattip where id=" + getId());
    Trt.conn.createStatement().execute("commit");
  }

}
