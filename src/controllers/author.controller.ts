import { Request, Response } from "express"
import { AppDataSource } from "../database/data-source"
import Autor from "../entities/Autor"

export default class AuthorController {
    
    private authorRepository
    
    constructor() {
        
        this.authorRepository = AppDataSource.getRepository( Autor )

    }

    private isValidParams( { name, biography, nationality, birthdate, created_at }: Autor ){ 

        const sendStatus = (message : string, valid:boolean = false) => ({ valid, message })  

        if( !name || name.length < 3 ){
            return sendStatus ("O nome deve ter mais de 3 caracteres.")
        }

        if( !biography || biography.length < 3 ){
            return sendStatus("A biografia deve ter mais de 3 caracteres.")
        }

        if( !nationality ){
            return sendStatus("Informe a nacionalidade do autor.")
        }

        if( !birthdate ){
            return sendStatus("Informe a data de nascimento do autor.")
        }

        if( !created_at ){
            return sendStatus("Informe a data de inscrição do autor.")
        }

    
        return sendStatus( "", true )
    }

    public createAuthor = async ( req:Request, res:Response ) => {
       
        try {

            const authorBody = req.body

            if( authorBody.id ){
               
                res.status( 400 ).json( "não é permitido definir o id" )
    
                return
            }

            const { valid, message } = this.isValidParams( authorBody ) 

            if( !valid ){
                
                res.status( 400 ).json( message )

                return 
            }            
            
            const author = new Autor()

            if( authorBody.active === undefined ) authorBody.active = false
            
            Object.assign( author, authorBody)

            await this.authorRepository.save( author )

            res.status( 201 ).json( author )

        } catch ( ex ) {
            
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
    
        }

    }

    public getAuthors = async ( req:Request, res:Response ) => {
        try {

            const authorsList = await this.authorRepository.find()

            res.status( 201 ).json( authorsList )


        } catch ( ex ){
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
        }
    }

    public searchAuthors = async ( req:Request, res:Response ) => {
        try {

            const id = Number( req.params.id )

            const authorsList = await this.authorRepository.findOne({
                where: { id }
            })

            res.status( 201 ).json( authorsList )


        } catch ( ex ){
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
        }
    }

    public updateAuthor = async ( req:Request, res:Response ) => {
        try {

            const authorBody = req.body as Autor

            if( authorBody.id ){
               
                res.status( 400 ).json( "não é permitido definir o id" )
    
                return
            }

            const id = Number( req.params.id )

            const result = await this.authorRepository.findOne({
                where : { id }
            })
            
            if( !result ){

                res.status( 400 ).json('Autor não encontrado.')
                
                return
            }

            Object.assign( result, authorBody )

            await this.authorRepository.save( result )

            res.status( 201 ).json( result )


        } catch ( ex ){
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
        }
    }

    public deleteAuthor = async ( req:Request, res:Response ) => {
        try {

            const authorBody = req.body as Autor

            if( authorBody.id ){
               
                res.status( 400 ).json( "não é permitido definir o id." )
    
                return
            }

            const id = Number( req.params.id )

            const result = await this.authorRepository.delete( id )
            
            if( result.affected === 0 ){

                res.status( 400 ).json('Autor não encontrado.')
                
                return
            }

            res.status( 201 ).json( "Autor deletado." )

        } catch ( ex ){
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
        }
    }

    public monthAuthors = async ( req:Request, res:Response ) => {
        try {

            const date = new Date()

            const month = date.getMonth() + 1
            
            const year = date.getFullYear()

            const authorsList = await this.authorRepository.createQueryBuilder('autor')
            .where("EXTRACT(MONTH FROM autor.birthdate) = :month", { month })
            .andWhere("EXTRACT(YEAR FROM autor.birthdate) = :year", { year })
            .getMany();

            res.status( 201 ).json( authorsList )

        } catch ( ex ){
            console.error( ex )
    
            res.status( 500 ).json("Houve um erro interno.")
        }
    }

}