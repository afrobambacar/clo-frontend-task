import { test, expect } from '@playwright/test'

const API_URL = 'https://recruiting-api.marvelousdesigner.com/api/data'
const DEFAULT_PAGE_SIZE = 12
const NETWORK_DELAY = 600

// Mock history state
const mockHistoryState = {
  sort: 'default',
  q: '',
}

// Mock history API
const mockHistoryAPI = {
  replaceState: (state: { sort: string; q: string }) => {
    mockHistoryState.sort = state.sort
    mockHistoryState.q = state.q
  },
  state: mockHistoryState,
}

test.describe('Newsroom Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.history.replaceState = mockHistoryAPI.replaceState
    })
    await page.goto('/')
    await page.waitForResponse(response => {
      return response.url().includes(API_URL) && response.status() === 200
    })
    await page.getByRole('searchbox').fill('')
    await page.keyboard.press('Enter')
    await page.getByRole('combobox').selectOption('default')
    await page.waitForTimeout(NETWORK_DELAY)
    await page.waitForSelector('.grid > .post-item')
  })

  test('should display the correct title and initial posts', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'NEWSROOM' })).toBeVisible()
    await page.waitForTimeout(NETWORK_DELAY)
    const posts = await page.locator('.grid > .post-item').count()
    expect(posts).toBe(DEFAULT_PAGE_SIZE)
  })

  test('should handle sorting by view count', async ({ page }) => {
    await page.getByRole('combobox').selectOption('asc')
    await page.waitForTimeout(NETWORK_DELAY)
    const sortedViewCounts = await page.locator('.grid > .post-item').evaluateAll(items => 
      items.map(item => parseInt(item.querySelector('.view-cnt')?.textContent?.match(/\d+/)?.[0] || '0'))
    )
    expect(sortedViewCounts).toEqual([...sortedViewCounts].sort((a, b) => a - b))
  })

  test('should handle search functionality', async ({ page }) => {
    await page.getByRole('searchbox').fill('asia')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(NETWORK_DELAY)
    const posts = await page.locator('.grid > .post-item').count()
    expect(posts).toBe(1)
  })

  test('should display no results message when search has no matches', async ({ page }) => {
    await page.getByRole('searchbox').fill('nonexistentterm123')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(NETWORK_DELAY)
    await expect(page.getByText('No search result.')).toBeVisible();
  })

  test('should handle infinite scroll', async ({ page }) => {
    const initialPostCount = await page.locator('.grid > .post-item').count()
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(NETWORK_DELAY)

    const newPostCount = await page.locator('.grid > .post-item').count()
    expect(newPostCount).toBeGreaterThan(initialPostCount)
  })

  test('should maintain search and sort state in History API', async ({ page }) => {
    await page.getByRole('combobox').selectOption('desc')
    await page.getByRole('searchbox').fill('asia')
    await page.keyboard.press('Enter')
    // Verify history state is updated
    const state = await page.evaluate(() => window.history.state)
    expect(state).toEqual({ sort: 'desc', q: 'asia' })
    // Reload the page
    await page.reload()
    await page.waitForResponse(response => {
      return response.url().includes(API_URL) && response.status() === 200
    })
    await page.waitForSelector('.grid > .post-item')
    // Verify search and sort state is maintained
    await expect(page.getByRole('combobox')).toHaveValue('desc')
    await expect(page.getByRole('searchbox')).toHaveValue('asia')
  })

  test('should handle error state gracefully', async ({ page }) => {
    await page.route('**/api/data', route => route.abort())
    await page.reload()
    await expect(page.getByText('Something went wrong!')).toBeVisible()
  })
}) 