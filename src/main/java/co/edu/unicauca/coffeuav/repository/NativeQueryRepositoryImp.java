package co.edu.unicauca.coffeuav.repository;

import co.edu.unicauca.coffeuav.data.PlantDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class NativeQueryRepositoryImp implements NativeQueryRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<PlantDTO> findPlantsNotCompleted() {
        String sql = "SELECT id, area, volumen, contorno FROM plant WHERE manual_values is null";
        return em.unwrap(org.hibernate.Session.class).createSQLQuery(sql).setResultTransformer(org.hibernate.transform.Transformers.aliasToBean(PlantDTO.class)).list();
    }
}
