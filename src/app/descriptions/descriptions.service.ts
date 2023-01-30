import DescriptionsMongo from "./descriptions.dto";
import { IDescriptions } from "./descriptions.interface";

export default class DescriptionsService {
    private constructor() { }

    static create() {
        return "id-descriptions"
    }
}