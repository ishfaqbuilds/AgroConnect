// Cloudinary Upload Function
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();
        
        if (data.secure_url) {
            return {
                success: true,
                url: data.secure_url,
                publicId: data.public_id
            };
        } else {
            return {
                success: false,
                error: 'Upload failed'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
