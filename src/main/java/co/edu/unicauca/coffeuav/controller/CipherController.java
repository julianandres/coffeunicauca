/**
 * CipherController.java
 *
 * Creada el 16/02/2018, 08:50:06 AM
 *
 * Clase Java desarrollada por William Stibent Possos Navia para la empresa Seratic Ltda el día 16/02/2018.
 *
 * Esta clase es confidencial y para uso de las aplicaciones de la empresa Seratic Ltda.
 * Prohibido su uso sin autorización explícita de personal autorizado de la empresa Seratic Ltda.
 *
 * Para información sobre el uso de esta clase, así como bugs, actualizaciones o mejoras
 * envíar un email a <seratic@seratic.com> o a <william.possos@seratic.com>.
 */
package co.edu.unicauca.coffeuav.controller;

import java.io.FileOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ing. William Stibent Possos Navia <william.possos@seratic.com>
 * @version 1.0
 * @date 16/02/2018
 */
@RestController
@EnableScheduling
public class CipherController {

    private final String TOPIC = "AndroidPushApp";

    @Autowired
    AndroidPushNotificationService androidPushNotificationsService;

    @PostMapping("/enviarImagen")
    public String enviarImagen(@RequestBody MultipartFile files, @RequestHeader(value = "host") String host) {
        System.out.println("Archivo Llegado " + files.getOriginalFilename() + " Host:" + host);
        try {
            FileOutputStream outputStream = new FileOutputStream(files.getOriginalFilename());
            byte[] strToBytes = files.getBytes();
            outputStream.write(strToBytes);
            outputStream.close();
        } catch (Exception e) {
            return "NOT-OK";
        }
        return "OK";
    }

}
