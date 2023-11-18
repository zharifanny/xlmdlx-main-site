import os
import subprocess

# Get the folder path from user input
FOLDER_PATH = input("Enter the path to the folder containing PDF files: ")

# Define the list of supported file formats and their corresponding tools to remove metadata
TOOLS = {
    ".pdf": ["pdftk", "input.pdf", "output", "output.pdf", "metadata", "output", ""]
}

# Iterate through the files in the folder
for filename in os.listdir(FOLDER_PATH):
    file_path = os.path.join(FOLDER_PATH, filename)
    file_ext = os.path.splitext(file_path)[1]

    # Check if the file format is supported and get the corresponding tool
    if file_ext not in TOOLS:
        print(f"Metadata removal not supported for {filename}. Skipping...")
        continue

    tool = TOOLS[file_ext]

    # Ask the user for confirmation before proceeding with metadata removal for each file
    response = input(f"This action will permanently remove metadata from {filename}. Do you want to proceed? (y/n)").lower()
    if response != 'y':
        continue

    # Construct the command to remove metadata using the selected tool
    cmd = [tool[0], file_path] + tool[1:]

    # Run the command to remove metadata
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        print(f"Metadata removal completed successfully for {filename}!")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while processing {filename}: {e}")
