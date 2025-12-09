import requests
import sys
import json
from datetime import datetime

class JobBoardAPITester:
    def __init__(self, base_url="https://hirefinder-20.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "status": "PASS" if success else "FAIL",
            "details": details
        }
        self.test_results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {name}: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=10):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            else:
                self.log_test(name, False, f"Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    self.log_test(name, True, f"Status: {response.status_code}")
                    return True, response_data
                except json.JSONDecodeError:
                    self.log_test(name, True, f"Status: {response.status_code} (No JSON response)")
                    return True, {}
            else:
                try:
                    error_data = response.json()
                    self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}. Error: {error_data}")
                except:
                    self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}. Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            self.log_test(name, False, f"Request timeout after {timeout}s")
            return False, {}
        except requests.exceptions.ConnectionError:
            self.log_test(name, False, "Connection error - server may be down")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        success, response = self.run_test(
            "API Health Check",
            "GET",
            "api",
            200
        )
        return success

    def test_get_all_jobs(self):
        """Test fetching all jobs"""
        success, response = self.run_test(
            "Get All Jobs",
            "GET", 
            "api/jobs",
            200
        )
        
        if success:
            if isinstance(response, list):
                job_count = len(response)
                self.log_test("Jobs Data Validation", True, f"Retrieved {job_count} jobs")
                
                # Validate job structure if jobs exist
                if job_count > 0:
                    first_job = response[0]
                    required_fields = ['id', 'title', 'company', 'category', 'location', 'description', 'postedDate']
                    missing_fields = [field for field in required_fields if field not in first_job]
                    
                    if not missing_fields:
                        self.log_test("Job Structure Validation", True, "All required fields present")
                    else:
                        self.log_test("Job Structure Validation", False, f"Missing fields: {missing_fields}")
                        return False
                        
                return True
            else:
                self.log_test("Jobs Response Format", False, "Response is not a list")
                return False
        
        return success

    def test_create_job_valid(self):
        """Test creating a job with valid data"""
        test_job = {
            "title": f"Test Job {datetime.now().strftime('%H%M%S')}",
            "company": "Test Company Inc",
            "category": "Development",
            "location": "Remote",
            "description": "This is a test job posting created by automated testing."
        }
        
        success, response = self.run_test(
            "Create Job (Valid Data)",
            "POST",
            "api/jobs",
            201,
            data=test_job
        )
        
        if success:
            # Validate response structure
            required_fields = ['id', 'title', 'company', 'category', 'location', 'description']
            missing_fields = [field for field in required_fields if field not in response]
            
            if not missing_fields:
                self.log_test("Created Job Response Validation", True, f"Job created with ID: {response.get('id', 'N/A')}")
                return response.get('id')
            else:
                self.log_test("Created Job Response Validation", False, f"Missing fields in response: {missing_fields}")
        
        return None

    def test_create_job_invalid(self):
        """Test creating a job with invalid/missing data"""
        # Test missing required fields
        invalid_jobs = [
            ({}, "Empty data"),
            ({"title": "Test"}, "Missing company, category, location, description"),
            ({"title": "Test", "company": "Test Co"}, "Missing category, location, description"),
            ({"title": "", "company": "Test Co", "category": "Development", "location": "Remote", "description": "Test"}, "Empty title")
        ]
        
        all_passed = True
        for invalid_job, description in invalid_jobs:
            success, response = self.run_test(
                f"Create Job Invalid ({description})",
                "POST",
                "api/jobs", 
                400,
                data=invalid_job
            )
            if not success:
                all_passed = False
        
        return all_passed

    def test_category_validation(self):
        """Test that valid categories are accepted"""
        valid_categories = ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'Other']
        
        for category in valid_categories:
            test_job = {
                "title": f"Test {category} Job",
                "company": "Test Company",
                "category": category,
                "location": "Remote",
                "description": f"Test job for {category} category"
            }
            
            success, response = self.run_test(
                f"Create Job with {category} Category",
                "POST",
                "api/jobs",
                201,
                data=test_job
            )
            
            if not success:
                return False
        
        return True

def main():
    print("🚀 Starting Job Board API Tests...")
    print("=" * 50)
    
    tester = JobBoardAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_check,
        tester.test_get_all_jobs,
        tester.test_create_job_valid,
        tester.test_create_job_invalid,
        tester.test_category_validation
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
        print()
    
    # Print summary
    print("=" * 50)
    print(f"📊 Test Summary: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())