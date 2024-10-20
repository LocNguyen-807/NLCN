// Import the necessary Firebase functions
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase"; // Ensure this path is correct

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to upload a single image
export const uploadSingleImage = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        console.log('Uploaded a single image:', snapshot.metadata.fullPath);
        return snapshot.metadata.fullPath;
    } catch (error) {
        console.error('Error uploading single image:', error);
        throw error;
    }
};

// Function to upload multiple images
export const uploadMultipleImages = async (files) => {
    try {
        const uploadPromises = files.map(file => {
            const storageRef = ref(storage, `images/${file.originalname}`);
            return uploadBytes(storageRef, file.buffer);
        });

        const snapshots = await Promise.all(uploadPromises);
        console.log('Uploaded multiple images:', snapshots.map(snap => snap.metadata.fullPath));
        return snapshots.map(snap => snap.metadata.fullPath);
    } catch (error) {
        console.error('Error uploading multiple images:', error);
        throw error;
    }
};

