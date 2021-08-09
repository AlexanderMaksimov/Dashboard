package ru.dashboard.backenddashboard.service.Interface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import ru.dashboard.backenddashboard.entity.Task;
import ru.dashboard.backenddashboard.search.TaskSearchValues;
import java.util.List;

public interface ITaskService {
    public List<Task> findAll();

    public Page<Task> search(TaskSearchValues searchValues, PageRequest pageRequest);

    public  Task findById(Long id);

    public Task add(Task task);

    public Task update(Task task);

    public void deleteById(Long id);
}
