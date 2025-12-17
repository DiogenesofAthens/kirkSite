from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Visual Unification (Background color)
        # We can't easily check computed style in headless with just python script without eval
        # But we can take screenshots of the tools.

        print("Verifying Tools...")
        tools = [
            "/resources/tools/extractor",
            "/resources/tools/ha-architect",
            "/tools/translator"
        ]

        for tool_url in tools:
            print(f"Navigating to {tool_url}...")
            page.goto(f"http://localhost:3000{tool_url}")
            page.wait_for_timeout(2000) # Wait for hydration/animation
            page.screenshot(path=f"verification/screenshot_{tool_url.split('/')[-1]}.png")

        # 2. Verify Matrix Mode
        # Trigger Matrix Mode via Konami code
        # Up, Up, Down, Down, Left, Right, Left, Right, b, a
        print("Verifying Matrix Mode...")
        page.goto("http://localhost:3000/resources")
        page.wait_for_timeout(1000)

        page.keyboard.press("ArrowUp")
        page.keyboard.press("ArrowUp")
        page.keyboard.press("ArrowDown")
        page.keyboard.press("ArrowDown")
        page.keyboard.press("ArrowLeft")
        page.keyboard.press("ArrowRight")
        page.keyboard.press("ArrowLeft")
        page.keyboard.press("ArrowRight")
        page.keyboard.type("ba")

        page.wait_for_timeout(1000)
        page.screenshot(path="verification/screenshot_matrix_mode.png")

        # Check if toast text is correct (this might be hard if toast disappears quickly or is hard to select)
        # But we can visually inspect the screenshot.

        # 3. Verify Navigation
        print("Verifying Navigation...")
        page.goto("http://localhost:3000/resources")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/screenshot_resources_page.png")

        page.goto("http://localhost:3000/my-expertise")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/screenshot_expertise_page.png")

        page.goto("http://localhost:3000/resources/games/memory")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/screenshot_game_back_button.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
