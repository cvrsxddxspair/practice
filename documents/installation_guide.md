# Руководство по установке и запуску WishList Bot

## Локальный запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/yourname/wishlist-bot.git
cd wishlist-bot
```

### 2. Установка зависимостей
```bash
pip install aiogram python-dotenv
```

### 3. Настройка конфигурации
Создайте файл `.env` в корневой директории:
```bash
TELEGRAM_TOKEN=your_telegram_bot_token_here
```

### 4. Инициализация базы данных
```bash
python -c "import db_controller; db_controller.init_db()"
```

### 5. Запуск бота
```bash
python bot.py
```
