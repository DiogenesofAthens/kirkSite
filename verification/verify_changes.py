from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with viewport large enough for desktop checks
        context = browser.new_context(viewport={"width": 1280, "height": 1024})
        page = context.new_page()

        try:
            # 1. Verify Tower of Hanoi visual changes
            print("Verifying Tower of Hanoi...")
            page.goto("http://localhost:3001/arcade")
            page.wait_for_timeout(2000)
            page.get_by_text("Hanoi").click()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/hanoi_fix.png")
            print("Screenshot taken: hanoi_fix.png")

            # 2. Verify Code Translator Changes
            print("Verifying Code Translator...")
            page.goto("http://localhost:3001/tools/translator")
            page.wait_for_timeout(2000)

            checkbox = page.get_by_label("Explain Code")
            if checkbox.is_visible():
                print("PASS: Explain Code checkbox is visible")
            else:
                print("FAIL: Explain Code checkbox NOT visible")

            page.get_by_role("combobox").first.click()
            if page.get_by_text("Auto Detect").is_visible():
                print("PASS: Auto Detect option is visible")
            else:
                print("FAIL: Auto Detect option NOT visible")

            page.keyboard.press("Escape")
            page.screenshot(path="verification/translator_fix.png")

            # 3. Verify Matrix Mode Debug Overlay & Easter Egg
            print("Verifying Matrix Mode...")
            page.goto("http://localhost:3001/resources")
            page.wait_for_timeout(2000)

            page.get_by_text("Fun Zone").scroll_into_view_if_needed()
            gamepad = page.locator("svg.lucide-gamepad2").locator("..")

            # Test Warning Toast (3 taps)
            print("  Tapping 3 times...")
            for _ in range(3):
                gamepad.click()
                page.wait_for_timeout(50)

            page.wait_for_timeout(200) # Wait for toast animation
            page.screenshot(path="verification/matrix_warning.png")

            if page.get_by_text("You are 4 steps away").is_visible():
                 print("PASS: Warning toast appeared")
            else:
                 print("FAIL: Warning toast did not appear")

            # Wait to reset the counter (needs > 500ms)
            print("  Waiting for counter reset...")
            page.wait_for_timeout(700)

            # Test Full Activation (7 taps)
            print("  Tapping 7 times...")
            for _ in range(7):
                gamepad.click()
                page.wait_for_timeout(50)

            page.wait_for_timeout(1000)

            is_matrix = page.evaluate("document.documentElement.classList.contains('matrix-mode')")
            print(f"Matrix Mode Active: {is_matrix}")

            if page.get_by_text("DEBUG_MODE").is_visible():
                print("PASS: Debug overlay is visible")
            else:
                print("FAIL: Debug overlay NOT visible")

            page.screenshot(path="verification/matrix_mode.png")
            print("Screenshot taken: matrix_mode.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
