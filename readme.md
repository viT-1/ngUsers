https://www.codelord.net/blog/archives/

Проект-тест на AngularJS
с виртуальным роутингом,
$http-мокированием json данных,

app определяет только контейнер, в котором работает Angular,
никакой сложной логики, чтобы понадобился appController, нет.

ТЗ: Создайте одностраничное приложение, используя AngularJS.

Приложение имеет 2 роута:

- Cтраница приветствия (оформленная на ваше усмотрение)
- Cтраница, выводящая список пользователей.

Существуют группы, к которым относятся те или иные пользователи (например "Руководители", "Бухгалтерия", "Кадры" и т.д.).
Существуют пользователи, не относящиеся к группе.

Напишите приложение, загружающее данные в формате json c сервера (источник данных не имеет значения — можно свой mock сделать, можно загрузить из общедоступных сервисов) и выводит данные.
Варианты отображения данных:

- Общая таблица
- Список карточек пользователей.

Доп. условия:
- Списки должны быть сортируемыми.
- Должна быть возможность поиска для всех вариантов отображения.
- Карточек пользователей должно быть минимум 300, групп должно минимум 4.
- Обратить внимание на оптимизацию по производительности.