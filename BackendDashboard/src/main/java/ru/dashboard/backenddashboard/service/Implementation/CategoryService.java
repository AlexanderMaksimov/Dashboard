package ru.dashboard.backenddashboard.service.Implementation;


import lombok.val;
import org.springframework.stereotype.Service;
import ru.dashboard.backenddashboard.DataAccess.ICategoryRepository;
import ru.dashboard.backenddashboard.entity.Category;
import ru.dashboard.backenddashboard.search.SearchValues;
import ru.dashboard.backenddashboard.service.Interface.ICategoryService;

import javax.transaction.Transactional;
import java.util.List;


// всегда нужно создавать отдельный класс Service для доступа к данным, даже если кажется,
// что мало методов или это все можно реализовать сразу в контроллере
// Такой подход полезен для будущих доработок и правильной архитектуры (особенно, если работаете с транзакциями)
@Service

// все методы класса должны выполниться без ошибки, чтобы транзакция завершилась
// если в методе возникнет исключение - все выполненные операции откатятся (Rollback)
@Transactional
public class CategoryService implements ICategoryService {
    private ICategoryRepository categoryRepository;
    public CategoryService(ICategoryRepository dataAccess)
    {
        this.categoryRepository =dataAccess;
    }

    @Override
    public List<Category> findAll() {
        val categories = categoryRepository.findAllByOrderByTitleAsc();
        System.out.println(categories);
        return  categories;
    }

    @Override
    public List<Category> search(SearchValues searchValues) {
        val categories = categoryRepository.findByTitle(searchValues.getText());
        return  categories;
    }

    @Override
    public Category findById(Long id) {
        val category = categoryRepository.findById(id).get();
        return  category;
    }

    @Override
    public Category add(Category category) {
        val categoryR=  categoryRepository.save(category);
        return categoryR;
    }

    @Override
    public Category update(Category category) {
        val categoryR=  categoryRepository.save(category);
        return categoryR;
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }
}
