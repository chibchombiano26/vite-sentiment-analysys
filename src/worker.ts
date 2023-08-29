import { Pipeline, pipeline } from '@xenova/transformers';

// create a static class to hold the pipeline
class PipelineHolder {
    static pipe: Pipeline;

    static async init() {
        if(!this.pipe) {
            this.pipe = await pipeline('sentiment-analysis');
        }
    }

    static async transform(text: string) {
        if(!this.pipe) {
            await this.init();
        }

        return await this.pipe(text);
    }
}



self.addEventListener('message', async (event) => {

    if(event.data){
        const text = event.data;
        PipelineHolder.transform(text).then((result) => {
            self.postMessage(result);
        })
    }
});

