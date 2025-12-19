from playwright.sync_api import Page, expect, sync_playwright

def test_groq_blog_post(page: Page):
  # 1. Arrange: Go to the blog list page.
  page.goto("http://localhost:3000/blog")

  # 2. Assert: Verify the new blog post card is visible.
  # We look for the title of the new post.
  expect(page.get_by_role("link", name="I Built 4 AI Apps for $0: How Groq’s Free API Powers My Life")).to_be_visible()

  # 3. Act: Click on the blog post
  page.get_by_role("link", name="I Built 4 AI Apps for $0: How Groq’s Free API Powers My Life").click()

  # 4. Assert: Verify we are on the correct page
  expect(page).to_have_url("http://localhost:3000/blog/groq-apps")
  expect(page.get_by_role("heading", name="I Built 4 AI Apps for $0: How Groq’s Free API Powers My Life").first).to_be_visible()

  # 5. Screenshot.
  page.screenshot(path="verification_groq_blog.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_groq_blog_post(page)
    finally:
      browser.close()
