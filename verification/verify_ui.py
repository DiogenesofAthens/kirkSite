from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Verify Translator Background
    try:
        print("Navigating to Translator...")
        page.goto("http://localhost:3000/tools/translator")
        # Wait for potential hydration
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/translator_page.png")
        print("Translator page screenshot taken.")
    except Exception as e:
        print(f"Translator page failed: {e}")

    # Verify Resources Page Structure
    try:
        print("Navigating to Resources...")
        page.goto("http://localhost:3000/resources")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/resources_page.png")
        print("Resources page screenshot taken.")
    except Exception as e:
        print(f"Resources page failed: {e}")

    # Verify Game Page Button
    try:
        print("Navigating to Towers...")
        page.goto("http://localhost:3000/resources/games/towers")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/towers_page.png")
        print("Towers page screenshot taken.")
    except Exception as e:
        print(f"Towers page failed: {e}")

    # Verify Expertise Page (Check for crash)
    try:
        print("Navigating to Expertise...")
        page.goto("http://localhost:3000/my-expertise")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/expertise_page.png")
        print("Expertise page screenshot taken.")
    except Exception as e:
        print(f"Expertise page failed: {e}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
