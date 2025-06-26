import { ImagePicker } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

export default class ImageService {
    static async requestCameraPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'AmixMusic needs access to your camera to upload images',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    static async pickImage() {
        if (!await this.requestCameraPermission()) {
            throw new Error('Camera permission denied');
        }

        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.8,
        };

        const result = await ImagePicker.launchImageLibrary(options);
        return result.assets[0];
    }

    static async takePhoto() {
        if (!await this.requestCameraPermission()) {
            throw new Error('Camera permission denied');
        }

        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.8,
        };

        const result = await ImagePicker.launchCamera(options);
        return result.assets[0];
    }

    static async uploadImage(imageData) {
        try {
            // TODO: Implement image upload to storage
            return {
                uri: imageData.uri,
                width: imageData.width,
                height: imageData.height,
                type: imageData.type,
                fileName: imageData.fileName
            };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}
