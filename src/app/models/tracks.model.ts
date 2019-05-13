export class Tracks{
    id?: number;
    trackName: string;
    artistName: string;
    albumName: string;
    externalURL: string;
    playlistId: number;

    constructor(id:number, trackName:string, artistName:string, albumName:string, externalURL:string, playlistId:number) {}
}