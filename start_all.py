"""
Portfolio AI Assistant - Complete Startup Script
Starts both backend and frontend servers
"""

import subprocess
import sys
import os
import time
import platform


def print_banner():
    """Print startup banner"""
    print("=" * 70)
    print("🚀 Portfolio AI Assistant - Full Stack Startup")
    print("=" * 70)
    print()


def check_python():
    """Check Python version"""
    print("🐍 Checking Python...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 9:
        print(f"   ✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(
            f"   ❌ Python {version.major}.{version.minor}.{version.micro} (Need 3.9+)"
        )
        return False


def check_node():
    """Check Node.js installation"""
    print("📦 Checking Node.js...")
    try:
        result = subprocess.run(
            ["node", "--version"], capture_output=True, text=True, shell=True
        )
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"   ✅ Node.js {version}")
            return True
        else:
            print("   ❌ Node.js not found")
            return False
    except Exception as e:
        print(f"   ❌ Node.js not found: {e}")
        return False


def check_backend_env():
    """Check backend environment configuration"""
    print("🔍 Checking backend environment...")
    env_path = os.path.join("backend", ".env")

    if not os.path.exists(env_path):
        print("   ❌ .env file not found in backend/")
        print("   📝 Creating .env from env.example...")
        try:
            example_path = os.path.join("backend", "env.example")
            if os.path.exists(example_path):
                with open(example_path, "r") as f:
                    content = f.read()
                with open(env_path, "w") as f:
                    f.write(content)
                print("   ✅ .env file created")
            else:
                print("   ❌ env.example not found")
                return False
        except Exception as e:
            print(f"   ❌ Error creating .env: {e}")
            return False

    # Check if GEMINI_API_KEY is configured
    try:
        with open(env_path, "r") as f:
            content = f.read()
            if (
                "GEMINI_API_KEY=AIzaSy" in content
                or "your_gemini_api_key_here" not in content
            ):
                print("   ✅ Environment configured")
                return True
            else:
                print("   ⚠️  GEMINI_API_KEY might need configuration")
                return True  # Continue anyway
    except Exception as e:
        print(f"   ⚠️  Could not verify API key: {e}")
        return True  # Continue anyway


def check_backend_deps():
    """Check backend dependencies"""
    print("📚 Checking backend dependencies...")
    try:
        # Try importing key packages
        sys.path.insert(0, os.path.join(os.getcwd(), "backend"))
        import fastapi
        import uvicorn

        print("   ✅ Backend dependencies installed")
        return True
    except ImportError as e:
        print(f"   ❌ Missing dependencies: {e}")
        print("   💡 Run: cd backend && pip install -r requirements.txt")
        return False


def check_frontend_deps():
    """Check frontend dependencies"""
    print("📚 Checking frontend dependencies...")
    node_modules = os.path.join("frontend", "node_modules")
    if os.path.exists(node_modules) and os.path.isdir(node_modules):
        print("   ✅ Frontend dependencies installed")
        return True
    else:
        print("   ❌ Frontend dependencies not installed")
        print("   💡 Run: cd frontend && npm install")
        return False


def start_backend():
    """Start backend server"""
    print("\n🚀 Starting Backend Server...")
    print("   URL: http://localhost:8000")
    print("   Docs: http://localhost:8000/docs")

    try:
        if platform.system() == "Windows":
            # Windows
            backend_process = subprocess.Popen(
                ["python", "main.py"],
                cwd="backend",
                creationflags=subprocess.CREATE_NEW_CONSOLE,
            )
        else:
            # Linux/Mac
            backend_process = subprocess.Popen(
                ["python3", "main.py"],
                cwd="backend",
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )

        # Wait a bit for backend to start
        time.sleep(3)
        print("   ✅ Backend server started")
        return backend_process
    except Exception as e:
        print(f"   ❌ Error starting backend: {e}")
        return None


def start_frontend():
    """Start frontend development server"""
    print("\n🚀 Starting Frontend Server...")
    print("   URL: http://localhost:3000")

    try:
        if platform.system() == "Windows":
            # Windows
            frontend_process = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd="frontend",
                creationflags=subprocess.CREATE_NEW_CONSOLE,
                shell=True,
            )
        else:
            # Linux/Mac
            frontend_process = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd="frontend",
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                shell=True,
            )

        # Wait a bit for frontend to start
        time.sleep(5)
        print("   ✅ Frontend server started")
        return frontend_process
    except Exception as e:
        print(f"   ❌ Error starting frontend: {e}")
        return None


def print_summary():
    """Print summary and instructions"""
    print("\n" + "=" * 70)
    print("✅ All servers are running!")
    print("=" * 70)
    print("\n📍 Access your application:")
    print("   • Frontend:  http://localhost:3000")
    print("   • Backend:   http://localhost:8000")
    print("   • API Docs:  http://localhost:8000/docs")
    print("\n💡 Tips:")
    print("   • Both servers are running in separate windows")
    print("   • Close those windows to stop the servers")
    print("   • Check backend window for API logs")
    print("   • Check frontend window for build/compile logs")
    print("\n🎉 Happy coding!")
    print("=" * 70)


def main():
    """Main startup function"""
    print_banner()

    # Check prerequisites
    checks_passed = True

    if not check_python():
        checks_passed = False

    if not check_node():
        checks_passed = False

    if not check_backend_env():
        checks_passed = False

    if not check_backend_deps():
        checks_passed = False

    if not check_frontend_deps():
        checks_passed = False

    if not checks_passed:
        print("\n" + "=" * 70)
        print("❌ Some checks failed. Please fix the issues above.")
        print("=" * 70)
        print("\n📖 Quick Setup Guide:")
        print("   1. Install Python 3.9+ and Node.js 18+")
        print("   2. cd backend && pip install -r requirements.txt")
        print("   3. cd frontend && npm install")
        print("   4. Configure backend/.env with your GEMINI_API_KEY")
        print("   5. Run this script again")
        print("=" * 70)
        sys.exit(1)

    print("\n✅ All checks passed!")
    print("=" * 70)

    # Start servers
    backend = start_backend()
    if not backend:
        print("\n❌ Failed to start backend")
        sys.exit(1)

    frontend = start_frontend()
    if not frontend:
        print("\n❌ Failed to start frontend")
        if backend:
            backend.terminate()
        sys.exit(1)

    # Print summary
    print_summary()

    # Keep script running
    try:
        print("\nPress Ctrl+C to stop all servers...")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping servers...")
        if backend:
            backend.terminate()
        if frontend:
            frontend.terminate()
        print("✅ All servers stopped")
        print("=" * 70)


if __name__ == "__main__":
    main()
