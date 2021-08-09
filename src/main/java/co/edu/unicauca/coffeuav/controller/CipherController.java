
package co.edu.unicauca.coffeuav.controller;


import co.edu.unicauca.coffeuav.data.PlantDTO;
import co.edu.unicauca.coffeuav.repository.NativeQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CipherController {

    @Autowired
    private NativeQueryRepository nativeQueryRepository;

    @GetMapping("/getPlantsToComplete")
    public List<PlantDTO> getPlantsToComplete() {
        return nativeQueryRepository.findPlantsNotCompleted();
    }

}
