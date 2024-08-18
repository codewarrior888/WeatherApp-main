# WeatherApp

Приложение для получения текущей погоды и прогноза по введенному городу.

## Деплой на GitHub Pages

Проект развернут и доступен по следующему адресу:
[WeatherApp на GitHub Pages](https://codewarrior888.github.io/WeatherApp-main/)

## Установка и настройка проекта

### 1. Клонировать репозиторий на локальным компьютер
```bash
git clone https://github.com/codewarrior888/WeatherApp-main.git
gh repo clone codewarrior888/WeatherApp-main
```
### 2. Перейти в директорию проекта
```bash
cd WeatherApp-main
```
3. Установка зависимостей
```bash
npm install
```
4. Настроить API ключ для OpenWeatherMap
Для использования API OpenWeatherMap необходимо зарегистрироваться и получить бесплатный API ключ.
https://home.openweathermap.org/users/sign_up

Создайте файл .env в корне проекта и добавьте в него ваш API ключ:
REACT_APP_OPENWEATHERMAP_API_KEY=ваш_ключ_здесь

5. Локальный запуск
```bash
npm run dev
```
Проект будет доступен по адресу http://localhost:9000

6. Сборка проекта
```bash
npm run prod
```
