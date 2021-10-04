package co.edu.unicauca.coffeuav.data;

public class PlantDTO {
    private int id;
    private  String contorno;
    private  String area;
    private  String volumen;
    private String posicionAlgoritmo;
    private String valoresManuales;
    private String northBounds;
    private String southBounds;
    private Integer project;
    private String taskId;
    private String centro;

    public String getCentro() {
        return centro;
    }

    public void setCentro(String centro) {
        this.centro = centro;
    }

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

    public String getNorthBounds() {
        return northBounds;
    }

    public void setNorthBounds(String northBounds) {
        this.northBounds = northBounds;
    }

    public String getSouthBounds() {
        return southBounds;
    }

    public void setSouthBounds(String southBounds) {
        this.southBounds = southBounds;
    }

    public Integer getProject() {
        return project;
    }

    public void setProject(Integer project) {
        this.project = project;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}
