package ru.dashboard.backenddashboard.service.Interface;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import ru.dashboard.backenddashboard.entity.Stat;

import java.util.List;

public interface IStatService {
    public Stat getStatIdOne();
    public List<Stat> findAll();
    public List<Stat> allComplitedTotal();
    public Stat findById(Long id);
    public Stat add(Stat stat);
    public Stat update(Stat stat);
    public void deleteById(Long id);
}
