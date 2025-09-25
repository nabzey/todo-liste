"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheController = void 0;
const TacheService_1 = require("../services/TacheService");
const validate_1 = require("../validators/validate");
const service = new TacheService_1.TacheService;
class TacheController {
    async getAll(req, res) {
        try {
            const data = await service.findAll();
            const newData = data.map(task => {
                let result = { ...task };
                if (task.photoUrl) {
                    result.photoUrl = `${req.protocol}://${req.get('host')}${task.photoUrl}`;
                }
                if (task.audioUrl) {
                    result.audioUrl = `${req.protocol}://${req.get('host')}${task.audioUrl}`;
                }
                return result;
            });
            return res.status(200).json(newData);
        }
        catch (error) {
            return res.status(500).json({ message: "Erreur serveur", error });
        }
    }
    async create(req, res) {
        try {
            const user = req.user;
            if (!user)
                return res.status(401).json({ message: 'user non trouve' });
            let photoUrl = null;
            let audioUrl = null;
            if (req.files) {
                const files = req.files;
                if (files.photo && Array.isArray(files.photo) && files.photo.length > 0 && files.photo[0]) {
                    photoUrl = `/uploads/${files.photo[0].filename}`;
                }
                if (files.audio && Array.isArray(files.audio) && files.audio.length > 0 && files.audio[0]) {
                    audioUrl = `/uploads/audio/${files.audio[0].filename}`;
                }
            }
            const tacheData = {
                titre: req.body.titre,
                description: req.body.description,
                photoUrl,
                audioUrl,
                statut: req.body.statut || 'EN_COURS'
            };
            if (req.body.dateDebut)
                tacheData.dateDebut = new Date(req.body.dateDebut);
            if (req.body.dateFin)
                tacheData.dateFin = new Date(req.body.dateFin);
            const tache = validate_1.sechemTache.parse(tacheData);
            const a = await service.createTache({
                ...tacheData,
                usersid: user.id
            });
            res.json(a);
        }
        catch (error) {
            console.error('Erreur création tâche:', error);
            res.status(400).json({ error: error.message });
        }
    }
    async getOne(req, res) {
        const idparams = req.params.id;
        if (!idparams)
            return res.status(400).json({ message: 'id est requis' });
        const id = parseInt(idparams);
        if (Number.isNaN(id))
            return res.json({ message: 'id doit etre un nombre' });
        const a = await service.findId(id);
        res.status(200).json(a);
    }
    async updateOne(req, res) {
        const idparams = req.params.id;
        if (!idparams)
            return res.status(400).json({ message: 'id obligatoire' });
        const id = parseInt(idparams);
        if (Number.isNaN(id))
            return res.json({ message: 'nombre' });
        const data = validate_1.sechemTache.safeParse(req.body);
        if (!data.success)
            return res.status(404).json({ message: 'donnees requise' });
        // Récupérer la tâche existante
        const existing = await service.findId(id);
        let photoUrl;
        let audioUrl;
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                if (file.fieldname === 'photo')
                    photoUrl = `/uploads/${file.filename}`;
                if (file.fieldname === 'audio')
                    audioUrl = `/uploads/audio/${file.filename}`;
            }
        }
        else if (req.file) {
            if (req.file.fieldname === 'photo')
                photoUrl = `/uploads/${req.file.filename}`;
            if (req.file.fieldname === 'audio')
                audioUrl = `/uploads/audio/${req.file.filename}`;
        }
        // Conserver l'ancienne photo si aucune nouvelle n'est envoyée
        if (!photoUrl && existing && existing.photoUrl)
            photoUrl = existing.photoUrl;
        // Conserver l'ancien audio si aucune nouvelle n'est envoyée
        if (!audioUrl && existing && existing.audioUrl)
            audioUrl = existing.audioUrl;
        // Correction stricte des types pour Prisma
        if (photoUrl === undefined)
            photoUrl = null;
        if (audioUrl === undefined)
            audioUrl = null;
        const updateData = {
            ...data.data,
            photoUrl,
            audioUrl,
            statut: req.body.statut, // permet de modifier l'état
            dateDebut: req.body.dateDebut ? new Date(req.body.dateDebut) : existing?.dateDebut ?? null,
            dateFin: req.body.dateFin ? new Date(req.body.dateFin) : existing?.dateFin ?? null
        };
        const u = await service.updateId(id, updateData);
        res.status(200).json(u);
    }
    async Tachedelete(req, res) {
        const idparams = req.params.id;
        if (!idparams) {
            return res.status(400).json({ message: 'id est requis' });
        }
        const id = parseInt(idparams);
        try {
            await service.deleteTache(id);
            return res.status(200).json({ message: 'Tâche supprimée avec succès' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la suppression' });
        }
    }
}
exports.TacheController = TacheController;
//# sourceMappingURL=TacheController.js.map