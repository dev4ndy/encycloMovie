import { IVideo } from "../interfaces/ivideo.interface";

export class Video {
    public id: string;
    public iso_639_1: string;
    public iso_3166_1: string;
    public key: string;
    public name: string;
    public site: string;
    public size: number;
    public type: string;

    constructor(iVideo: IVideo) {
        Object.keys(iVideo).forEach((key) => {
            if (iVideo[key]) { //This is valid if it is empty, undefined or null
                this[key] = iVideo[key];
            }
        });
    }
}
