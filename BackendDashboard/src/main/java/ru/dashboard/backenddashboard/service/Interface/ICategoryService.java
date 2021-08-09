package ru.dashboard.backenddashboard.service.Interface;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.dashboard.backenddashboard.entity.Category;
import ru.dashboard.backenddashboard.search.SearchValues;

import java.util.List;

@Service
@Transactional
public interface ICategoryService {

    public List<Category> findAll();

    public List<Category> search(SearchValues searchValues);

    public  Category findById(Long id);

    public Category add(Category  category);

    public Category update(Category category);

    public void deleteById(Long id);

}
