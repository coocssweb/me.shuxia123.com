import '@scss/svg.scss';
import App from '@app';
import { FileUpload } from '@modules/fileUpload/index';

new App({
    data: {
    },
    watchs: {
    },
    bindEvents () {
        document.querySelector('.file').addEventListener('change', function(event: any) {
            const fileUpload = new FileUpload(event.target.files[0], {
                progress: (value) => {
                    console.log(value);
                },
                success: () => {
                    console.log();
                }
            });
            fileUpload.upload();
        });
    },
    init () {

    }
});
