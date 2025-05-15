import { test, expect } from '@playwright/test';

test.describe('Home component - beginGame and NewGame', () => {
  // Перед каждым тестом переходим на главную страницу
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Показывает ошибку при пустом имени в NewGame', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);
  
    // Клик по кнопке "Начать новую игру" на главном экране
    await page.click('text=Начать новую игру');

    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);
  
    // Найти input по placeholder и не заполнять его (оставить пустым)
    const input = page.locator('input[placeholder="Введите имя игрока"]');
  
    // Клик по кнопке "Начать игру" внутри PlayerInput
    await page.click('button:has-text("Начать игру")');
  
    // Проверяем, что появилась ошибка
    await expect(page.locator('text=Имя не может быть пустым!')).toBeVisible();

    // Задержка на 2 секунды, чтобы увидеть результаты
    await page.waitForTimeout(2000);
  });

  test('Показывает ошибку если имя занято в NewGame', async ({ page }) => {
    // Предположим, что "Игрок1" уже существует в localStorage
    await page.evaluate(() => {
      localStorage.setItem('players', JSON.stringify([{ name: 'Игрок1' }]));
    });
    await page.reload();

    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);

    await page.click('text=Начать новую игру');
    await page.fill('input[placeholder="Введите имя игрока"]', 'Игрок1');

    // Задержка на пол секунды, чтобы увидеть результаты
    await page.waitForTimeout(500);

    await page.click('button:has-text("Начать игру")');

    await expect(page.locator('text=Это имя уже занято!')).toBeVisible();

    // Задержка на 2 секунды, чтобы увидеть результаты
    await page.waitForTimeout(2000);
  });

  test('Успешное создание новой игры с уникальным именем', async ({ page }) => {
    // Очистим localStorage для чистоты теста
    await page.evaluate(() => localStorage.clear());
    
    await page.reload();
    
    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);

    await page.click('text=Начать новую игру');

    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);

    const input = page.locator('input[placeholder="Введите имя игрока"]');
     await input.fill('Игрок1');
     
     // Задержка на пол секунды, чтобы увидеть результаты
     await page.waitForTimeout(500);

     const [response] = await Promise.all([
       page.waitForNavigation(),
       page.click('button:has-text("Начать игру")'),
     ]);

     expect(page.url()).toContain('/loading');

    // Задержка на 2 секунды, чтобы увидеть результаты
    await page.waitForTimeout(3000);
  });

  test('Показывает ошибку если имя не существует в beginGame', async ({ page }) => {
    // Подготовим localStorage с игроками
    await page.evaluate(() => {
      localStorage.setItem('players', JSON.stringify([{ name: 'Игрок1' }]));
    });
    
    await page.reload();

    // Задержка на секунду, чтобы увидеть результаты
    await page.waitForTimeout(1000);
 
    await page.click('text=Продолжить игру');
 
    const input = page.locator('input[placeholder="Введите имя игрока"]');
    await input.fill('НеизвестноеИмя');
    // Задержка на пол секунды, чтобы увидеть результаты
    await page.waitForTimeout(500);
 
    await page.click('button:has-text("Начать игру")');
 
    await expect(page.locator('text=Этого имени не существует')).toBeVisible();

    // Задержка на 2 секунды, чтобы увидеть результаты
    await page.waitForTimeout(2000);
 });

  test('Успешное продолжение игры с существующим именем', async ({ page }) => {
     // Подготовим localStorage с игроками
     await page.evaluate(() => {
       localStorage.setItem('players', JSON.stringify([{ name: 'Игрок1' }]));
     });
     
     await page.reload();

     // Задержка на секунду, чтобы увидеть результаты
     await page.waitForTimeout(1000);

     await page.click('text=Продолжить игру');

     const input = page.locator('input[placeholder="Введите имя игрока"]');
     await input.fill('Игрок1');

    // Задержка на пол секунды, чтобы увидеть результаты
    await page.waitForTimeout(500);

     const [response] = await Promise.all([
       page.waitForNavigation(),
       page.click('button:has-text("Начать игру")'),
     ]);

     expect(page.url()).toContain('/loading');

    // Задержка на 2 секунды, чтобы увидеть результаты
    await page.waitForTimeout(3000);
  });
});