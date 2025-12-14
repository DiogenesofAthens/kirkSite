
from playwright.sync_api import sync_playwright

def verify_hanoi():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to arcade page...")
            page.goto("http://localhost:3000/arcade")

            page.wait_for_load_state("networkidle")

            print("Clicking Hanoi tab...")
            page.get_by_role("tab", name="Hanoi").click()

            # Wait for Hanoi component
            page.wait_for_selector("text=Difficulty")

            print("Taking screenshot of Hanoi game...")
            page.screenshot(path="verification/hanoi_initial.png")

            # Click Peg A (index 0)
            # The pegs have class "group" and are inside the hanoi tab content.
            # But the tab content might not have a clear selector other than accessible role.
            # Let's target the peg containers directly via their distinctive class or text.
            # We used "relative flex flex-col justify-end items-center w-32 group"

            # Let's find the pegs by looking for the letters A, B, C which are distinct in this context
            # Using exact match for the label text.

            print("Clicking Peg A...")
            # Locate the container that has the text "A" with exact match? No, "A" is just text node.
            # Let's use the .group locator and filter.

            pegs = page.locator(".group").filter(has_text="A")
            # Need to be careful. "Arcade" has "A".
            # But "Arcade" doesn't have class "group" probably?
            # Let's assume the pegs are the main ".group" elements visible.

            # Safest: Use the index. The game board has 3 pegs.
            # Look for the container of the pegs.
            # <div className="relative z-10 flex justify-between w-[80%] md:w-[60%] mb-4">

            # Let's just use .group inside the main area.
            # Or use coordinates.

            # Let's try locating by text "A" with strict exactness if possible, but that's hard.
            # Let's use the "Difficulty" text to narrow down the container?

            # Actually, the error message showed:
            # 5) <div class="relative flex flex-col justify-end items-center w-32 group">…</div> aka locator("div").filter(has_text=re.compile(r"^A$")).first

            # So `page.locator("div").filter(has_text=re.compile(r"^A$")).first` might get the "A" label div.
            # Then we click its parent.

            # Let's try `page.locator(".group").nth(0)` but ensure it's the peg.
            # The previous error showed 7 elements matching "text=A" context.
            # Element 5 seemed to be the peg container itself!
            # "locator("div").filter(has_text=re.compile(r"^A$")).first" was one of the matches.

            # Let's try clicking the peg by index.
            # The pegs are likely the last 3 elements with class "group" or similar?
            # Let's simply click the center of the screen? No.

            # Let's use a specific selector for the peg container: `.w-32` is fairly unique here.

            print("Clicking Peg 0...")
            page.locator(".w-32.group").nth(0).click()

            page.wait_for_timeout(500)

            print("Clicking Peg 1...")
            page.locator(".w-32.group").nth(1).click()

            page.wait_for_timeout(1000)

            print("Taking screenshot after move...")
            page.screenshot(path="verification/hanoi_move.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/hanoi_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_hanoi()
