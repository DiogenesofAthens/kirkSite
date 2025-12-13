
from playwright.sync_api import sync_playwright

def verify_clock_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Browser Error: {exc}"))

        try:
            # Navigate to the Clock Page
            print("Navigating to clock page...")
            page.goto("http://localhost:3000/clock")

            # Wait for any content
            page.wait_for_load_state("networkidle")

            print("Taking debug screenshot...")
            page.screenshot(path="verification/clock_debug.png")

            # Wait for specific element
            page.wait_for_selector("text=Locations", timeout=5000)

            # Test Search
            print("Testing search...")
            page.fill("input[type='text']", "Tokyo")

            # Wait for results
            page.wait_for_selector("text=Tokyo", timeout=5000)

            # Click the result to add it
            page.click("text=Tokyo")

            # Check if Tokyo is added to the locations list
            page.wait_for_selector("text=Tokyo", state="visible")

            # Take a screenshot after adding
            print("Taking screenshot after adding Tokyo...")
            page.screenshot(path="verification/clock_added.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/clock_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_clock_page()
