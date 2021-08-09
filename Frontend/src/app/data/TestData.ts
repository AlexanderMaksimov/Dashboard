import { title } from 'process';
import { Category } from '../model/Category';
import { Priority } from '../model/Priority';
import { Task } from '../model/Task';

export class TestData {
  public static Categories: Category[] = [
    { id: 1, title: 'Работа', materialIcons: 'work' },
    { id: 2, title: 'Семья', materialIcons: 'family_restroom' },
    { id: 3, title: 'Учеба', materialIcons: 'library_books' },
    { id: 4, title: 'Отдых', materialIcons: 'self_improvement' },
    { id: 5, title: 'Спорт', materialIcons: 'sports_kabaddi' },
    { id: 6, title: 'Еда', materialIcons: 'local_dining' },
    { id: 7, title: 'Финансы', materialIcons: 'business' },
    { id: 8, title: 'Техника', materialIcons: 'commute' },
    { id: 9, title: 'Здоровье', materialIcons: 'favorite' },
    { id: 10, title: 'Автомобиль', materialIcons: 'directions_car' },
  ];

  public static Priorities: Priority[] = [
    { id: 1, title: 'Очент низкий', color: '#B3F0FF' },
    { id: 2, title: 'Низкий', color: '#1EFAC5' },
    { id: 3, title: 'Средний', color: '#0EC11F' },
    { id: 4, title: 'Высокий', color: '#ECEC1A' },
    { id: 5, title: 'Очень высокий', color: '#EC1A1A' },
  ];
  public static Tasks: Task[] = [
    { id: 1, title: 'Good Health', status: true, category: TestData.Categories[8], priority: TestData.Priorities[4], date: new Date("2020-12-31") },
    { id: 2, title: 'Good Work', status: true, category: TestData.Categories[0], priority: TestData.Priorities[2], date: new Date("2020-12-31") },
    { id: 3, title: 'Learn yshu', status: true, category: TestData.Categories[4], priority: TestData.Priorities[3], date: new Date("2020-12-31") },
    { id: 4, title: 'Hope', status: true, category: TestData.Categories[1], priority: TestData.Priorities[3], date: new Date('2020-12-31') },
    { id: 5, title: 'Learn english', status: true, category: TestData.Categories[2], priority: TestData.Priorities[2], date: new Date('2020-12-31') },
    { id: 6, title: 'Learn Web', status: true, category: TestData.Categories[2], priority: TestData.Priorities[1], date: new Date('2020-12-31') },
    { id: 7, title: 'Travels', status: true, category: TestData.Categories[3], priority: TestData.Priorities[1], date: new Date('2020-12-31') },
    { id: 8, title: 'Good Finance', status: true, category: TestData.Categories[6], priority: TestData.Priorities[2], date: new Date('2020-12-31') },
    { id: 9, title: 'Good World', status: false },
    { id: 10, title: 'Good Notepad', status: true, category: TestData.Categories[7], priority: TestData.Priorities[2], date: new Date('2020-12-31') },
    { id: 11, title: 'Test', status: false, category: TestData.Categories[7], priority: TestData.Priorities[4], date: new Date('2020-12-31') },
  ]
}