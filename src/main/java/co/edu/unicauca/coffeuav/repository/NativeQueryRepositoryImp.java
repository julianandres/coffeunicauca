package co.edu.unicauca.coffeuav.repository;

import co.edu.unicauca.coffeuav.data.PlantDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Locale;

@Transactional
@Repository
public class NativeQueryRepositoryImp implements NativeQueryRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<PlantDTO> findPlantsNotCompleted() {
        String sql = "SELECT id, area, volumen, contorno, posicion_algoritmo as posicionAlgoritmo FROM plant WHERE manual_values is null AND data_statistic IS NOT NULL AND volumen>0";
        return em.unwrap(org.hibernate.Session.class).createSQLQuery(sql).setResultTransformer(org.hibernate.transform.Transformers.aliasToBean(PlantDTO.class)).list();
    }
}
