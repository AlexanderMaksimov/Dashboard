package ru.dashboard.backenddashboard.controller;

import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.dashboard.backenddashboard.entity.Category;
import ru.dashboard.backenddashboard.search.SearchValues;
import ru.dashboard.backenddashboard.service.Interface.ICategoryService;


import java.util.List;


@RestController
@RequestMapping("/category")
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:4200"})
public class CategoryController {

    private ICategoryService categoryService;
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public List<Category> findAll()
    {
        val categories =   categoryService.findAll();
        System.out.println(categories);
        return  categories;
    }

    @PostMapping("/search")
    public ResponseEntity<List<Category>> search(@RequestBody SearchValues searchValues)
    {
        val categories = ResponseEntity.ok(categoryService.search(searchValues));
        System.out.println(categories);
        return  categories;
    }

    @GetMapping("/id/{id}")
    public  ResponseEntity<Category> findById(@PathVariable Long id)
    {
        Category category=null;
        try{
            category= categoryService.findById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return  ResponseEntity.ok(category);
    }

    @PostMapping("/add")
    public ResponseEntity<Category> add(@RequestBody Category  category)
    {
        if(category.getId()!=null &&category.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(category.getTitle()==null||category.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }
        Category ansver= categoryService.add(category);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Category> update(@RequestBody Category category)
    {
        if(category.getId()!=null &&category.getId()!=0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("redundant param:id Must be Null", HttpStatus.NOT_ACCEPTABLE);
        }
        if(category.getTitle()==null||category.getTitle().trim().length()==0)
        {
            //ACCEPTABLE-приемлимо
            return new ResponseEntity("missed param: title", HttpStatus.NOT_ACCEPTABLE);
        }
        categoryService.update(category);
        //ResponseEntity<Category> ansver= ResponseEntity.ok(categoryRepository.save(category));
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity deleteById(@PathVariable Long id)
    {

        try{
            categoryService.deleteById(id);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity(ex.toString(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
