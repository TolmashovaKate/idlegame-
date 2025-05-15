import { test, expect } from '@playwright/test';

test.describe('Компонент UpBut', () => {
  // Настройка теста перед каждым тестом
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:5173/`); // Перезагружаем страницу с новыми значениями

    // устанавливаем необходимое количество монет
    await page.evaluate(() => {
        localStorage.setItem('players', JSON.stringify([{ 
            name: 'Игрок1',
            coins: 0,
            upgrades:{
              crep: 0,
              sword: 0,
              warrior: 0,
              hair: 0,
              mine: 0,
              time: 0,}
         }]));
      });
      
      await page.reload();
 
      await page.click('text=Продолжить игру');
 
      const input = page.locator('input[placeholder="Введите имя игрока"]');
      await input.fill('Игрок1');
 
      const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click('button:has-text("Начать игру")'),
      ]);
 
      expect(page.url()).toContain('/loading');
  });

  test('Должен открывать и закрывать меню улучшений', async ({ page }) => {
    await page.locator('text=Открыть меню улучшений').click();
    await expect(page.locator('.menu1')).toBeVisible(); // Проверка, что меню открыто
    await page.waitForTimeout(500); // Задержка пол секунды для демонстрации изменения

    await page.locator('text=Закрыть меню').click();
    await expect(page.locator('.menu1')).not.toBeVisible(); // Проверка, что меню закрыто
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения
  });

  test('Должен успешно улучшать Криппера', async ({ page }) => {
    await page.goto(`http://localhost:5173/`); // Перезагружаем страницу с новыми значениями

    // устанавливаем необходимое количество монет
    await page.evaluate(() => {
        localStorage.setItem('players', JSON.stringify([{ 
            name: 'Игрок1',
            coins: 100,
            upgrades:{
              crep: 0,
              sword: 0,
              warrior: 0,
              hair: 0,
              mine: 0,
              time: 0,}
         }]));
      });
      
      await page.reload();
 
      await page.click('text=Продолжить игру');
 
      const input = page.locator('input[placeholder="Введите имя игрока"]');
      await input.fill('Игрок1');
 
      const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click('button:has-text("Начать игру")'),
      ]);
 
      expect(page.url()).toContain('/loading');

    await page.locator('.btn1').click(); // Открываем меню
    await page.waitForTimeout(500); // Задержка пол секунды для демонстрации изменения
    const upgradeButton = page.locator(`text=Стоимость: 15 $`);
    await expect(upgradeButton).toBeVisible();

    await upgradeButton.click(); // Улучшаем Криппера
    await expect(page.locator('.menu1 .h7').nth(0)).toContainText('Улучшить Криппера - 1 ур.'); // Проверяем, что уровень увеличился
    await page.waitForTimeout(500); // Задержка пол секунды для демонстрации изменения
    await expect(page.locator('.h8')).not.toBeVisible(); // Проверяем, что сообщение о максимальном уровне не отображается
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения
  });

  test('Должен показывать предупреждение при недостатке монет', async ({ page }) => {
    // Проверяем работу предупреждения при недостатке монет
    await page.locator('.btn1').click(); // Открываем меню
    const upgradeButton = page.locator(`text=Стоимость: 15 $`);

    // Убедитесь, что кнопка видима и доступна для клика
    await expect(upgradeButton).toBeVisible();
    await expect(upgradeButton).toBeEnabled();

    // Перехватываем alert
    const dialogPromise = new Promise<string>(resolve => {
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`); // Здесь нужно использовать метод message()
            await page.waitForTimeout(1000), // Ждем секунду для демонстрации сообщения
            resolve(dialog.message()); // Сохраняем сообщение в переменной
            dialog.dismiss().catch(() => {});
        });
    });

    await upgradeButton.click(); // Кликаем на кнопку

    // Ждем появления диалога и получаем его сообщение
    const dialogMessage = await dialogPromise;

    // Проверяем текст сообщения в alert
    expect(dialogMessage).toBe('Не хватает монет');

    await page.waitForTimeout(500); // Ждем полсекунды (если это необходимо)

    await page.locator(`text=Закрыть меню`).click(); // закрываем меню
    });
});