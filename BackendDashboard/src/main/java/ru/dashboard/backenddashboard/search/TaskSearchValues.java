package ru.dashboard.backenddashboard.search;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.dashboard.backenddashboard.entity.Category;
import ru.dashboard.backenddashboard.entity.Priority;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class TaskSearchValues {
    protected String title;
    protected Integer completed;
    protected Date date;
    protected Long priorityId;
    protected Long categoryId;

    protected Integer pageNumber;

    protected Integer pageSize;
    protected String sortColumn;
    protected String sortDirection;
}
