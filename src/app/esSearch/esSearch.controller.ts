import esSearch from "@elastic/elasticsearch";
class EsSearchController {
    private static instance: EsSearchController;
    private static client: esSearch.Client;
    private constructor() {
        try {
            EsSearchController.client = new esSearch.Client({
                cloud: {
                    id: process.env.NODE_ENV_ELASTIC_SEARCH_CLOUD_ID as string,
                },
                auth: { apiKey: process.env.NODE_ENV_ELASTIC_SEARCH_KEY as string },
            })
            console.log("🍀 connected elasticsearch ✅");
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
    static getInstance(): EsSearchController {
        if (!EsSearchController.instance) { EsSearchController.instance = new EsSearchController(); }
        return EsSearchController.instance;
    }
    static async run() {

    }
}
export default EsSearchController;

// user { fullName, avatar, hasdId }
// product {  tags, image,  }
