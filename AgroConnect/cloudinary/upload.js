// Image Upload to Cloudinary
async function uploadImage(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        const data = await response.json();
        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
