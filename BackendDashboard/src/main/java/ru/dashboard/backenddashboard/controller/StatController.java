package ru.dashboard.backenddashboard.controller;

import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.dashboard.backenddashboard.entity.Stat;
import ru.dashboard.backenddashboard.service.Interface.IStatService;

import java.util.List;

@RestController
@RequestMapping("/stat")
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:4200"})
public class StatController {

    private IStatService statService;
    public StatController(IStatService statService) {
        this.statService =statService;
    }

    @GetMapping("/one")
    public  Stat getStatIdOne()
    {
        val stat = statService.getStatIdOne();
        System.out.println(stat);
        return  stat;
    }

    @GetMapping("/all")
    public  List<Stat> findAll()
    {
        val stats = statService.findAll();
        System.out.println(stats);
        return  stats;
    }
    @GetMapping("/allcomplitedtotal")
    public  List<Stat> allComplitedTotal()
    {
        val stats = statService.allComplitedTotal();
        System.out.println(stats);
        return  stats;
    }
    @GetMapping("/id/{id}")
    public  ResponseEntity<Stat> findById(@PathVariable Long id)
    {
        Stat stat=null;
        try{
            stat= statService.findById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return  ResponseEntity.ok(stat);
    }

    @PostMapping("/add")
    public ResponseEntity<Stat> add(@RequestBody Stat stat)
    {
        if(stat.getId()!=null &&stat.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        ResponseEntity<Stat> ansver= ResponseEntity.ok(statService.add(stat));
        return ansver;
    }

    @PutMapping("/update")
    public ResponseEntity<Stat> update(@RequestBody Stat stat)
    {
        if(stat.getId()!=null &&stat.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        statService.update(stat);
        //ResponseEntity<Stat> ansver= ResponseEntity.ok(statRepository.save(stat));
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id)
    {

        try{
            statService.deleteById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}


