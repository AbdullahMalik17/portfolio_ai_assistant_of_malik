"""
Efficiency testing script using Playwright to test the backend API.
Measures response times, tests endpoints, and generates a performance report.
"""
import asyncio
import time
import json
from datetime import datetime
from typing import Dict, List, Any
import sys

try:
    from playwright.async_api import async_playwright, Page
except ImportError:
    print("❌ Playwright not installed. Installing...")
    print("   Run: pip install playwright")
    print("   Then: playwright install chromium")
    sys.exit(1)


class PerformanceTester:
    """Performance testing class for backend API."""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.results: List[Dict[str, Any]] = []
        
    async def test_endpoint(
        self, 
        page: Page, 
        method: str, 
        endpoint: str, 
        data: Dict = None,
        description: str = ""
    ) -> Dict[str, Any]:
        """
        Test an API endpoint and measure performance.
        
        Args:
            page: Playwright page instance
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint path
            data: Request body data
            description: Test description
            
        Returns:
            Test result dictionary with metrics
        """
        url = f"{self.base_url}{endpoint}"
        start_time = time.time()
        
        try:
            if method.upper() == "GET":
                response = await page.request.get(url)
            elif method.upper() == "POST":
                response = await page.request.post(
                    url,
                    data=json.dumps(data) if data else None,
                    headers={"Content-Type": "application/json"} if data else None
                )
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            response_time = (time.time() - start_time) * 1000  # Convert to ms
            status = response.status
            try:
                body = await response.json()
            except:
                body = await response.text()
            
            result = {
                "endpoint": endpoint,
                "method": method,
                "status": status,
                "response_time_ms": round(response_time, 2),
                "success": 200 <= status < 300,
                "description": description or endpoint,
                "timestamp": datetime.now().isoformat(),
            }
            
            # Add response size if available
            if isinstance(body, dict):
                result["response_size_bytes"] = len(json.dumps(body))
            elif isinstance(body, str):
                result["response_size_bytes"] = len(body)
            
            return result
            
        except Exception as e:
            response_time = (time.time() - start_time) * 1000
            return {
                "endpoint": endpoint,
                "method": method,
                "status": 0,
                "response_time_ms": round(response_time, 2),
                "success": False,
                "error": str(e),
                "description": description or endpoint,
                "timestamp": datetime.now().isoformat(),
            }
    
    async def run_tests(self):
        """Run all performance tests."""
        print("\n" + "=" * 70)
        print("🚀 Starting Backend Efficiency Tests")
        print("=" * 70)
        print(f"Base URL: {self.base_url}\n")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()
            
            # Test 1: Root endpoint
            print("📊 Test 1: Root Endpoint (/)")
            result = await self.test_endpoint(page, "GET", "/", description="Root endpoint")
            self.results.append(result)
            print(f"   ✅ Status: {result['status']} | Time: {result['response_time_ms']}ms\n")
            
            # Test 2: Health check
            print("📊 Test 2: Health Check (/health)")
            result = await self.test_endpoint(page, "GET", "/health", description="Health check")
            self.results.append(result)
            print(f"   ✅ Status: {result['status']} | Time: {result['response_time_ms']}ms\n")
            
            # Test 3: Assistant health
            print("📊 Test 3: Assistant Health (/api/assistant/health)")
            result = await self.test_endpoint(
                page, "GET", "/api/assistant/health", description="Assistant health check"
            )
            self.results.append(result)
            print(f"   ✅ Status: {result['status']} | Time: {result['response_time_ms']}ms\n")
            
            # Test 4: Chat endpoint (simple message)
            print("📊 Test 4: Chat Endpoint - Simple Message (/api/chat)")
            chat_data = {
                "message": "Hello, tell me about yourself"
            }
            result = await self.test_endpoint(
                page, "POST", "/api/chat", chat_data, "Chat endpoint - simple message"
            )
            self.results.append(result)
            if result['success']:
                print(f"   ✅ Status: {result['status']} | Time: {result['response_time_ms']}ms")
            else:
                print(f"   ❌ Status: {result['status']} | Error: {result.get('error', 'Unknown')}")
            print()
            
            # Test 5: Chat endpoint (complex message)
            print("📊 Test 5: Chat Endpoint - Complex Message (/api/assistant/chat)")
            chat_data = {
                "message": "What are your top skills and technologies?",
                "session_id": "test_session_123"
            }
            result = await self.test_endpoint(
                page, "POST", "/api/assistant/chat", chat_data, "Chat endpoint - complex message"
            )
            self.results.append(result)
            if result['success']:
                print(f"   ✅ Status: {result['status']} | Time: {result['response_time_ms']}ms")
            else:
                print(f"   ❌ Status: {result['status']} | Error: {result.get('error', 'Unknown')}")
            print()
            
            # Test 6: Multiple concurrent requests
            print("📊 Test 6: Concurrent Requests (5 parallel health checks)")
            concurrent_results = await asyncio.gather(*[
                self.test_endpoint(page, "GET", "/health", description=f"Concurrent request {i+1}")
                for i in range(5)
            ])
            self.results.extend(concurrent_results)
            avg_time = sum(r['response_time_ms'] for r in concurrent_results) / len(concurrent_results)
            print(f"   ✅ Average Time: {avg_time:.2f}ms\n")
            
            # Test 7: Stress test (10 rapid requests)
            print("📊 Test 7: Stress Test (10 rapid requests)")
            stress_results = []
            start = time.time()
            for i in range(10):
                result = await self.test_endpoint(
                    page, "GET", "/health", description=f"Stress test {i+1}"
                )
                stress_results.append(result)
            total_time = (time.time() - start) * 1000
            self.results.extend(stress_results)
            avg_time = sum(r['response_time_ms'] for r in stress_results) / len(stress_results)
            print(f"   ✅ Total Time: {total_time:.2f}ms | Average: {avg_time:.2f}ms\n")
            
            await browser.close()
        
        self.generate_report()
    
    def generate_report(self):
        """Generate performance report."""
        print("\n" + "=" * 70)
        print("📊 Performance Test Report")
        print("=" * 70)
        
        successful = [r for r in self.results if r['success']]
        failed = [r for r in self.results if not r['success']]
        
        if successful:
            avg_response_time = sum(r['response_time_ms'] for r in successful) / len(successful)
            min_response_time = min(r['response_time_ms'] for r in successful)
            max_response_time = max(r['response_time_ms'] for r in successful)
            
            print(f"\n✅ Successful Requests: {len(successful)}/{len(self.results)}")
            print(f"   Average Response Time: {avg_response_time:.2f}ms")
            print(f"   Fastest Response: {min_response_time:.2f}ms")
            print(f"   Slowest Response: {max_response_time:.2f}ms")
            
            # Performance ratings
            if avg_response_time < 50:
                rating = "🚀 Excellent"
            elif avg_response_time < 100:
                rating = "✅ Good"
            elif avg_response_time < 200:
                rating = "⚠️  Acceptable"
            else:
                rating = "❌ Slow"
            
            print(f"\n📈 Performance Rating: {rating}")
        
        if failed:
            print(f"\n❌ Failed Requests: {len(failed)}")
            for r in failed:
                print(f"   - {r['endpoint']}: {r.get('error', 'Unknown error')}")
        
        # Detailed results
        print("\n📋 Detailed Results:")
        print("-" * 70)
        for i, result in enumerate(self.results, 1):
            status_icon = "✅" if result['success'] else "❌"
            print(
                f"{status_icon} {i}. {result['description']}"
                f" | {result['response_time_ms']}ms | Status: {result['status']}"
            )
        
        print("\n" + "=" * 70)
        print("🎉 Testing Complete!")
        print("=" * 70)


async def check_server_running(base_url: str = "http://localhost:8000") -> bool:
    """Check if the server is running."""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()
            
            try:
                response = await page.request.get(f"{base_url}/health")
                await browser.close()
                return response.status == 200
            except:
                await browser.close()
                return False
    except:
        return False


async def main():
    """Main test function."""
    base_url = "http://localhost:8000"
    
    print("\n🔍 Checking if server is running...")
    if not await check_server_running(base_url):
        print(f"❌ Server is not running at {base_url}")
        print("\n💡 Please start the server first:")
        print("   cd backend")
        print("   python main.py")
        print("\n   Or run in background and then run this test again.")
        sys.exit(1)
    
    print(f"✅ Server is running at {base_url}")
    
    tester = PerformanceTester(base_url)
    await tester.run_tests()


if __name__ == "__main__":
    asyncio.run(main())

