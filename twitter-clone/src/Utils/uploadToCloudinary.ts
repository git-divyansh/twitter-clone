export const uploadToCloudinary = async (pics: File): Promise<string | undefined> => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    if (!pics) {
        console.error("No file provided for upload.");
        return;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to upload: ${response.status} ${response.statusText}. Response: ${errorText}`);
        }

        const fileData = await response.json();
        console.log("Uploaded file data:", fileData);

        // Return the secure URL of the uploaded image
        return fileData.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return undefined;
    }
};
