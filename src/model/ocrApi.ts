import * as MediaLibrary from 'expo-media-library';
//import * as FileSystem from 'expo-file-system';
//import { Platform } from 'react-native';

//import { FileSystemUploadType } from 'expo-file-system';
import apiKeys from '../../apiKeys.json';

// https://ocr.space/ocrapi
const API_URL = 'https://api.ocr.space/parse/image';
const API_KEY = apiKeys.OCR_API_KEY;

function extractTextFromBody(body: any): string {
  if (body.ParsedResults == null) return '';
  if (body.ParsedResults.length < 1) return '';
  const res = body.ParsedResults[0];
  if (res.ParsedText == null) return '';
  return res.ParsedText;
}

export async function fetchPhotoContent(assetId: string, langCode = 'eng'): Promise<string> {
  const { localUri, filename } = await MediaLibrary.getAssetInfoAsync(assetId);

  // used this https://stackoverflow.com/a/42521680
  const match = /\.(\w+)$/.exec(filename);
  const mimeType = match ? `image/${match[1]}`.toLowerCase() : `image`;

  const uploadHeaders = {
    'content-type': 'multipart/form-data',
    apikey: API_KEY,
  };

  //This will be fixed in next Expo SDK
  /* if (Platform.OS === 'ios' && ) {
        const response = await FileSystem.uploadAsync(
            API_URL,
            localUri as string,
            {
                headers: uploadHeaders,
                uploadType: FileSystemUploadType.MULTIPART,
                fieldName: 'file',
                mimeType,
                parameters: {
                    language: langCode,
                    isOverlayRequired: 'False'
                }
            }
        );

        if (response.status !== 200) throw new Error(`HTTP error: ${  response.status}`);

        const json = JSON.parse(response.body);

        if (json.IsErroredOnProcessing)
            return Promise.reject(json.ErrorMessage[0]);

        return extractTextFromBody(json);
    } */
  const formData = new FormData();
  formData.append('language', langCode);
  formData.append('isOverlayRequired', 'False');
  formData.append('file', {
    uri: localUri as string,
    name: filename,
    type: mimeType,
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    headers: uploadHeaders,
  });

  if (!response.ok) {
    response.body && console.warn(response.body);
    throw new Error(`HTTP error: ${response.status}`);
  }

  const json = await response.json();

  if (json.IsErroredOnProcessing) return Promise.reject(json.ErrorMessage[0]);

  return extractTextFromBody(json);
}
