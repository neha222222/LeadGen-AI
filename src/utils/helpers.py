import re
from typing import List, Dict, Any
import json
from datetime import datetime

def clean_text(text: str) -> str:
    """
    Clean and normalize text data
    """
    if not text:
        return ""
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Remove special characters
    text = re.sub(r'[^\w\s-]', '', text)
    
    return text.strip()

def validate_url(url: str) -> bool:
    """
    Validate URL format
    """
    url_pattern = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
        r'localhost|'  # localhost
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # IP
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    
    return bool(url_pattern.match(url))

def format_company_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Format and clean company data
    """
    formatted = {
        'name': clean_text(data.get('name', '')),
        'website': data.get('website', ''),
        'description': clean_text(data.get('description', '')),
        'contact_info': {
            'email': clean_text(data.get('contact_info', {}).get('email', '')),
            'phone': clean_text(data.get('contact_info', {}).get('phone', '')),
            'address': clean_text(data.get('contact_info', {}).get('address', ''))
        },
        'social_media': data.get('social_media', {}),
        'last_updated': datetime.now().isoformat()
    }
    
    return formatted

def export_to_json(data: List[Dict[str, Any]], filename: str) -> bool:
    """
    Export data to JSON file
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error exporting data: {str(e)}")
        return False

def calculate_similarity(text1: str, text2: str) -> float:
    """
    Calculate similarity between two text strings
    """
    # TODO: Implement more sophisticated similarity calculation
    # For now, using a simple character-based similarity
    if not text1 or not text2:
        return 0.0
        
    text1 = text1.lower()
    text2 = text2.lower()
    
    # Calculate Jaccard similarity
    set1 = set(text1.split())
    set2 = set(text2.split())
    
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    
    return intersection / union if union > 0 else 0.0 