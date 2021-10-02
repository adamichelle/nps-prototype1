const SiteService = require("../services/SiteService");


class SiteController {
    static async add(req, res) {
        try {
            const siteServiceRes = await SiteService.addSite(req.body);
            return res.status(201).json({ status: 'success', message: 'Site created successfully', data: siteServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const siteServiceRes = await SiteService.viewSites();
            return res.status(200).json({ status: 'success', message: siteServiceRes.message, data: siteServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const siteServiceRes = await SiteService.viewSite(req.params.id);

            if(!siteServiceRes.success)
            return res.status(404).json({ status: 'error', message: siteServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: siteServiceRes.message, data: siteServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = SiteController;