from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

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
            page.fill(input_selector, "Who is Grant?")

            # Submit
            page.press(input_selector, "Enter")

            # Wait to see if it reloads. We can check if page content changes or if URL stays same.
            # If reload happens, the chat window might close.
            # So lets check if chat window is still open.

            page.wait_for_timeout(2000)

            if page.is_visible("div.fixed.bottom-6.right-6.w-96"):
                print("Chat window still visible.")
                if page.is_visible("text=Who is Grant?"):
                     print("User message visible.")
                else:
                     print("User message NOT visible.")

                # Check for bot response "Grant Glazer"
                if page.is_visible("text=Grant Glazer"):
                    print("Bot response visible.")
                else:
                    print("Bot response NOT visible.")

            else:
                print("Chat window CLOSED (likely reload).")

            page.screenshot(path="verification/chatbot_interaction.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
