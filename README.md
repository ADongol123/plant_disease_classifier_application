# Plant Disease Prediction Model with React

This project uses a machine learning model to predict plant diseases based on images. The model is trained on the **PlantVillage dataset** and is integrated into a React web application that allows users to upload images and get disease predictions for their plants.

## Dataset

The model is trained using the **PlantVillage dataset** available on Kaggle:

[PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)

This dataset contains images of plant leaves with various diseases for different plant species. It is used to classify and detect plant diseases based on the leaf images.

## Technologies Used

- **Machine Learning**: 
  - PyTorch (for model training)
  - FastAPI (for building the backend API)
- **Frontend**:
  - React.js (for building the user interface)
  - Axios (for making HTTP requests to the backend)
- **Backend**:
  - FastAPI (for serving the trained model and handling requests)
- **Model**:
  - Convolutional Neural Network (CNN) for image classification

## Features

- Upload an image of a plant leaf.
- Get predictions on the plant disease.
- Display the results with the disease name and description.
- Interactive frontend built with React for a seamless user experience.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/plant-disease-prediction.git
cd plant-disease-prediction
