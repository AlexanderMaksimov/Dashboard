package ru.dashboard.backenddashboard.service.Implementation;

import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.dashboard.backenddashboard.DataAccess.IStatRepository;
import ru.dashboard.backenddashboard.entity.Stat;
import ru.dashboard.backenddashboard.service.Interface.IStatService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class StatService implements IStatService {
    IStatRepository statRepository;
    public StatService(IStatRepository statRepository){
        this.statRepository=statRepository;
    }
    @Override
    public Stat getStatIdOne() {
        val stat = statRepository.findById((long) 1).get();
        System.out.println(stat);
        return  stat;
    }

    @Override
    public List<Stat> findAll() {
        val stats = statRepository.findAllByOrderByIdAsc();
        System.out.println(stats);
        return  stats;
    }

    @Override
    public List<Stat> allComplitedTotal() {
        val stats = statRepository.findAllByOrderByCompletedTotalAsc();
        System.out.println(stats);
        return  stats;
    }

    @Override
    public Stat findById(Long id) {
       val stat= statRepository.findById(id).get();
       return stat;
    }

    @Override
    public Stat add(Stat stat) {
        val statR= statRepository.save(stat);
        return statR;
    }

    @Override
    public Stat update(Stat stat) {
        val statR= statRepository.save(stat);
        return statR;
    }

    @Override
    public void deleteById(Long id) {
        statRepository.deleteById(id);
    }
}
