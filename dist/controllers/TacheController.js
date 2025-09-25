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
                if (task.photoUrl) {
                    return {
                        ...task,
                        photoUrl: `${req.protocol}://${req.get('host')}${task.photoUrl}`
                    };
                }
                return task;
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
            const tacheData = {
                titre: req.body.titre,
                description: req.body.description,
                photoUrl: photoUrl,
                audioUrl: audioUrl,
                statut: req.body.statut || 'EN_COURS'
            };
            const tache = validate_1.sechemTache.parse(tacheData);
            const a = await service.createTache({
                ...tacheData,
                usersid: user?.id
            });
            res.json(a);
        }
        catch (error) {
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
            statut: req.body.statut // permet de modifier l'état
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