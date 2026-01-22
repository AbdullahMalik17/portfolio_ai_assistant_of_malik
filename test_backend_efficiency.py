"""
Backend Efficiency Test Script
Tests the backend API using Playwright and measures performance.
"""
import asyncio
import time
import json
from datetime import datetime
import sys
import subprocess
import signal
import os

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("❌ Playwright not installed!")
    print("   Install with: pip install playwright")
    print("   Then run: playwright install chromium")
    sys.exit(1)


SERVER_URL = "http://localhost:8000"
SERVER_START_TIMEOUT = 30


async def check_server() -> bool:
    """Check if server is responding."""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()
            response = await page.request.get(f"{SERVER_URL}/health", timeout=2000)
            await browser.close()
            return response.status == 200
    except:
        return False


async def test_endpoint(page, method: str, endpoint: str, data: dict = None):
    """Test an endpoint and measure performance."""
    url = f"{SERVER_URL}{endpoint}"
    start = time.time()
    
    try:
        if method == "GET":
            response = await page.request.get(url, timeout=30000)
        elif method == "POST":
            response = await page.request.post(
                url,
                data=json.dumps(data) if data else None,
                headers={"Content-Type": "application/json"} if data else {},
                timeout=60000  # 60s for AI responses
            )
        
        elapsed = (time.time() - start) * 1000
        status = response.status
        
        try:
            body = await response.json()
        except:
            body = await response.text()
        
        return {
            "success": 200 <= status < 300,
            "status": status,
            "time_ms": round(elapsed, 2),
            "endpoint": endpoint,
            "response_size": len(json.dumps(body) if isinstance(body, dict) else str(body))
        }
    except Exception as e:
        return {
            "success": False,
            "status": 0,
            "time_ms": (time.time() - start) * 1000,
            "endpoint": endpoint,
            "error": str(e)
        }


async def run_efficiency_tests():
    """Run comprehensive efficiency tests."""
    print("\n" + "=" * 70)
    print("🚀 Backend Efficiency Testing with Playwright")
    print("=" * 70)
    
    # Check if server is running
    print(f"\n🔍 Checking if server is running at {SERVER_URL}...")
    if not await check_server():
        print("❌ Server is not running!")
        print("\n💡 Please start the server first:")
        print("   cd backend")
        print("   python main.py")
        print("\n   Then run this test again.")
        return
    
    print("✅ Server is running!\n")
    
    results = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Test 1: Root endpoint
        print("📊 Test 1: Root Endpoint (/)")
        result = await test_endpoint(page, "GET", "/")
        results.append(result)
        print(f"   {'✅' if result['success'] else '❌'} Status: {result['status']} | Time: {result['time_ms']}ms\n")
        
        # Test 2: Health check
        print("📊 Test 2: Health Check (/health)")
        result = await test_endpoint(page, "GET", "/health")
        results.append(result)
        print(f"   {'✅' if result['success'] else '❌'} Status: {result['status']} | Time: {result['time_ms']}ms\n")
        
        # Test 3: Assistant health
        print("📊 Test 3: Assistant Health (/api/assistant/health)")
        result = await test_endpoint(page, "GET", "/api/assistant/health")
        results.append(result)
        print(f"   {'✅' if result['success'] else '❌'} Status: {result['status']} | Time: {result['time_ms']}ms\n")
        
        # Test 4: Simple chat
        print("📊 Test 4: Chat Endpoint - Simple Message (/api/chat)")
        print("   Sending: 'Hello, tell me about yourself'")
        result = await test_endpoint(page, "POST", "/api/chat", {
            "message": "Hello, tell me about yourself"
        })
        results.append(result)
        if result['success']:
            print(f"   ✅ Status: {result['status']} | Time: {result['time_ms']}ms | Size: {result.get('response_size', 0)} bytes")
        else:
            print(f"   ❌ Status: {result['status']} | Error: {result.get('error', 'Unknown')}")
        print()
        
        # Test 5: Complex chat with session
        print("📊 Test 5: Chat Endpoint - Complex Message (/api/assistant/chat)")
        print("   Sending: 'What are your top skills?'")
        result = await test_endpoint(page, "POST", "/api/assistant/chat", {
            "message": "What are your top skills?",
            "session_id": "test_session_123"
        })
        results.append(result)
        if result['success']:
            print(f"   ✅ Status: {result['status']} | Time: {result['time_ms']}ms | Size: {result.get('response_size', 0)} bytes")
        else:
            print(f"   ❌ Status: {result['status']} | Error: {result.get('error', 'Unknown')}")
        print()
        
        # Test 6: Concurrent requests
        print("📊 Test 6: Concurrent Requests (5 parallel health checks)")
        start = time.time()
        concurrent = await asyncio.gather(*[
            test_endpoint(page, "GET", "/health") for _ in range(5)
        ])
        total_time = (time.time() - start) * 1000
        results.extend(concurrent)
        avg_time = sum(r['time_ms'] for r in concurrent) / len(concurrent)
        print(f"   ✅ Total: {total_time:.2f}ms | Average: {avg_time:.2f}ms\n")
        
        # Test 7: Stress test
        print("📊 Test 7: Stress Test (10 rapid health checks)")
        start = time.time()
        stress_results = []
        for i in range(10):
            result = await test_endpoint(page, "GET", "/health")
            stress_results.append(result)
        total_time = (time.time() - start) * 1000
        results.extend(stress_results)
        avg_time = sum(r['time_ms'] for r in stress_results) / len(stress_results)
        print(f"   ✅ Total: {total_time:.2f}ms | Average: {avg_time:.2f}ms\n")
        
        await browser.close()
    
    # Generate report
    print("\n" + "=" * 70)
    print("📊 Performance Report")
    print("=" * 70)
    
    successful = [r for r in results if r['success']]
    failed = [r for r in results if not r['success']]
    
    if successful:
        avg_time = sum(r['time_ms'] for r in successful) / len(successful)
        min_time = min(r['time_ms'] for r in successful)
        max_time = max(r['time_ms'] for r in successful)
        
        print(f"\n✅ Successful: {len(successful)}/{len(results)}")
        print(f"   Average Response: {avg_time:.2f}ms")
        print(f"   Fastest: {min_time:.2f}ms")
        print(f"   Slowest: {max_time:.2f}ms")
        
        # Rating
        if avg_time < 50:
            rating = "🚀 Excellent"
        elif avg_time < 100:
            rating = "✅ Good"
        elif avg_time < 200:
            rating = "⚠️  Acceptable"
        else:
            rating = "❌ Slow"
        
        print(f"\n📈 Performance: {rating}")
    
    if failed:
        print(f"\n❌ Failed: {len(failed)}")
        for r in failed:
            print(f"   - {r['endpoint']}: {r.get('error', 'Unknown')}")
    
    print("\n" + "=" * 70)
    print("🎉 Testing Complete!")
    print("=" * 70)


if __name__ == "__main__":
    asyncio.run(run_efficiency_tests())

