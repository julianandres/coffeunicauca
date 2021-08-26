package co.edu.unicauca.coffeuav.repository;

import co.edu.unicauca.coffeuav.data.PlantDTO;

import java.util.List;

public interface NativeQueryRepository {
        public List<PlantDTO> findPlantsNotCompleted();
        public boolean actualizarValoresActualesPlanta(String jsonData, Integer id);
    }
