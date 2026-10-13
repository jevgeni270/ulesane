# Как установить и запустить проект MiniShop

## Вариант 1 — на компьютере (Windows / macOS / Linux)

1. Установи **Node.js 20 или новее** с официального сайта: https://nodejs.org/
2. Распакуй архив `Testimine-main-completed.zip` в отдельную папку.
3. Открой папку `Testimine-main` в VS Code.
4. В VS Code открой **Terminal → New Terminal**.
5. Выполни команды по очереди:

```bash
npm install
npx playwright install chromium
npm test
npx playwright test --project=ui --project=mobile
```

- `npm install` устанавливает зависимости проекта.
- `npx playwright install chromium` устанавливает браузер для UI-тестов.
- `npm test` запускает unit-тесты Jest.
- последняя команда запускает UI-тесты на desktop и mobile.

Для запуска только UI-тестов на компьютере:

```bash
npx playwright test --project=ui
```

Для просмотра HTML-отчёта после тестов:

```bash
npx playwright show-report
```

Для запуска сайта MiniShop отдельно:

```bash
npm run shop
```

Затем открой `http://localhost:4000` в браузере. Остановить сервер можно сочетанием `Ctrl+C` в терминале.

## Вариант 2 — GitHub Codespaces

1. Загрузи папку проекта в собственный GitHub-репозиторий.
2. На GitHub нажми **Code → Codespaces → Create codespace**.
3. В терминале Codespaces выполни команды установки и тестирования из варианта 1.
4. Чтобы CI запускался автоматически, отправляй изменения через `git push`. Открой вкладку **Actions**, выбери запуск **UI tests**. HTML-отчёт находится в разделе **Artifacts**.

## Если не работает

- `node` или `npm` не найдены: установи Node.js и перезапусти VS Code.
- Playwright сообщает, что браузер не установлен: выполни `npx playwright install chromium`.
- Порт 4000 занят: останови старый сервер сочетанием `Ctrl+C` и повтори тесты.
- Если установка зависимостей завершилась с ошибкой, попробуй `npm install` ещё раз и проверь интернет-соединение.
