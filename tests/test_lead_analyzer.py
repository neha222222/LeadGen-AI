import unittest
from src.ai.lead_analyzer import LeadAnalyzer
from src.utils.helpers import format_company_data

class TestLeadAnalyzer(unittest.TestCase):
    def setUp(self):
        self.analyzer = LeadAnalyzer()
        
    def test_analyze_lead(self):
        # Test data
        test_lead = {
            'name': 'Test Company',
            'website': 'https://testcompany.com',
            'description': 'A test company for lead analysis',
            'contact_info': {
                'email': 'test@testcompany.com',
                'phone': '123-456-7890',
                'address': '123 Test St'
            },
            'social_media': {
                'linkedin': 'https://linkedin.com/company/test',
                'twitter': 'https://twitter.com/test'
            }
        }
        
        # Format the test data
        formatted_lead = format_company_data(test_lead)
        
        # Analyze the lead
        analysis = self.analyzer.analyze_lead(formatted_lead)
        
        # Assertions
        self.assertIsInstance(analysis, dict)
        self.assertIn('score', analysis)
        self.assertIn('categories', analysis)
        self.assertIn('sentiment_score', analysis)
        self.assertIn('recommendations', analysis)
        self.assertIn('last_updated', analysis)
        
        # Check score range
        self.assertGreaterEqual(analysis['score'], 0.0)
        self.assertLessEqual(analysis['score'], 1.0)
        
        # Check sentiment score range
        self.assertGreaterEqual(analysis['sentiment_score'], -1.0)
        self.assertLessEqual(analysis['sentiment_score'], 1.0)
        
    def test_empty_lead(self):
        # Test with empty data
        empty_lead = {}
        analysis = self.analyzer.analyze_lead(empty_lead)
        
        # Assertions
        self.assertIsInstance(analysis, dict)
        self.assertEqual(analysis['score'], 0.0)
        self.assertEqual(analysis['categories'], [])
        self.assertEqual(analysis['sentiment_score'], 0.0)
        self.assertEqual(analysis['recommendations'], [])

if __name__ == '__main__':
    unittest.main() 