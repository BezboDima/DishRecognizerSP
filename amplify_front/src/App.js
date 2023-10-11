import React, { useState } from 'react';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle the image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Set the selected image for display
      };

      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  return (
    <div>
      {/* Input element for image selection */}
      <input
        type="file"
        accept="image/*" // Allow only image files to be selected
        onChange={handleImageUpload}
      />
      
      {/* Display the selected image */}
      {selectedImage && (
        <div>
          <p>Selected Image:</p>
          <img src={selectedImage} alt="Selected" width="200" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
