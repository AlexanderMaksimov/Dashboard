package ru.dashboard.backenddashboard.DataAccess;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.dashboard.backenddashboard.entity.Category;
import ru.dashboard.backenddashboard.entity.Priority;

import java.util.List;

//ооп абстракция реализация
@Repository
public interface IPriorityRepository extends JpaRepository<Priority,Long> {

    List<Priority> findAllByOrderByIdAsc();
    List<Priority> findAllByOrderByTitleAsc();
    @Query("SELECT c FROM Category c WHERE :title IS NULL OR :title=''or lower(c.title) like lower(concat('%',:title,'%')) order by c.title asc")
    List<Priority> findByTitle(@Param("title")String title);
}
