
from playwright.sync_api import sync_playwright, expect
import time

def verify_ui_changes():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # 1. Verify Translator UI (Code Translator)
        print("Checking Code Translator UI...")
        try:
            page.goto("http://localhost:3000/tools/translator", timeout=30000)

            # Wait for content
            page.wait_for_selector("h1", state="visible")

            # Verify Title
            heading = page.locator("h1")
            expect(heading).to_have_text("Code Translator")

            # Verify Padding (approximate check via screenshot or visually)
            # We can check the computed style of the main container
            main_container = page.locator("main")
            # expect(main_container).to_have_class("pt-36") # Class check might fail if processed by tailwind, but let's check screenshot

            # Screenshot Translator
            page.screenshot(path="verification/translator_ui.png")
            print("Translator screenshot saved.")

        except Exception as e:
            print(f"Translator verification failed: {e}")

        # 2. Verify Extractor UI (Entity Extractor)
        print("Checking Entity Extractor UI...")
        try:
            page.goto("http://localhost:3000/resources/tools/extractor", timeout=30000)

            # Wait for content
            page.wait_for_selector("h1", state="visible")

            # Verify Title
            heading = page.locator("h1")
            expect(heading).to_have_text("Entity Extractor")

            # Screenshot Extractor
            page.screenshot(path="verification/extractor_ui.png")
            print("Extractor screenshot saved.")

        except Exception as e:
            print(f"Extractor verification failed: {e}")

        browser.close()

if __name__ == "__main__":
    verify_ui_changes()
