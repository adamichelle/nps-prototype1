const Site = require('../models/Site')

class SiteRepo {
    /**
     * Creates a new site in the db in the site collection
     * @param {Object} siteData The data to be submitted to the db
    */
     static async createSite(siteData) {
        try {
            const newSite = await Site.create(siteData);
            return { success: true, data: [newSite], message: "Site saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getSite(id) {
        try {
            const site = await Site.findById(id);

            if(!site) return { success: false, data: null, message: "Site does not exist" }

            return { success: true, data: site, message: "Site found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getSites() {
        try {
            const sites = await Site.find({});
            return { success: true, data: sites, message: "Sites retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = SiteRepo;