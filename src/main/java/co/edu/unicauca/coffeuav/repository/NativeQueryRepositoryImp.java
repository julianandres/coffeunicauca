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
    public List<PlantDTO> findPlantsNotCompleted(Integer codLote, Integer maxId,Integer minId) {
        String sql = "SELECT p.id, p.area, p.volumen, p.contorno as contorno, p.posicion_algoritmo as posicionAlgoritmo, p.manual_values AS valoresManuales, l.taskid as taskId, l.project,l.south_bound as southBounds, l.north_bound as northBounds, p.centro  FROM plant p JOIN lote l ON l.id=p.cod_lote WHERE p.altura>0 AND p.altura is not null AND p.cod_lote="+codLote+" AND p.id<"+maxId+" AND p.id>"+minId;
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
