package co.edu.unicauca.coffeuav.repository;

import co.edu.unicauca.coffeuav.data.PlantDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
        String sql = "SELECT id, area, volumen, contorno, posicion_algoritmo as posicionAlgoritmo, manual_values AS valoresManuales FROM plant WHERE  data_statistic IS NOT NULL AND volumen>0 limit 10";
        return em.unwrap(org.hibernate.Session.class).createSQLQuery(sql).setResultTransformer(org.hibernate.transform.Transformers.aliasToBean(PlantDTO.class)).list();

    }
    @Override
    public boolean actualizarValoresActualesPlanta(String jsonData, Integer id) {
        boolean retorno = false;
        em.unwrap(org.hibernate.Session.class)
                .createSQLQuery("UPDATE plant SET manual_values = :jsonData where id=:id")
                .setParameter("jsonData", jsonData)
                .setParameter("id", id)
                .executeUpdate();
        retorno = true;
        return retorno;
    }
}
