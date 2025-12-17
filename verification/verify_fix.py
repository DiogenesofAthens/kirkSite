from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Listen for console logs
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

        try:
            page.goto("http://localhost:3000", timeout=30000)

            # Open chatbot
            page.wait_for_selector("button.fixed.bottom-6.right-6", state="visible")
            page.click("button.fixed.bottom-6.right-6")

            # Wait for chat window
            page.wait_for_selector("div.fixed.bottom-6.right-6.w-96", state="visible")

            # Type message
            input_selector = "input[placeholder=\"Ask about Grant...\"]"
            page.wait_for_selector(input_selector, state="visible")
            page.fill(input_selector, "Testing click submit")

            # Click Submit Button
            submit_btn = page.locator("button[type=\"submit\"]")
            print("Clicking submit button...")
            submit_btn.click()

            # Wait a bit
            page.wait_for_timeout(3000)

            if page.is_visible("text=Testing click submit"):
                 print("User message visible.")
            else:
                 print("User message NOT visible.")

            bubbles_count = page.locator(".bg-slate-100").count()
            print(f"Assistant bubbles count: {bubbles_count}")

            # Check if input is cleared
            input_value = page.input_value(input_selector)
            print(f"Input value after submit: {input_value}")

            page.screenshot(path="verification/chatbot_fixed.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
