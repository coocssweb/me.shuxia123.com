import { EMPTY_FUNCTION } from '../../../constant';

export default class FileChunk {
    private static readonly defaultOptions = {
        api: '',
        progressCallbackFn: Function,
        doneCallbackFn: Function
    }
    
    private formData: FormData;
    private uploadApi: string;
    private options;

    constructor (formData: FormData, options) {
        this.formData = formData;
        this.options = { ...FileChunk.defaultOptions, ...options };
    }
    
    public upload (progressCallback = EMPTY_FUNCTION, done = EMPTY_FUNCTION) {
        const xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState !== 4) {
                return;
            }

            if (xmlHttpRequest.status >= 200 && xmlHttpRequest.status <= 304) {
                this.handleDone();
            } 
        };

        xmlHttpRequest.addEventListener('progress', this.handleProgress.bind(this));
        xmlHttpRequest.upload.addEventListener('progress', this.handleProgress.bind(this));
        xmlHttpRequest.open('POST', this.options.api);
        xmlHttpRequest.send(this.formData);
    }

    private handleProgress (event: any) {
        this.options.progressCallbackFn(event.loaded);
    }

    private handleDone () {
        this.options.doneCallbackFn();
    }
}