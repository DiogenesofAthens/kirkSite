from playwright.sync_api import sync_playwright

def verify_memory():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to Memory Game...")
            page.goto("http://localhost:3001/resources/games/memory")
            page.wait_for_timeout(2000)

            if page.get_by_role("heading", name="Memory Game").first.is_visible():
                 print("PASS: Title visible")

            # Check for cards (buttons with 'aspect-square')
            cards = page.locator("button.aspect-square")
            count = cards.count()
            print(f"Cards found: {count}")

            if count > 0:
                print("PASS: Cards rendered")
            else:
                print("FAIL: No cards rendered")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_memory()
