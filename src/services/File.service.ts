import { v4 as uuidV4 } from "uuid";

import Service from "./Services";

import { File } from "../@types";

export default class FileService extends Service {
  private static getSignedUrl(fileInfo: File.UploadRequestInput) {
    return this.Http.post<File.UploadRequest>("/upload-requests", fileInfo)
      .then(this.getData)
      .then((response) => response.uploadSignedUrl);
  }

  private static uploadFileToSignedUrl(signedUrl: string, file: File) {
    /**
     * ! This Method is specific for
     * ! Google Cloud Platform
     */
    return this.Http.put<{}>(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    }).then(this.getData);
  }

  private static getFileExtension(fileName: string){
     /**
     * * slice(-1) retorna a ultima posição do array
     */
    const [extension] = fileName.split(".").slice(-1);

    return extension
  }

  private static generateFileName(extension: string){
    return `${uuidV4()}.${extension}`
  }

  static async upload(file: File) {
   
    const extension = this.getFileExtension(file.name)

    const fileName = this.generateFileName(extension)

    const signedUrl = await FileService.getSignedUrl({
      fileName,
      contentLength: file.size,
    });

    await FileService.uploadFileToSignedUrl(signedUrl, file);

    return signedUrl.split('?')[0]
  }
}
