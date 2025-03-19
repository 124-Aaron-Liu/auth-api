# Telegram Login Widget 設定指南

## 1️⃣ 創建 Telegram 機器人

1. **在 Telegram 搜尋** `@BotFather`。
2. **輸入指令**：
   ```
   /newbot
   ```
3. **設定機器人名稱**（例如 `Auth API Bot`）。
4. **設定機器人使用者名稱**（必須以 `bot` 結尾，例如 `AaronAuthAPIAPI_bot`）。
5. **獲取 Bot Token**，BotFather 會回傳一個 Token（請妥善保存）。

---

## 2️⃣ 設定機器人 Web 登入

### 透過 `/mybots` 設定 **Domain**
1. 在 Telegram 中輸入 `@BotFather`。
2. **輸入指令**：
   ```
   /mybots
   ```
3. 選擇剛剛建立的機器人。
4. 點擊 **「Bot Settings」** → **「Domain」**。
5. 輸入 **你的 HTTPS 網域**（例如 `https://yourdomain.com` 或 `https://xxxxx.ngrok-free.app`）。

📌 **注意**：
- 只能設定 **一個 Domain**，若要更改，請先 `/empty` 清除舊設定。
- 必須使用 **HTTPS**，`http://` 會被拒絕。

如果 `/setdomain` 設定失敗，請先執行：
```sh
/empty  # 清除舊的 Domain 設定
```
然後重新設定 **Domain**。

---

## 3️⃣ 設定前端 Telegram Login Widget

在你的 HTML 檔案中，加入以下程式碼：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>Telegram Login</title>
</head>
<body>
    <h1>使用 Telegram 登入</h1>
    <script async src="https://telegram.org/js/telegram-widget.js?7"
            data-telegram-login="AaronAuthAPIAPI_bot"
            data-size="large"
            data-radius="10"
            data-auth-url="https://yourdomain.com/telegram/login"
            data-request-access="write"
            data-userpic="false"></script>
</body>
</html>
```

📌 **注意**：
- `data-telegram-login="AaronAuthAPIAPI_bot"` 必須與你的機器人使用者名稱一致。
- `data-auth-url` 應該是你的後端 API URL（需為 HTTPS）。

---

## 4️⃣ 測試 Telegram 登入
✅ 重新開啟你的網頁，看看 **Telegram Login 按鈕** 是否可以點擊。
✅ 如果出現 **Web login is currently unavailable**，請檢查 `/setdomain` 是否正確。
✅ 如果 Telegram 無法識別你的機器人，請確認 `data-telegram-login` 名稱是否正確。

---

## 5️⃣ 後端處理（NestJS 範例）

在 NestJS 後端建立一個 `TelegramAuthModule` 來處理驗證。

### 1. 安裝 `@nestjs/passport` & `passport`
```sh
yarn add @nestjs/passport passport passport-telegram
```

### 2. 建立 `telegram.strategy.ts`

```ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-telegram';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor() {
    super({
      botToken: process.env.TELEGRAM_BOT_TOKEN, // 請從 .env 讀取
    });
  }

  async validate(profile: any): Promise<any> {
    return { telegramId: profile.id, username: profile.username };
  }
}
```

### 3. 建立 `telegram-auth.service.ts`

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramAuthService {
  validateUser(payload: any) {
    return { telegramId: payload.id, username: payload.username };
  }
}
```

### 4. 建立 `telegram-auth.controller.ts`

```ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('telegram')
export class TelegramAuthController {
  @Get('login')
  @UseGuards(AuthGuard('telegram'))
  login(@Request() req) {
    return req.user;
  }
}
```

### 5. 註冊 `TelegramAuthModule`

```ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TelegramStrategy } from './telegram.strategy';
import { TelegramAuthController } from './telegram-auth.controller';
import { TelegramAuthService } from './telegram-auth.service';

@Module({
  imports: [PassportModule],
  controllers: [TelegramAuthController],
  providers: [TelegramStrategy, TelegramAuthService],
})
export class TelegramAuthModule {}
```

### 6. 在 `app.module.ts` 引入

```ts
import { Module } from '@nestjs/common';
import { TelegramAuthModule } from './telegram-auth/telegram-auth.module';

@Module({
  imports: [TelegramAuthModule],
})
export class AppModule {}
```

---

## 🎯 總結
- **創建機器人**（@BotFather `/newbot`）並取得token。
- **設定 Domain**（透過 `/mybots` ->`Bot Settings` → `Domain`）。
- **加入 Telegram Login Widget 到前端**。
- **在 NestJS 後端處理驗證**。

這樣就完成了 **Telegram Login** 的完整設定！🚀

