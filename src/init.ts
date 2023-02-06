import AppService from "./app/app/app.service";
import CategoriesService from "./app/categories/categories.service";

export default class SnapShot {
    private static instance: SnapShot;
    private constructor() {
        CategoriesService.createSnapShot();
        AppService.createSnapShot();
    }
    public static getInstance(): SnapShot {
        if (!SnapShot.instance) {
            SnapShot.instance = new SnapShot();
        }
        return SnapShot.instance;
    }

}

const init = {
    project: "api-candy",
    projectDir: "apiCandy",

}
export { init };