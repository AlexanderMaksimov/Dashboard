"use strict";
exports.__esModule = true;
exports.TestData = void 0;
var TestData = /** @class */ (function () {
    function TestData() {
    }
    TestData.Categories = [
        { id: 1, title: 'Работа' },
        { id: 2, title: 'Семья' },
        { id: 3, title: 'Учеба' },
        { id: 4, title: 'Отдых' },
        { id: 5, title: 'Спорт' },
        { id: 6, title: 'Еда' },
        { id: 7, title: 'Финансы' },
        { id: 8, title: 'Техника' },
        { id: 9, title: 'Здоровье' },
        { id: 10, title: 'Автобобиль' },
    ];
    TestData.Priorities = [
        { id: 1, title: 'Очент низкий', color: 'B3F0FF' },
        { id: 2, title: 'Низкий', color: '1EFAC5' },
        { id: 3, title: 'Средний', color: '0EC11F' },
        { id: 4, title: 'Высокий', color: 'ECEC1A' },
        { id: 5, title: 'Очень высокий', color: 'EC1A1A' },
    ];
    TestData.Tascks = [
        { id: 1, title: 'Good Health', status: true, category: TestData.Categories[9], priority: TestData.Priorities[5], date: new Date('2020-31-12') },
        { id: 2, title: 'Good Work', status: true, category: TestData.Categories[1], priority: TestData.Priorities[3], date: new Date('2020-31-12') },
        { id: 3, title: 'Learn yshu', status: true, category: TestData.Categories[5], priority: TestData.Priorities[4], date: new Date('2020-31-12') },
        { id: 4, title: 'Hope', status: true, category: TestData.Categories[2], priority: TestData.Priorities[4], date: new Date('2020-31-12') },
        { id: 5, title: 'Learn english', status: true, category: TestData.Categories[3], priority: TestData.Priorities[3], date: new Date('2020-31-12') },
        { id: 6, title: 'Learn Web', status: true, category: TestData.Categories[3], priority: TestData.Priorities[2], date: new Date('2020-31-12') },
        { id: 7, title: 'Travels', status: true, category: TestData.Categories[4], priority: TestData.Priorities[2], date: new Date('2020-31-12') },
        { id: 8, title: 'Good Finance', status: true, category: TestData.Categories[7], priority: TestData.Priorities[3], date: new Date('2020-31-12') },
    ];
    return TestData;
}());
exports.TestData = TestData;
