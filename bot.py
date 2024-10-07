import asyncio

from aiogram import Router, Bot, Dispatcher, F
from aiogram.types import Message, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import CommandStart
from aiogram.enums import ParseMode
from aiogram.utils.keyboard import InlineKeyboardBuilder

BOT_TOKEN = "7414119481:AAFIrXvjncH6lM7xdK-6JIjBXb55uRVF074"


def webapp_builder() -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    builder.button(text='Играть!', web_app=WebAppInfo(
        url="",
    ))
    return builder.as_markup()

router = Router()

@router.message(CommandStart())
async def start(message: Message) -> None:
    await message.answer('Здарова!',
                        reply_markup=webapp_builder())
    
async def main() -> None:
    bot = Bot(token=BOT_TOKEN, parse_mode=ParseMode.HTML)
    
    dp = Dispatcher()
    dp.include_router(router)
    
    await bot.delete_webhook(True)
    await dp.start_polling(bot)
    
    
if __name__ == '__main__':
    try:
        text = 'Bot started'
        print(f'{text:*^30}')
        asyncio.run(main())
    except:
        text = 'Bot not started'
        print(f'{text:*^30}')
