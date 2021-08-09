package ru.dashboard.backenddashboard.controller;

import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.dashboard.backenddashboard.entity.Priority;
import ru.dashboard.backenddashboard.search.SearchValues;
import ru.dashboard.backenddashboard.service.Interface.IPriorityService;


import java.util.List;

@RestController
@RequestMapping("/priority")
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:4200"})
public class PriorityController {

    private IPriorityService priorityService;
    public  PriorityController(IPriorityService priorityService)
    {
        this.priorityService =priorityService;
    }
    @GetMapping("/all")
    public  List<Priority> findAll()
    {
        val priority = priorityService.findAll();
        System.out.println(priority);
        return  priority;
    }
    @PostMapping("/search")
    public ResponseEntity<List<Priority>> search(@RequestBody SearchValues searchValues)
    {
        val priorityes = ResponseEntity.ok(priorityService.search(searchValues));
        System.out.println(priorityes);
        return  priorityes;
    }

    @GetMapping("/id/{id}")
    public  ResponseEntity<Priority> findById(@PathVariable Long id)
    {
        Priority priority=null;
        try{
            priority= priorityService.findById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return  ResponseEntity.ok(priority);
    }

    @PostMapping("/add")
    public ResponseEntity<Priority> add(@RequestBody Priority priority)
    {
        if(priority.getId()!=null &&priority.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(priority.getTitle()==null||priority.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }

        ResponseEntity<Priority> ansver= ResponseEntity.ok(priorityService.add(priority));
        return ansver;
    }

    @PutMapping("/update")
    public ResponseEntity<Priority> update(@RequestBody Priority priority)
    {
        if(priority.getId()!=null &&priority.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(priority.getTitle()==null||priority.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }
        priorityService.update(priority);
        //ResponseEntity<Priority> ansver= ResponseEntity.ok(priorityRepository.save(priority));
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public  ResponseEntity deleteById(@PathVariable Long id)
    {

        try{
            priorityService.deleteById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping("/")
    public String a() {
        return "index";
    }

    //JPA Named Queries

}


