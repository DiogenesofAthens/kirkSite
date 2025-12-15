from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 1024})
        page = context.new_page()

        try:
            # 1. Verify Translator
            print("Verifying Translator...")
            page.goto("http://localhost:3001/tools/translator")
            page.wait_for_timeout(2000)

            # Check for Paste button
            if page.locator(".lucide-clipboard-paste").is_visible():
                 print("PASS: Paste icon visible")
            else:
                 print("FAIL: Paste button not found")

            # Check for Copy button (Output header)
            if page.locator(".lucide-copy").is_visible():
                 print("PASS: Copy icon visible")
            else:
                 print("FAIL: Copy button not found")

            # Check for grouped options
            page.get_by_role("combobox").nth(1).click()
            if page.get_by_text("Modern Web & Backend").is_visible():
                print("PASS: Option groups found")
            else:
                print("FAIL: Option groups not found")
            page.keyboard.press("Escape")

            # 2. Verify Arcade
            print("Verifying Arcade...")
            page.goto("http://localhost:3001/resources")
            page.wait_for_timeout(1000)

            # Click Simon Says Link
            # The card is wrapped in a link
            page.locator("a[href='/resources/games/simon']").click()
            page.wait_for_timeout(1000)

            # Check URL
            if "/resources/games/simon" in page.url:
                print("PASS: Navigated to Simon page")
            else:
                print(f"FAIL: URL is {page.url}")

            # Check for "Recent Attempts"
            if page.get_by_text("Recent Attempts").is_visible():
                print("PASS: History component visible")
            else:
                print("FAIL: History component not visible")

            # Check for Back button
            if page.get_by_text("Back to Arcade").is_visible():
                print("PASS: Back button visible")
            else:
                print("FAIL: Back button not visible")

            # 3. Verify Matrix Mode Close Logic
            print("Verifying Matrix Mode Close...")
            page.goto("http://localhost:3001/resources")
            page.wait_for_timeout(1000)

            # Activate Matrix Mode (7 taps)
            page.get_by_text("Fun Zone").scroll_into_view_if_needed()
            gamepad = page.locator("svg.lucide-gamepad2").locator("..")

            for _ in range(7):
                gamepad.click()
                page.wait_for_timeout(50)

            page.wait_for_timeout(1000)

            is_matrix = page.evaluate("document.documentElement.classList.contains('matrix-mode')")
            print(f"Matrix Mode Active: {is_matrix}")

            if not is_matrix:
                print("FAIL: Matrix mode failed to activate")
            else:
                # Close overlay
                close_btn = page.get_by_text("[x]")
                if close_btn.is_visible():
                    close_btn.click()
                    page.wait_for_timeout(500)

                    # Check if overlay is gone
                    if not page.get_by_text("DEBUG_MODE").is_visible():
                        print("PASS: Overlay closed")
                    else:
                        print("FAIL: Overlay still visible")

                    # Check if matrix mode is STILL active
                    is_matrix_after = page.evaluate("document.documentElement.classList.contains('matrix-mode')")
                    if is_matrix_after:
                        print("PASS: Matrix mode remained active after closing overlay")
                    else:
                        print("FAIL: Matrix mode deactivated after closing overlay")
                else:
                    print("FAIL: Close button not found")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_arcade.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
