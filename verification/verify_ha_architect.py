from playwright.sync_api import Page, expect, sync_playwright

def test_ha_architect(page: Page):
  # 1. Arrange: Go to the HA Architect page.
  page.goto("http://localhost:3000/resources/tools/ha-architect")

  # 2. Act & Assert:
  # Verify Header
  expect(page.get_by_role("heading", name="Home Assistant Architect")).to_be_visible()

  # Verify Security Banner (at bottom now)
  expect(page.get_by_text("Security Note:")).to_be_visible()

  # Verify Tabs
  expect(page.get_by_role("tab", name="Generator")).to_be_visible()
  expect(page.get_by_role("tab", name="Debugger")).to_be_visible()

  # Verify Action Button is visible. It might be disabled because input is empty.
  # But get_by_role('button', name='Generate YAML') should still find it.
  # Let's try filling text first to ensure it's enabled if that's the issue (though standard button should be findable even if disabled)

  # Interact with Input
  page.get_by_role("textbox").fill("Turn on the kitchen lights when motion is detected.")

  # Now check button
  button = page.get_by_role("button", name="Generate YAML")
  expect(button).to_be_visible()

  # Verify Editor pane exists
  expect(page.get_by_text("RESULT")).to_be_visible()

  # 3. Screenshot
  page.wait_for_timeout(2000) # Wait for animations
  page.screenshot(path="/home/jules/verification/ha_architect_v2.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_ha_architect(page)
    finally:
      browser.close()
