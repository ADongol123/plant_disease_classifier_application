# Import necessary libraries
from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
from io import BytesIO
import uvicorn

# Load your trained model
MODEL = load_model("../models/trained_plant_disease_model.keras")

# Initialize FastAPI app
app = FastAPI()

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

def preprocess_image(img_bytes):
    # Open the image from the bytes object
    img = image.load_img(BytesIO(img_bytes), target_size=(128, 128))

    # Convert the image to a numpy array
    img_array = image.img_to_array(img)

    img_batch = np.expand_dims(img_array, axis=0)

    return img_batch


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read image file bytes
    img_bytes = await file.read()

    # Preprocess the image
    img_batch = preprocess_image(img_bytes)

    # Debugging: Print the shape of the preprocessed image
    print(f"Image batch shape: {img_batch.shape}")

    # Make the prediction using the trained model
    predictions = MODEL.predict(img_batch)

    # Debugging: Print raw predictions
    print(f"Raw predictions: {predictions}")

    # Use argmax for classification (if output is a probability distribution)
    predicted_class_index = np.argmax(predictions)

    # Debugging: Print the predicted class index
    print(f"Predicted class index: {predicted_class_index}")

    # Map the predicted class index to the class name
    predicted_class_name = CLASS_NAMES[predicted_class_index]

    confidence = np.max(predictions) * 100
    confidence_str = f"{confidence:.2f}%"

    print(f"Confidence Level: {confidence}")

    # Debugging: Print the predicted class name
    print(f"Predicted class name: {predicted_class_name}")

    return {"predicted_class": predicted_class_name,
            "confidence": confidence_str
            }


# To run the FastAPI server (uncomment the following lines if running directly)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
