package ru.dashboard.backenddashboard.service.Implementation;

import lombok.val;
import org.springframework.stereotype.Service;
import ru.dashboard.backenddashboard.DataAccess.IPriorityRepository;
import ru.dashboard.backenddashboard.entity.Priority;
import ru.dashboard.backenddashboard.search.SearchValues;
import ru.dashboard.backenddashboard.service.Interface.IPriorityService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PriorityService implements IPriorityService {
    protected IPriorityRepository priorityRepository;

    public PriorityService(IPriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @Override
    public List<Priority> findAll() {
        val priority = priorityRepository.findAllByOrderByTitleAsc();
        return priority;
    }

    @Override
    public List<Priority> search(SearchValues searchValues) {
        val priorityes = priorityRepository.findByTitle(searchValues.getText());
        return priorityes;
    }

    @Override
    public Priority findById(Long id) {
        val priority = priorityRepository.findById(id).get();
        return priority;
    }

    @Override
    public Priority add(Priority priority) {
        val priorityR = priorityRepository.save(priority);
        return  priorityR;
    }

    @Override
    public Priority update(Priority priority) {
        val priorityR = priorityRepository.save(priority);
        return  priorityR;
    }

    @Override
    public void deleteById(Long id) {
        priorityRepository.deleteById(id);
    }
}
