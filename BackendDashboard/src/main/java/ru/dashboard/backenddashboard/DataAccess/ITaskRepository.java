package ru.dashboard.backenddashboard.DataAccess;

import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.dashboard.backenddashboard.entity.Priority;
import ru.dashboard.backenddashboard.entity.Task;
import ru.dashboard.backenddashboard.search.TaskSearchValues;

import java.util.Date;
import java.util.List;


public interface ITaskRepository extends JpaRepository<Task,Long> {
    List<Task> findAllByOrderByIdAsc();

    List<Task> findAllByOrderByTitleAsc();
    @Query("select z from Task z where :categoryId is null or z.category.id=:categoryId")
    Page<Task> findByFilterС(@Param("categoryId") Long categoryId,
                            Pageable pageable);

    @Query("select z from Task z where " +
            ":title is null or :title='' or lower(z.title) like concat('%',:title,'%') and " +
            ":completed is null or z.completed=:completed and " +
            ":priorityId is null or z.priority.id=:priorityId and " +
            ":categoryId is null or z.category.id=:categoryId")
    Page<Task> findByFilter(@Param("title") String title,
                            @Param("completed") Integer completed,
                            @Param("priorityId") Long priorityId,
                            @Param("categoryId") Long categoryId,
                            Pageable pageable);

    @Query("SELECT z FROM Task z WHERE :title IS NULL OR :title=''or lower(z.title) like lower(concat('%',:title,'%')) order by z.title asc")
    List<Task> findByTitle(@Param("title")String title);
}
