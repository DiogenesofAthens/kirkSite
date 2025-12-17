from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            page.goto("http://localhost:3000", timeout=30000)

            # Wait for button
            page.wait_for_selector("button.fixed.bottom-6.right-6", state="visible")

            # Click the button
            page.click("button.fixed.bottom-6.right-6")

            # Wait for the chat window to open
            page.wait_for_selector("div.fixed.bottom-6.right-6.w-96", state="visible")

            # Wait for the initial message
            page.wait_for_selector("text=Hi! I'm Grant's AI.", timeout=10000)

            # Wait for input field
            page.wait_for_selector("input[placeholder=\"Ask about Grant...\"]", state="visible")

            # Take screenshot of open chat
            page.screenshot(path="verification/chatbot_open.png")
            print("Screenshot saved to verification/chatbot_open.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
