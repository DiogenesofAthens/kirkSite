from playwright.sync_api import Page, expect, sync_playwright

def test_blog_post(page: Page):
  # 1. Arrange: Go to the new blog post.
  page.goto("http://localhost:3000/blog/universal-remote")

  # 2. Assert: Verify the page loaded.
  # We have two headings with the same name (one in card, one in body markdown), so we check that at least one is visible or be specific.
  expect(page.get_by_role("heading", name="The \"Where's the Remote?\" Solution: Building a Universal Controller in Home Assistant").first).to_be_visible()

  # 3. Assert: Verify the code block is collapsible and initially collapsed (or check presence).
  # The code block title "Main Remote View YAML" should be visible.
  expect(page.get_by_text("Main Remote View YAML")).to_be_visible()

  # The actual code content (e.g. "views:") should not be visible or inside the container.
  # Based on implementation: {isOpen && (...)}
  # So "views:" should NOT be visible initially.
  expect(page.get_by_text("views:", exact=False)).not_to_be_visible()

  # 4. Act: Click to expand.
  page.get_by_text("Main Remote View YAML").click()

  # 5. Assert: Code is now visible.
  expect(page.get_by_text("views:", exact=False)).to_be_visible()

  # 6. Screenshot.
  page.screenshot(path="verification_blog.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_blog_post(page)
    finally:
      browser.close()
