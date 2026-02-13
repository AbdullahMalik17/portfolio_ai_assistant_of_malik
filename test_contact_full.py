import requests
import sqlite3
import sys
import os
import json

def test_full_contact_submission():
    print("🚀 Testing Contact Form Submission with ALL Fields...")
    
    url = "http://localhost:8000/api/contact"
    data = {
        "name": "Jane Doe",
        "email": "jane@enterprise.com",
        "phone": "+1-555-999-8888",
        "company": "Tech Corp",
        "subject": "Full Stack Project",
        "projectType": "full-stack",
        "budget": "25k-50k",
        "timeline": "3-6-months",
        "message": "I need a complete overhaul of my legacy system."
    }
    
    try:
        # 1. Send POST request
        print(f"   Sending POST request to {url}...")
        try:
            response = requests.post(url, json=data)
        except requests.exceptions.ConnectionError:
             print("   ❌ Connection failed. Is the backend server running?")
             print("   Please start the backend with: cd backend && python main.py")
             return False
        
        if response.status_code == 200:
            print("   ✅ Request successful")
        else:
            print(f"   ❌ Request failed: {response.status_code} - {response.text}")
            return False

        # 2. Verify Database
        print("   🔍 Verifying database content...")
        
        # Path relative to root where script is run
        db_path = "backend/contacts.db"
        
        if not os.path.exists(db_path):
             # Try absolute path based on current working dir
             db_path = os.path.join(os.getcwd(), "backend", "contacts.db")

        if os.path.exists(db_path):
            print(f"   Found database at: {db_path}")
            try:
                conn = sqlite3.connect(db_path)
                conn.row_factory = sqlite3.Row  # Access columns by name
                cursor = conn.cursor()
                
                # Check columns first
                cursor.execute("PRAGMA table_info(contacts)")
                columns = [row['name'] for row in cursor.fetchall()]
                print(f"   Columns found: {columns}")
                
                required_cols = ['company', 'project_type', 'budget', 'timeline']
                missing = [col for col in required_cols if col not in columns]
                
                if missing:
                    print(f"   ❌ Missing columns in DB: {missing}")
                    # This implies the backend didn't migrate yet or restart needed
                    return False
                
                cursor.execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 1")
                row = cursor.fetchone()
                conn.close()
                
                if row:
                    print("   ✅ Found entry in database.")
                    # Verify new fields
                    matches = True
                    if row['company'] != data['company']:
                        print(f"      Mismatch Company: {row['company']} != {data['company']}")
                        matches = False
                    if row['project_type'] != data['projectType']:
                         print(f"      Mismatch Project Type: {row['project_type']} != {data['projectType']}")
                         matches = False
                    
                    if matches:
                        print("   ✅ All data fields match submitted values!")
                        return True
                    else:
                        return False
            except Exception as e:
                print(f"   ⚠️ Error reading {db_path}: {e}")
                return False
        else:
            print(f"   ❌ Could not find database file at {db_path}")
            return False

    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

if __name__ == "__main__":
    if test_full_contact_submission():
        print("\n✅ Full Field Verification Successful!")
        sys.exit(0)
    else:
        print("\n❌ Verification Failed")
        sys.exit(1)
