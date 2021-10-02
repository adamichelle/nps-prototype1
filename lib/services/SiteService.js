const SiteRepo = require('../repositories/SiteRepo');

class SiteService {
    static async addSite(siteInfo) {
        const siteRepoRes = await SiteRepo.createSite(siteInfo);
        return { success: true, data: siteRepoRes.data, message: 'Site added successfully' }
    }

    static async viewSites() {
        try {
            const siteRepoRes = await SiteRepo.getSites();
            return { success: true, data: siteRepoRes.data, message: 'Sites retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewSite(id) {
        try {
            const siteRepoRes = await SiteRepo.getSite(id);
            if(!siteRepoRes.success)
            return { success: false, data: siteRepoRes.data, message: siteRepoRes.message, isCatchError: false }

            return { success: true, data: siteRepoRes.data, message: 'Site retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = SiteService