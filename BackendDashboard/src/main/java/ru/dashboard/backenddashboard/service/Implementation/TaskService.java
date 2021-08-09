package ru.dashboard.backenddashboard.service.Implementation;

import lombok.val;
import org.hibernate.result.Output;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.dashboard.backenddashboard.DataAccess.ITaskRepository;
import ru.dashboard.backenddashboard.entity.Task;
import ru.dashboard.backenddashboard.search.TaskSearchValues;
import ru.dashboard.backenddashboard.service.Interface.ITaskService;

import javax.transaction.Transactional;
import java.io.Console;
import java.util.List;

@Service
@Transactional
public class TaskService implements ITaskService {
    ITaskRepository taskRepository;
    public  TaskService(ITaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }
    @Override
    public List<Task> findAll() {
        val tasks = taskRepository.findAllByOrderByIdAsc();
        System.out.println(tasks);
        return  tasks;
    }

    @Override
    public Page<Task> search(TaskSearchValues searchValues, PageRequest pageRequest) {
        val tasks=taskRepository.findByFilter(searchValues.getTitle(),
                                                        searchValues.getCompleted(),
                                                        searchValues.getPriorityId(),
                                                        searchValues.getCategoryId(),
                                                        pageRequest);
        val tasks2=taskRepository.findByFilterС( searchValues.getCategoryId(),pageRequest);
        //OutPrintln
        //tasks=tasks2;
        return tasks;
    }

    @Override
    public Task findById(Long id) {
       val priority= taskRepository.findById(id).get();
       return  priority;
    }

    @Override
    public Task add(Task task) {
        val taskR=taskRepository.save(task);
        return taskR;
    }

    @Override
    public Task update(Task task) {
        try {
            val taskR=taskRepository.save(task);
            return taskR;
        }
        catch (Exception ex)
        {
            System.out.println(ex);
            return  null;
        }
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
}
