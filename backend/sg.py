import pandas as pd

# Load the CSV file using 'cp1252' encoding
file_path = './supplement_info.csv'
data = pd.read_csv(file_path, encoding='cp1252')

# Convert and save the CSV file to a more efficient encoding, such as 'utf-8'
converted_file_path = './supplement_info_utf8.csv'
data.to_csv(converted_file_path, encoding='utf-8', index=False)

# Display the first few rows of the data to confirm successful reading and conversion
data.head()
