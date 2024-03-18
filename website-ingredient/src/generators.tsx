import { SHA256 } from 'crypto-js';
export function getBase64(file:any) { 
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var encoded;
        if(!reader.result){
            return "";
        }
        if (reader.result instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(reader.result);
            const textDecoder = new TextDecoder('utf-8'); // Specify the encoding
            encoded = textDecoder.decode(uint8Array);
        }
        else{
            encoded = reader.result;
        }
        resolve(encoded.split("base64,")[1]);
      };
      reader.onerror = error => reject(error);
    });
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const hexParts: string[] = [];
  byteArray.forEach((byte) => {
    hexParts.push(byte.toString(16));
  });
  return hexParts.join('');
}

export function getHashKey(binaryData: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arrayBuffer = reader.result;
        const hash = SHA256(arrayBufferToHex(arrayBuffer)).toString();
        resolve(hash);
      } else {
        reject(new Error('Failed to read file as binary'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    if(binaryData)
      reader.readAsArrayBuffer(binaryData);
  });
}

export function base64toFile(base64Data: string, fileName: string, mimeType: string): File {
  const byteCharacters = atob(base64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
 
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  // Add leading zero to minutes if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${year} ${hours}:${formattedMinutes} ${amOrPm}`;
};