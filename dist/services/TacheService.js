"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheService = void 0;
const TacheRepository_1 = require("../repository/TacheRepository");
const repos = new TacheRepository_1.TacheRepository();
class TacheService {
    async findAll() {
        return await repos.findAll();
    }
    async createTache(tache) {
        return await repos.create(tache);
    }
    async findId(id) {
        return await repos.findById(id);
    }
    async updateId(id, data) {
        return await repos.update(id, data);
    }
    // async deleteTache(id:number , usersid: string){   
    // const tache = await repos.findById(id)
    //  if(!tache)throw Error('')
    // // const perm = await repos.tachedelete({id, usersid})
    // }
    async deleteTache(id) {
        await repos.delete(id);
    }
}
exports.TacheService = TacheService;
//# sourceMappingURL=TacheService.js.map