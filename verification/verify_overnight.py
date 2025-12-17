
from playwright.sync_api import sync_playwright, expect
import time

def verify(page):
    # 1. Check Extractor Textarea Background
    print("Checking Extractor...")
    page.goto("http://localhost:3000/resources/tools/extractor")
    page.wait_for_load_state("networkidle")

    # Check for the textarea class
    textarea = page.locator("textarea").first
    class_attr = textarea.get_attribute("class")
    if "dark:bg-slate-950" not in class_attr:
        print(f"FAILED: Extractor textarea class is {class_attr}")
        raise Exception("Extractor textarea missing dark:bg-slate-950")
    print("Extractor textarea has dark:bg-slate-950")
    page.screenshot(path="verification/extractor.png")

    # 2. Check Expertise Page Header
    print("Checking Expertise...")
    page.goto("http://localhost:3000/my-expertise")
    page.wait_for_load_state("networkidle")
    expect(page.get_by_text("Live AI Portfolio")).to_be_visible()
    print("Expertise page has 'Live AI Portfolio'")
    page.screenshot(path="verification/expertise.png")

    # 3. Check Game Back Button
    print("Checking Game Back Button...")
    page.goto("http://localhost:3000/resources/games/memory")
    page.wait_for_load_state("networkidle")
    expect(page.get_by_role("button", name="Back to Resources")).to_be_visible()
    print("Game page has 'Back to Resources' button")
    page.screenshot(path="verification/game.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
