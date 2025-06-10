from PIL import Image, ImageDraw
import os

def create_favicon():
    # Create a 32x32 image with a transparent background
    size = 32
    image = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    
    # Draw a simple "L" shape in indigo color
    color = (79, 70, 229)  # Indigo color
    draw.rectangle([8, 8, 12, 24], fill=color)  # Vertical line
    draw.rectangle([12, 20, 24, 24], fill=color)  # Horizontal line
    
    # Save as ICO
    os.makedirs('static', exist_ok=True)
    image.save('static/favicon.ico', format='ICO')

if __name__ == '__main__':
    create_favicon() 