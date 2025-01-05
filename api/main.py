from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
from io import BytesIO
import uvicorn
import os
# from dotenv import load_dotenv
import requests

# load_dotenv()  # This will load the variables from .env file

# API_KEY = os.getenv("API_KEY")

# Load your trained model
MODEL = load_model("../models/trained_plant_disease_model.keras")

# Initialize FastAPI app
app = FastAPI()

# Define CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Class names for predictions
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Scientific information for each plant disease
SCIENTIFIC_INFO = {
    'Apple___Apple_scab': "Apple scab is caused by the fungus Venturia inaequalis, leading to dark, sunken lesions on leaves and fruit.",
    'Apple___Black_rot': "Black rot is caused by the bacterium Xanthomonas campestris and affects apples by causing dark, sunken lesions on fruit.",
    'Apple___Cedar_apple_rust': "Cedar apple rust is caused by the fungus Gymnosporangium juniperi-virginianae, which affects apples and cedars.",
    'Apple___healthy': "Healthy apple plants are free of any visible disease or damage.",
    # Add more scientific information for other classes here
    'Tomato___healthy': "Healthy tomatoes are free from disease and show no signs of stress or infection."
}

# Care recommendations for each plant disease
CARE_RECOMMENDATIONS = {
    'Apple___Apple_scab': "Use fungicides, remove infected leaves, and plant resistant varieties.",
    'Apple___Black_rot': "Prune infected areas and apply copper-based fungicides.",
    'Apple___Cedar_apple_rust': "Remove infected leaves and apply fungicides for control.",
    'Apple___healthy': "Continue with standard care: water, prune, and fertilize as needed.",
    'Tomato___healthy': "Ensure proper watering, sunlight, and periodic pruning to maintain health.",
    # Add more care recommendations for other classes here
}

# Directory for disease-related images
DISEASE_IMAGES_DIR = "../disease_images"  # You should store images of diseases here

def preprocess_image(img_bytes):
    # Open the image from the bytes object
    img = image.load_img(BytesIO(img_bytes), target_size=(128, 128))

    # Convert the image to a numpy array
    img_array = image.img_to_array(img)

    img_batch = np.expand_dims(img_array, axis=0)

    return img_batch


@app.post("/identify/")
async def identify_plant(file: UploadFile = File(...)):
    img_bytes = await file.read()
    
    # Send a POST request to the Plant.id API
    url = "https://api.plant.id/v2/identify"
    headers = {
        # "Api-Key": API_KEY
    }
    files = {
        "image": ("image.jpg", img_bytes, "image/jpeg")
    }
    
    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 200:
        data = response.json()
        return data  # Or process the data as needed
    else:
        return {"error": "Could not identify plant", "status_code": response.status_code}
    

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read image file bytes
    img_bytes = await file.read()

    # Preprocess the image
    img_batch = preprocess_image(img_bytes)

    # Make the prediction using the trained model
    predictions = MODEL.predict(img_batch)

    # Use argmax for classification
    predicted_class_index = np.argmax(predictions)

    # Map the predicted class index to the class name
    predicted_class_name = CLASS_NAMES[predicted_class_index]

    # Retrieve scientific information for the predicted class
    disease_info = SCIENTIFIC_INFO.get(predicted_class_name, "No scientific information available.")
        
    # Retrieve care recommendations for the predicted class
    care_info = CARE_RECOMMENDATIONS.get(predicted_class_name, "No care recommendations available.")

    # Confidence level of the prediction
    confidence = np.max(predictions) * 100
    confidence_str = f"{confidence:.2f}%"

    # Fetch an image related to the disease (if it exists in the directory)
    disease_image_path = os.path.join(DISEASE_IMAGES_DIR, f"{predicted_class_name}.jpg")
    disease_image_url = disease_image_path if os.path.exists(disease_image_path) else None

    return {
        "predicted_class": predicted_class_name,
        "confidence": confidence_str,
        "scientific_info": disease_info,
        "care_info": care_info,
        "disease_image_url": disease_image_url
    }

@app.post("/log_plant/")
async def log_plant_data(disease: str, care_taken: str, note: str):
    # Save plant logs to a simple file or database
    log_entry = f"Disease: {disease}, Care: {care_taken}, Note: {note}\n"
        
    with open("plant_journal.txt", "a") as f:
        f.write(log_entry)

    return {"message": "Plant care logged successfully."}

# To run the FastAPI server (uncomment the following lines if running directly)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
