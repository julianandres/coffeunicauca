
package co.edu.unicauca.coffeuav.controller;


import co.edu.unicauca.coffeuav.data.PlantDTO;
import co.edu.unicauca.coffeuav.repository.NativeQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
public class DataController {

    @Autowired
    private NativeQueryRepository nativeQueryRepository;

    @Autowired
    private ServletContext servletContext;

    @GetMapping("/getPlantsToComplete")
    public List<PlantDTO> getPlantsToComplete(@RequestParam(required = false) Integer codLote,@RequestParam(required = false) Integer maxId,@RequestParam(required = false) Integer minId) {
        codLote=codLote!=null?codLote:3;
        return nativeQueryRepository.findPlantsNotCompleted(codLote,maxId,minId);
    }

    @PostMapping("/enviarDatosPlanta")
    public String enviarDatosPlanta(@RequestBody String data,@RequestParam Integer id) {
        nativeQueryRepository.actualizarValoresActualesPlanta(data,id);
        return "OK";
    }

    private void evaluarPath(List<String> paths, String pathActual, File file){
        if(file.isFile()){
            paths.add(file.getAbsolutePath());
        }else{
            Arrays.stream(file.listFiles()).forEach(subArchivo -> {
                evaluarPath(paths,null,subArchivo);
            });
        }
    }
    @GetMapping("/gestionarArchivos")
    public void gestionarArchivos() {
        URL res = null;
        res = servletContext.getClassLoader().getResource("static");

        System.out.println(res.getPath());
        File fileTest = new File(res.getPath() + "/missions");
        File[] files = fileTest.listFiles();
        List<String> strings = new ArrayList<>();
        Arrays.stream(files).forEach(file -> {
            evaluarPath(strings, null, file);
        });
        for (String filePath : strings) {

            File file = new File(filePath);
            File parentFile = file.getParentFile();
            if (file != null&&filePath.endsWith(".waypoints")) {
                FileReader fr = null;
                BufferedReader br = null;
                List<String> lineas = new ArrayList<String>();
                String cabecera = "latitude,longitude,altitude(m),heading(deg),curvesize(m),rotationdir,gimbalmode,gimbalpitchangle,actiontype1,actionparam1,actiontype2,actionparam2,actiontype3,actionparam3,actiontype4,actionparam4,actiontype5,actionparam5,actiontype6,actionparam6,actiontype7,actionparam7,actiontype8,actionparam8,actiontype9,actionparam9,actiontype10,actionparam10,actiontype11,actionparam11,actiontype12,actionparam12,actiontype13,actionparam13,actiontype14,actionparam14,actiontype15,actionparam15";
                lineas.add(cabecera);
                try {
                    // Apertura del fichero y creacion de BufferedReader para poder
                    // hacer una lectura comoda (disponer del metodo readLine()).
                    InputStream impt = new FileInputStream(file);
                    BufferedInputStream bufferedinputstream = new BufferedInputStream(impt);

                    // Lectura del fichero
                    int linea;
                    int i = 0;
                    int content;
                    String salida;
                    content = 0;
                    salida = "kjuliooooo";
                    while ((content = bufferedinputstream.read()) != -1) {
                        // convert to char and display it
                        salida += (char) content;
                    }
                    System.out.println(salida);
                    String delimiter2 = "\n";
                    String[] temp2;
                    temp2 = salida.split(delimiter2);
                    System.out.println(temp2.length);
                    for (int a = 0; a < temp2.length; a++) {
                        if (a > 2) {
                            String str = temp2[a];
                            String delimiter = "\t";
                            String[] temp;
                            temp = str.split(delimiter);
                            System.out.println(temp[3]);
                            if (temp[3].equals("16")) {
                                String latitud, longitud, altitud;
                                latitud = temp[8];
                                longitud = temp[9];
                                altitud = temp[10];
                                String line = latitud + "," + longitud + "," + altitud + ",0,0.2,0,0,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0";
                                lineas.add(line);
                                System.out.println(line);
                            }
                        }
                    }
                    FileWriter fichero = null;
                    PrintWriter pw = null;
                    try {
                        String nombreext[] = file.getName().split("\\.");
                        String nombreDestino=parentFile.getAbsolutePath()+"/" + nombreext[0] + ".csv";
                        fichero = new FileWriter(nombreDestino);
                        pw = new PrintWriter(fichero);

                        for (int f = 0; f < lineas.size(); f++) {
                            pw.println(lineas.get(f));
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    } finally {
                        try {
                            // Nuevamente aprovechamos el finally para
                            // asegurarnos que se cierra el fichero.
                            if (null != fichero) {
                                fichero.close();
                            }
                        } catch (Exception e2) {
                            e2.printStackTrace();
                        }
                    }

                    try {

                    } catch (Exception e) {
                        System.out.println("hubo un erro " + e.getCause());
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    // En el finally cerramos el fichero, para asegurarnos
                    // que se cierra tanto si todo va bien como si salta
                    // una excepcion.
                    try {
                        if (null != fr) {
                            fr.close();
                        }
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }

            } else {
                System.out.println("es nulooo");
            }
        }
    }

}
