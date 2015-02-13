import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Srle
 */
public class NalogVrstaTable implements Sifarnik {

  private int id = 0;
  private String oznaka;

  /**
   * @return the oznaka
   */
  public String getOznaka() {
    return oznaka;
  }

  /**
   * @param oznaka
   *          the oznaka to set
   */
  public void setOznaka(String oznaka) {
    this.oznaka = oznaka;
  }

  private String naziv;

  public NalogVrstaTable(int id) throws SQLException {
    try {
      setId(id);
      osvezi();
    }
    catch (SQLException ex) {
      throw new SQLException(ex);
    }
  }

  public String getNaziv() {
    return naziv;
  }

  public void setNaziv(String naziv) {
    this.naziv = naziv;
  }

  public NalogVrstaTable() {
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
    ResultSet rs = Trt.conn.createStatement().executeQuery("select id, oznaka, naziv from nalogvrsta where id=" + getId());
    if (rs.first()) {
      id = rs.getInt(1);
      oznaka = rs.getString(2);
      naziv = rs.getString(3);
    }
    else {
      ResultSet rs1 = Trt.conn.createStatement().executeQuery("select max(id) from nalogvrsta");
      id = (rs1.first() ? rs1.getInt(1) : 0) + 1;
      rs1.close();
    }
    rs.close();
  }

  @Override
  public void novi() throws SQLException {
    Trt.conn.createStatement().execute(
        "insert into nalogvrsta(id, oznaka, naziv) values (" + getId() + ",'" + getOznaka() + "','" + getNaziv() + "')");
    Trt.conn.createStatement().execute("commit");
  }

  @Override
  public void izmena() throws SQLException {
    Trt.conn.createStatement().execute(
        "update nalogvrsta set oznaka='" + getOznaka() + ", naziv='" + getNaziv() + "' where id=" + getId());
    Trt.conn.createStatement().execute("commit");
  }

  @Override
  public void brisanje() throws SQLException {
    Trt.conn.createStatement().execute(
        "delete from nalogvrsta where id=" + getId());
    Trt.conn.createStatement().execute("commit");
  }

}
