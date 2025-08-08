import { DatabaseModel } from "./DataBaseModel.js";

const dataBase = new DatabaseModel().pool;

export class Usuario {
    private idUsuario: number = 0;
    private nome: string;
    private tipoUsuario: string;
    contato: string;

    public constructor(_nome: string, _tipoUsuario: string, _contato: string){
        this.nome = _nome;
        this.tipoUsuario = _tipoUsuario;
        this.contato = _contato;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(_idUsuario: number): void {
        this.idUsuario = _idUsuario;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(_nome: string): void {
        this.nome = _nome;
    }

    public getTipoUsuario(): string {
        return this.tipoUsuario;
    }

    public setTipoUsuario(_tipoUsuario: string): void {
        this.tipoUsuario = _tipoUsuario;
    }

    public getContato(): string {
        return this.contato;
    }

    public setContato(_contato: string): void {
        this.contato = _contato;
    }


static async listarUsuarios(): Promise<Array<Usuario> | null> {
       
        let listaDeUsuarios: Array<Usuario> = [];

        try {
            const querySelectUsuario = `SELECT * FROM Usuario;`;

            // executa a query no banco de dados
            const respostaBD = await dataBase.query(querySelectUsuario);    
            // verifica se a resposta do banco de dados é válida
            respostaBD.rows.forEach((usuario: any) => {
                
                // criando objeto usuario
                let novoUsuario = new Usuario(
                    usuario.nome,
                    usuario.tipo_usuario,
                    usuario.contato
                );
                // adicionando o ID ao objeto
                novoUsuario.setIdUsuario(usuario.id_usuario);
                
                // adicionando o usuario a lista
                listaDeUsuarios.push(novoUsuario);
            });

            // retornado a lista de usuarios para quem chamou a função
            return listaDeUsuarios;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

     static async cadastrarUsuario(usuario: Usuario): Promise<Boolean> {      
        try {
            // Cria a consulta (query) para inserir o registro de um usuario no banco de dados, retorna o ID do usuario criado 
            const queryInsertUsuario = `
                INSERT INTO Usuario (nome, tipo_usuario, contato)
                VALUES (
                    '${usuario.getNome()}',
                    '${usuario.getTipoUsuario()}',
                    '${usuario.getContato()}'
                )
                RETURNING id_usuario;`;

            // Executa a query no banco de dados e armazena o resultado
            const result = await dataBase.query(queryInsertUsuario);

            // verifica se a quantidade de linhas que foram alteradas é maior que 0
            if (result.rows.length > 0) {
                // Exibe a mensagem de sucesso
                console.log(`Usuario cadastrado com sucesso. ID: ${result.rows[0].id_usuario}`);
                // retorna verdadeiro
                return true;
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return false;
        // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar usuario: ${error}`);
            // retorna falso
            return false;
        }
    }


    static async removerUsuario(idUsuario: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;
    
        try {        

            // Construção da query SQL para deletar o Aluno.
            const queryDeleteUsuario = `DELETE FROM Usuario WHERE id_usuario=${idUsuario};`;
    
            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await dataBase.query(queryDeleteUsuario)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });
    
            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


    static async atualizarUsuario(usuario: Usuario): Promise<Boolean> {
        // Variável para armazenar o resultado da operação.
        let queryResult = false; 
        try {
            // Construção da query SQL para atualizar os dados do usuario.
            const queryAtualizaUsuario = `UPDATE Usuario SET 
                                            nome = '${usuario.getNome()}', 
                                            tipo_usuario = '${usuario.getTipoUsuario()}',
                                            contato = '${usuario.getContato()}'                                                                                    
                                        WHERE id_usuario = ${usuario.idUsuario}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await dataBase.query(queryAtualizaUsuario)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}

export default Usuario;