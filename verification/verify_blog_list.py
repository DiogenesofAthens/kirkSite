from playwright.sync_api import Page, expect, sync_playwright

def test_blog_list(page: Page):
  # 1. Arrange: Go to the blog list page.
  page.goto("http://localhost:3000/blog")

  # 2. Assert: Verify the new blog post card is visible.
  # We look for the title of the new post.
  expect(page.get_by_role("link", name="The \"Where's the Remote?\" Solution: Building a Universal Controller in Home Assistant")).to_be_visible()

  # 3. Screenshot.
  page.screenshot(path="verification_blog_list.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_blog_list(page)
    finally:
      browser.close()
