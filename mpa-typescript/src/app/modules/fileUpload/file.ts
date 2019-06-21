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
        api: '',
        quality: 1,
        progress: EMPTY_FUNCTION,
        done: EMPTY_FUNCTION
    };

    private file: File;
    private fileName: string;
    private fileSize: number;
    private chunkTotal: number;
    private status: Status = Status.Waiting;
    private chunks: Array<FileChunk> = [];
    private chunksProgress: Array<number>;
    private chunksStatus: Array<boolean>;
    private options;

    constructor (file: File, options) {
        this.file = file;
        this.fileSize = file.size;
        this.fileName = file.name;
        this.options = { ...UploadFile.defaultOption, ...options };
        this.chunkTotal = Math.ceil(this.fileSize / this.options.chunkSize);

        this.chunksProgress = Array(this.chunkTotal).fill(0);
        this.chunksStatus = Array(this.chunkTotal).fill(false);
    }

    public upload () {
        if (this.status !== Status.Waiting) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.file);
        fileReader.addEventListener('load', (event: any) => {
            const fileArrayBuffer = event.target.result;
            let index = 0;
            while (index < this.chunkTotal) {
                const chunkArrayBuffer = fileArrayBuffer.slice(index * this.options.chunkSize, (index + 1) * this.options.chunkSize);
                const formData = new FormData();
                formData.append(`${index}`, chunkArrayBuffer);
                formData.append('filename', this.fileName);
                formData.append('total', `${this.chunkTotal}`);

                this.chunks[index] = new FileChunk(formData, {
                    api: this.options.api,
                    progressCallbackFn: this.handleProgressChange.bind(this, index),
                    doneCallbackFn: this.handleDone.bind(this, index)
                });

                index++;
            }

            // batch upload chunk
            this.chunks.forEach((chunk, index) => {
                chunk.upload();
            });
        });
    }

    private handleProgressChange (index: number, progressValue: number) {
        this.chunksProgress[index] = progressValue;
        const totalProgress = this.chunksProgress.reduce((total, current) => total + current);
        const averageProgress = (totalProgress * 100) / this.fileSize;
        this.options.progress(averageProgress.toFixed(1));
    }

    private handleDone (index: number) {
        this.chunksStatus[index] = true;
        const status = this.chunksStatus.reduce((prev, current) => prev && current, true);
        status && this.options.done();
    }
};

export default UploadFile;