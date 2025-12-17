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
            # Assuming the button inside the form is the only button with SendIcon or type submit
            # The structure is <form> <Input> <Button><SendIcon></Button> </form>
            # We can select by type=submit
            submit_btn = page.locator("button[type=\"submit\"]")
            print("Clicking submit button...")
            submit_btn.click()

            # Wait a bit for processing
            page.wait_for_timeout(3000)

            if page.is_visible("text=Testing click submit"):
                 print("User message visible.")
            else:
                 print("User message NOT visible.")

            # Check for bot response
            # Note: The bot is unlikely to say "Grant Glazer" to "Testing click submit" unless system prompt forces introduction.
            # But we can check for new message bubbles.
            # Count bubbles
            bubbles_count = page.locator(".bg-slate-100").count() # Assistant bubbles
            print(f"Assistant bubbles count: {bubbles_count}")

            page.screenshot(path="verification/chatbot_click.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
