import FileChunk from './fileChunk';
import Compress from './compress';
import { EMPTY_FUNCTION } from '../../../constant';
enum Status {
    Waiting,
    Uploading,
    Uploaded
};

class UploadFile {
    static readonly defaultOption = {
        chunkSize: 100 * 1024,
        server: '',
        quality: 1,
        preview: EMPTY_FUNCTION,
        ready: EMPTY_FUNCTION,
        progress: EMPTY_FUNCTION,
        success: EMPTY_FUNCTION,
    };

    private file: Blob;
    private fileName: string;
    private fileSize: number;
    private chunkTotal: number;
    private status: Status = Status.Waiting;
    private chunks: Array<FileChunk> = [];
    private chunksProgress: Array<number>;
    private options;

    constructor (file: File, options) {
        this.options = { ...UploadFile.defaultOption, ...options };

        this.init(file).then((blob) => {
            this.file = blob;
            this.fileSize = blob.size;
            this.fileName = file.name;
            this.chunkTotal = Math.ceil(this.fileSize / this.options.chunkSize);
            this.chunksProgress = Array(this.chunkTotal).fill(0);
        });
    }

    /**
     * public method, for custom start upload file
     */
    public upload () {
        if (this.status !== Status.Waiting) {
            return;
        }

        let chunkIndex = 0;
        while (chunkIndex < this.chunkTotal) {
            const blob = this.file.slice(chunkIndex * this.options.chunkSize, (chunkIndex + 1) * this.options.chunkSize - 1);
            const formData = new FormData();
            formData.append('chunk', `${chunkIndex}`);
            formData.append('filename', this.fileName);
            formData.append('chunksize', `${this.chunkTotal}`);
            formData.append('file', blob);

            this.chunks[chunkIndex] = new FileChunk(formData, {
                server: this.options.server,
                progressCallbackFn: this.handleProgressChange.bind(this, chunkIndex),
                doneCallbackFn: this.handleDone.bind(this, chunkIndex)
            });

            chunkIndex++;
        }

        // upload chunk index zero
        this.uploadOneChunk(0);
    }

    /**
     * get file base64
     * call preivew callback fn
     * compress file, and convert base64 to blob
     * call ready callback fn
     * @param file
     */
    private async init (file:File) {
        const base64 = await this.getFileBase64(file);
        this.options.preview(base64);
        const compressBase64 = await this.withCompress(base64);
        const fileBlob = this.convertBase64ToBlob(compressBase64);
        this.options.ready();
        return fileBlob;
    }

    private convertBase64ToBlob (base64:string) {
        const array = base64.split(',');
        const type = array[0].match(/:(.*?)/)[1];
        const blobStr = atob(array[1]);
        let blobLength = blobStr.length;
        const unit8Array = new Uint8Array(blobLength);

        while (blobLength--) {
            unit8Array[blobLength] = blobStr.charCodeAt(blobLength);
        }

        return new Blob([unit8Array], { type});
    }

    private getFileBase64 (file:File): Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (event: any) => {
                resolve(event.target.content);
            };
        });
        
        return promise;
    }

    private withCompress (fileBase64: string): Promise<string> {
        // don't compress
        if (this.options.quality === 1) {
            return new Promise<string>((resolve) => {
                resolve(fileBase64);
            });
        }

        const promise = new Promise<string>((resolve, reject) => {
            // success compress callback fn
            const compressSuccess = (base64: string) => {
                resolve(base64);
            };

            new Compress(fileBase64, { 
                quality: this.options.quality, 
                success: compressSuccess
            });
        });
        
        return promise;
    }

    /**
     * recursion upload chunks, step by step
     * @param chunkIndex 
     */
    private uploadOneChunk(chunkIndex:number) {
        if (chunkIndex === this.chunkTotal) {
            this.handleDone();
        }
        this.chunks[chunkIndex].upload().then(() => {
            this.uploadOneChunk(chunkIndex++);
        });
    }

    private handleProgressChange (index: number, progressValue: number) {
        this.chunksProgress[index] = progressValue;
        const totalProgress = this.chunksProgress.reduce((total, current) => total + current);
        const averageProgress = (totalProgress * 100) / this.fileSize;
        this.options.progress(averageProgress.toFixed(1));
    }

    private handleDone () {
        this.options.success();
    }
};

export default UploadFile;