import requests

# Your Unsplash API access key
ACCESS_KEY = 'i-D1dz274wv-ZSU9PFKhxXiT0rHYrK9c1NvgEifQKQ4'

BASE_URL = "https://api.unsplash.com/search/photos"

def fetch_unsplash_images(query, per_page=10):
    headers = {
        "Authorization": f"Client-ID {ACCESS_KEY}"
    }
    
    params = {
        "query": query,
        "per_page": per_page
    }
    
    response = requests.get(BASE_URL, headers=headers, params=params)
    data = response.json()
    
    if 'results' in data:
        return [photo['urls']['full'] for photo in data['results']]
    else:
        print("Error:", data.get('errors', 'Unknown error'))
        return []

if __name__ == "__main__":
    query = input("Enter your search term: ")
    images = fetch_unsplash_images(query)
    
    for idx, img_url in enumerate(images, 1):
        print(f"{idx}. {img_url}")
