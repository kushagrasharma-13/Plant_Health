import os
import CNN
import torch
import numpy as np
import pandas as pd
from PIL import Image
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

# Load disease and supplement information
disease_info = pd.read_csv('./disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('./supplement_info.csv', encoding='cp1252')

# Load the model
model = CNN.CNN(39)
model.load_state_dict(torch.load("./plant_disease_model_1_latest.pt"))
model.eval()

def preprocess_image(image_path):
    """Preprocess the image for model prediction."""
    image = Image.open(image_path).convert('RGB')
    image = image.resize((224, 224))
    image_array = np.array(image).astype(np.float32) / 255.0
    image_tensor = torch.tensor(image_array).permute(2, 0, 1).unsqueeze(0)  # Convert to tensor and add batch dimension
    return image_tensor

def prediction(image_path):
    input_data = preprocess_image(image_path)
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit the upload size to 16MB

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(file_path)
        
        # Call the prediction function with the saved file path
        pred = prediction(file_path)
        title = disease_info['disease_name'][pred]
        description = disease_info['description'][pred]
        prevent = disease_info['Possible Steps'][pred]
        supplement_name = supplement_info['supplement name'][pred]
        supplement_image_url = supplement_info['supplement image'][pred]
        supplement_buy_link = supplement_info['buy link'][pred]

        # Return JSON response
        return jsonify({
            'title': title,
            'description': description,
            'prevention': prevent,
            'supplement_name': supplement_name,
            'supplement_image': supplement_image_url,
            'buy_link': supplement_buy_link
        })
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
