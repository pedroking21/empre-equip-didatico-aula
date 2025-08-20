import express from "express";
import UsuarioController from "./controller/UsuarioController.js";
import { SERVER_ROUTES } from "./appConfig.js";
import EquipamentoController from "./controller/EquipamentoController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

router.get(SERVER_ROUTES.LISTAR_USUARIOS, UsuarioController.todos);
router.get(SERVER_ROUTES.LISTAR_EQUIPAMENTOS, EquipamentoController.todos);
router.get(SERVER_ROUTES.LISTAR_EMPRESTIMOS, EmprestimoController.todos);
router.get(SERVER_ROUTES.UNICO_USUARIO, UsuarioController.unico);
router.get(SERVER_ROUTES.LISTAR_EMPRESTIMO_DETALHADOS, EmprestimoController.listarDetalhados);

router.post(SERVER_ROUTES.NOVO_USUARIO, UsuarioController.cadastrar);
router.post(SERVER_ROUTES.NOVO_EQUIPAMENTO, EquipamentoController.cadastrar);
router.post(SERVER_ROUTES.NOVO_EMPRESTIMO, EmprestimoController.cadastrar);

router.delete(SERVER_ROUTES.REMOVER_USUARIO, UsuarioController.remover);
router.delete(SERVER_ROUTES.REMOVER_EQUIPAMENTO, EquipamentoController.remover);
//router.delete(SERVER_ROUTES.REMOVER_EMPRESTIMO, EmprestimoController.remover);

router.put(SERVER_ROUTES.ATUALIZAR_USUARIO, UsuarioController.atualizar);
router.put(SERVER_ROUTES.ATUALIZAR_EQUIPAMENTO, EquipamentoController.atualizar);
router.put(SERVER_ROUTES.ATUALIZAR_EMPRESTIMO, EmprestimoController.atualizar);



export { router }