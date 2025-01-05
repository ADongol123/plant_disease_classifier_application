import os
import pandas as pd
import base64
from io import BytesIO
from PIL import Image

def image_to_base64(image_path):
    """Converts an image file to a base64 encoded string."""
    with Image.open(image_path) as img:
        # Convert image to 'RGB' mode if it's in 'RGBA' mode
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        buffered = BytesIO()
        img.save(buffered, format="JPEG")  # Save as JPEG after conversion
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

def create_metadata(data_dir):
    """
    Creates a metadata file for the PlantVillage dataset.

    Args:
        data_dir: Path to the directory containing the image data (e.g., 'data').

    Returns:
        pandas.DataFrame: DataFrame containing the metadata.
    """
    data = []
    for disease_category in os.listdir(data_dir):
        disease_dir = os.path.join(data_dir, disease_category)
        if not os.path.isdir(disease_dir):  # Skip if not a directory
            continue

        for image_file in os.listdir(disease_dir):
            image_path = os.path.join(disease_dir, image_file)

            # Ensure it's an actual file
            if os.path.isfile(image_path):
                # Parse plant species and disease label
                if "healthy" in disease_category.lower():
                    plant_species = disease_category.split("__")[0]
                    disease_label = "healthy"
                else:
                    plant_species, disease_label = disease_category.split("__")

                # Convert the image to a base64 string
                image_base64 = image_to_base64(image_path)

                data.append({
                    'image_filename': image_file,
                    'plant_species': plant_species,
                    'disease_label': disease_label,
                    'image': image_base64,  # Store the base64 string here
                })

    df = pd.DataFrame(data)
    return df

# Example usage
if __name__ == "__main__":
    data_dir = os.path.join('..', 'data')  # Navigate to the 'data' directory
    metadata_df = create_metadata(data_dir)

    # Save the metadata to a CSV file
    metadata_df.to_csv('metadata_with_images.csv', index=False)
    print("Metadata file 'metadata_with_images.csv' has been created successfully.")
