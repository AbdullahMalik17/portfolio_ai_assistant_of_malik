import requests
import sqlite3
import sys
import time
import os

def test_contact_submission():
    print("🚀 Testing Contact Form Submission...")
    
    url = "http://127.0.0.1:8000/api/contact"
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message to verify database storage."
    }
    
    try:
        # 1. Send POST request
        print(f"   Sending POST request to {url}...")
        try:
            response = requests.post(url, json=data)
        except requests.exceptions.ConnectionError:
             print("   ❌ Connection failed. Is the backend server running?")
             return False
        
        if response.status_code == 200:
            print("   ✅ Request successful")
        else:
            print(f"   ❌ Request failed: {response.status_code} - {response.text}")
            return False

        # 2. Verify Database
        print("   🔍 Verifying database content...")
        
        # Check multiple possible locations
        possible_paths = [
            "backend/contacts.db",
            "f:/Portfolio_AI_Assistant/backend/contacts.db",
            "contacts.db"
        ]
        
        found_db = False
        for db_path in possible_paths:
            if os.path.exists(db_path):
                print(f"   Found database at: {db_path}")
                try:
                    conn = sqlite3.connect(db_path)
                    cursor = conn.cursor()
                    cursor.execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 1")
                    row = cursor.fetchone()
                    conn.close()
                    
                    if row:
                        print(f"   ✅ Found entry in database: {row}")
                        if row[1] == data["name"] and row[2] == data["email"]:
                            print("   ✅ Data matches submitted values")
                            found_db = True
                            break
                except Exception as e:
                    print(f"   ⚠️ Error reading {db_path}: {e}")
        
        if found_db:
            return True
        else:
            print("   ❌ Could not find entry in any database file")
            return False

    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

if __name__ == "__main__":
    if test_contact_submission():
        print("\n✅ Verification Successful!")
        sys.exit(0)
    else:
        print("\n❌ Verification Failed")
        sys.exit(1)
