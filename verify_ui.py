from playwright.sync_api import sync_playwright

def verify_ui_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Resources page
        page.goto("http://localhost:3000/resources")
        page.wait_for_load_state("networkidle")

        # Take screenshot of the whole page to verify Resources UI
        page.screenshot(path="verification_resources.png", full_page=True)

        # Verify Matrix Mode Konami Code
        # We need to simulate the Konami code
        konami_code = [
            "ArrowUp", "ArrowUp",
            "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight",
            "ArrowLeft", "ArrowRight",
            "b", "a"
        ]

        for key in konami_code:
            page.keyboard.press(key)
            page.wait_for_timeout(100) # Small delay

        page.wait_for_timeout(1000) # Wait for toast

        # Take screenshot of Matrix Mode activation (looking for toast)
        page.screenshot(path="verification_matrix.png")

        browser.close()

if __name__ == "__main__":
    verify_ui_changes()
