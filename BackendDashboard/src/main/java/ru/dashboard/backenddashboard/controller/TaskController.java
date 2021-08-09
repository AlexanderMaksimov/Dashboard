package ru.dashboard.backenddashboard.controller;

import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.dashboard.backenddashboard.entity.Task;
import ru.dashboard.backenddashboard.search.TaskSearchValues;
import ru.dashboard.backenddashboard.service.Interface.ITaskService;
import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:4200"}) //разрешить для этого ресурса получать данные с бекенда
public class TaskController {

    private ITaskService taskService;
    public TaskController(ITaskService taskService) {
        this.taskService =taskService;
    }

    @GetMapping("/all")
    public  List<Task> findAll()
    {
        val tasks = taskService.findAll();
        System.out.println(tasks);
        return  tasks;
    }

    @GetMapping("/id/{id}")
    public  ResponseEntity<Task> findById(@PathVariable Long id)
    {
        Task priority=null;
        try{
            priority= taskService.findById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return  ResponseEntity.ok(priority);
    }

    @PostMapping("/search")
    public ResponseEntity<Page<Task>> search(@RequestBody TaskSearchValues searchValues)
    {
        if(searchValues!=null ) {
            Integer pageNumber= searchValues.getPageNumber()==null?null:searchValues.getPageNumber();
            Integer pageSize=searchValues.getPageSize()==null?null:searchValues.getPageSize();
            String sortDirection=searchValues.getSortDirection()==null?null:searchValues.getSortDirection();
            String sortColumn=searchValues.getSortColumn()==null?null:searchValues.getSortColumn();
            val direction =sortDirection==null||sortDirection.length()==0||sortDirection.trim().equals("asc")? Sort.Direction.ASC: Sort.Direction.DESC;
            //сортировка
            Sort sort= Sort.by(direction,sortColumn);
            //объект постраничности
            PageRequest pageRequest= PageRequest.of(pageNumber, pageSize,sort);
            val tasks = ResponseEntity.ok(taskService.search(searchValues,pageRequest));
            System.out.println(tasks);
            return  tasks;
        }
        else {
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }

    }

    @PostMapping("/add")
    public ResponseEntity<Task>  add(@RequestBody Task task)
    {
        if(task==null)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:task Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(task.getId()!=null &&task.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(task.getTitle()==null||task.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }
        taskService.add(task);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Task> update(@RequestBody Task task)
    {
        if(task==null)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:task Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(task.getId()==null &&task.getId()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(task.getTitle()==null||task.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }
        taskService.update(task);
        //ResponseEntity<Task> ansver= ResponseEntity.ok(taskRepository.save(task));
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteByID(@PathVariable Long id)
    {

        try{
            taskService.deleteById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity(HttpStatus.OK);
    }


}


