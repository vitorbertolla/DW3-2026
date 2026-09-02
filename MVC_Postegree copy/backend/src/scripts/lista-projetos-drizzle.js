import db from "../database/drizzle.js";
import {projetos} from "../database/schema.js";

async function listarProjetos() {
    const projetosList = await db.select().from(projetos).orderBy(projetos.id)
    console.table(projetosList)
}
listarProjetos()