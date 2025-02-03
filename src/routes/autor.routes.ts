import { Router } from 'express';
import AuthorController from '../controllers/Author.controller';

const autorRoutes = Router();



const { createAuthor, getAuthors , searchAuthors, updateAuthor, deleteAuthor, monthAuthors} = new AuthorController()


autorRoutes.post('/registrar', createAuthor )

autorRoutes.get('/todos', getAuthors )

autorRoutes.get('/pesquisar/:id', searchAuthors )

autorRoutes.put('/atualizar/:id', updateAuthor )

autorRoutes.delete('/deletar/:id', deleteAuthor)

autorRoutes.get('/mes', monthAuthors )



export default autorRoutes;