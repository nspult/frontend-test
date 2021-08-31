Есть лендинг.
И есть дизайн - https://www.figma.com/file/PHW7uFx7qo4r6MIl4mxOkI/%D0%9F%D1%80%D0%B8%D0%B3%D0%BB%D0%B0%D1%88%D0%B0%D0%B5%D0%BC-%D0%B2-%D0%BA%D0%BB%D1%83%D0%B1?node-id=0%3A1 (актуальны только макеты с черным фоном)

Небольшая легенда - был один frontend-разработчик, который сделал этот лендинг и оставил не все исходники от css/js, также некоторые файлы лежат не совсем по-человечески.

Необходимо развернуть себе локально лендинг и доделать его в соответствии с ТЗ ниже.

ТЗ по верстке:
1. Найти несоответствия в верстке по сравнению с дизайном, если они есть. Если есть - поправить.
2. Блок с классом "menu runner" сделать бегущей строкой.

ТЗ по JS:
1. Добавить валидацию полей формы, в том числе маску для телефона
2. Добавить hidden-поле "brilliantClubCard" к форме, значение которого лежит в атрибуте "data-brilliant-card"
3. При отправке формы:

   а) Должен выполняться post-запрос к "/api/registration.php"
   
   б) Должна отправляться аналитика с событием "form-submit-success-card-registration"
   
   в) Показываться модальное окно (шаблон - clubCardsSuccess), после открытия которого спустя 5 секунд должен происходить редирект на pult.ru

Сборка осуществляется через "npm run build:dev".

Результат выложить на github.

Необязательно:
Если у вас возникли рекомендации/замечания по улучшению кода лендинга, обязательно напишите их.
