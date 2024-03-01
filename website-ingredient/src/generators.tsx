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
import crypto from 'crypto';

export function getHashKey(binaryData: any): string {
  const hash = SHA256(binaryData as string).toString();
  const shortHash = hash.substring(0, 8);
  return shortHash;
}