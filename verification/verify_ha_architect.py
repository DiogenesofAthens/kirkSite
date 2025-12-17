from playwright.sync_api import Page, expect, sync_playwright

def test_ha_architect(page: Page):
  # 1. Arrange: Go to the HA Architect page.
  page.goto("http://localhost:3000/resources/tools/ha-architect")

  # 2. Act & Assert:
  # Verify Header
  expect(page.get_by_role("heading", name="Home Assistant Architect")).to_be_visible()

  # Verify Security Banner (at top)
  expect(page.get_by_text("Security Note: AI processing active")).to_be_visible()

  # Verify Tabs
  expect(page.get_by_role("tab", name="Generator")).to_be_visible()
  expect(page.get_by_role("tab", name="Debugger")).to_be_visible()

  # Interact with Input
  input_area = page.get_by_placeholder("e.g., Turn on the living room lights")
  input_area.fill("Turn on the kitchen lights when motion is detected.")

  # Verify Editor pane exists
  expect(page.get_by_text("RESULT")).to_be_visible()

  # 3. Screenshot
  page.wait_for_timeout(1000) # Wait for animations
  page.screenshot(path="/home/jules/verification/ha_architect.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_ha_architect(page)
    finally:
      browser.close()
