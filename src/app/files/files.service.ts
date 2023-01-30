import filesMongo from "./files.dto";
import { IFiles } from "./files.interface";

export default class FileService {
    private constructor() {
    }
    static create(args: IFiles) {
        return new filesMongo(args).save();
    }
}