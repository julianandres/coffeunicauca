package co.edu.unicauca.coffeuav.data;

public class PlantDTO {
    private int id;
    private  String contorno;
    private  String area;
    private  String volumen;
    private String posicionAlgoritmo;
    private String valoresManuales;

    public String getValoresManuales() {
        return valoresManuales;
    }

    public void setValoresManuales(String valoresManuales) {
        this.valoresManuales = valoresManuales;
    }

    public String getContorno() {
        return contorno;
    }

    public void setContorno(String contorno) {
        this.contorno = contorno;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getVolumen() {
        return volumen;
    }

    public void setVolumen(String volumen) {
        this.volumen = volumen;
    }

    public String getPosicionAlgoritmo() {
        return posicionAlgoritmo;
    }

    public void setPosicionAlgoritmo(String posicionAlgoritmo) {
        this.posicionAlgoritmo = posicionAlgoritmo;
    }
}
