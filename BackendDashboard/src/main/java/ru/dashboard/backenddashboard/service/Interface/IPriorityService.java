package ru.dashboard.backenddashboard.service.Interface;

import ru.dashboard.backenddashboard.entity.Priority;
import ru.dashboard.backenddashboard.search.SearchValues;

import java.util.List;

public interface IPriorityService {
    public List<Priority> findAll();

    public List<Priority> search(SearchValues searchValues);

    public  Priority findById(Long id);

    public Priority add(Priority  category);

    public Priority update(Priority category);

    public void deleteById(Long id);
}
