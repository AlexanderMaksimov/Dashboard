package ru.dashboard.backenddashboard.DataAccess;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dashboard.backenddashboard.entity.Priority;
import ru.dashboard.backenddashboard.entity.Stat;

import java.util.List;


public interface IStatRepository extends JpaRepository<Stat,Long> {
    List<Stat> findAllByOrderByIdAsc();

    List<Stat> findAllByOrderByCompletedTotalAsc();

    List<Stat> findAllByOrderByUncompletedTotalAsc();
}
