from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 1024})
        page = context.new_page()

        try:
            # 2. Verify Arcade (Debug)
            print("Verifying Arcade...")
            page.goto("http://localhost:3001/resources")
            page.wait_for_timeout(2000)

            # Scroll to games
            page.get_by_text("Fun Zone").scroll_into_view_if_needed()

            link = page.locator("a[href='/resources/games/simon']")
            print(f"Link count: {link.count()}")

            if link.count() > 0:
                print("Clicking link...")
                link.first.click(force=True)
                page.wait_for_timeout(2000)
                print(f"URL: {page.url}")

                if "/resources/games/simon" in page.url:
                    print("PASS: Navigated to Simon page")
                    if page.get_by_text("Recent Attempts").is_visible():
                        print("PASS: History component visible")
                else:
                    print("FAIL: Navigation failed")
            else:
                print("FAIL: Link not found")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
