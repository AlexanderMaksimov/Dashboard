package ru.dashboard.backenddashboard.DataAccess;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.dashboard.backenddashboard.entity.Category;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category,Long> {

    List<Category> findAllByOrderByIdAsc();
    List<Category> findAllByOrderByTitleAsc();
    @Query("SELECT c FROM Category c WHERE :title IS NULL OR :title=''or lower(c.title) like lower(concat('%',:title,'%')) order by c.title asc")
    List<Category> findByTitle(@Param("title")String title);
}
