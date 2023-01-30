import CategoriesService from "./app/categories/categories.service";

export default class SnapShot {
    private static instance: SnapShot;
    private constructor() {
        CategoriesService.createSnapShot();
        return {
            logo: {
                dark: "clouldinary-url",
                light: "clouldinary-url",
                main: "clouldinary-url",
            },
            reserve_images: {
                avatar: {
                    male: "",
                    female: "",
                    different: '',
                },
                images_items: "",
            },
        }
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
}
export { init };