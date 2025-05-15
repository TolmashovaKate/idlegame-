import { test, expect } from '@playwright/test';

test.describe('Компонент Creeper', () => {
  // Настройка теста для перехода к компоненту Creeper
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

  test('Должен отображать имя игрока и начальное количество монет', async ({ page }) => {
    await expect(page.locator('h5')).toContainText('Монеты будут получены через: 178');
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации
  });

  test('Кнопка должна отображаться и работать корректно', async ({ page }) => {
    const button = page.locator('Canvas'); 
    await expect(button).toBeVisible();
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения

    // Нажимаем на кнопку
    await button.click();
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения

    // Проверяем, что количество монет обновилось
    await expect(page.locator('h5')).toContainText('Монеты будут получены через: 175');
  });

  test('Должен обновлять количество монет при каждом нажатии на кнопку', async ({ page }) => {
    const button = page.locator('Canvas'); 
    await expect(button).toBeVisible();
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения

    // Нажимаем на кнопку 3 раза с задержкой между нажатиями
    await button.click();
    await page.waitForTimeout(1000); // Задержка 1 секунда
    await button.click();
    await page.waitForTimeout(1000); // Задержка 1 секунда
    await button.click();
    await page.waitForTimeout(1000); // Задержка 1 секунда для демонстрации изменения

    // Проверяем, что количество монет обновилось
    await expect(page.locator('h5')).toContainText('Монеты будут получены через: 175'); 
  });
});
