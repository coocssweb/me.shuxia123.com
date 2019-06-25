import { EMPTY_FUNCTION } from '../../../constant';

export default class FileChunk {
    private static readonly defaultOptions = {
        server: '',
        progressCallbackFn: Function
    }
    
    private formData: FormData;
    private options;

    constructor (formData: FormData, options) {
        this.formData = formData;
        this.options = { ...FileChunk.defaultOptions, ...options };
    }
    
    public upload () {
        const xmlHttpRequest = new XMLHttpRequest();
        const promise = new Promise((resolve, reject) => {
            xmlHttpRequest.onreadystatechange = () => {
                if (xmlHttpRequest.readyState !== 4) {
                    return;
                }
                if (xmlHttpRequest.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            };
        });

        xmlHttpRequest.addEventListener('progress', this.handleProgress.bind(this));
        xmlHttpRequest.upload.addEventListener('progress', this.handleProgress.bind(this));
        xmlHttpRequest.open('POST', this.options.server);
        xmlHttpRequest.send(this.formData);

        return promise;
    }

    private handleProgress (event: any) {
        this.options.progressCallbackFn(event.loaded);
    }
}