import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q ="SELECT * FROM usuarios";

    db.query(q, (err,data) => {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
        "INSERT INTO usuarios ('cnpj','razão_social','nome_fantasia', 'país', 'UF', 'cidade', 'bairro', 'site_da_empresa') VALUES(?)";
    
    const values = [
        req.body.cnpj,
        req.body.razão_social,
        req.body.nome_fantasia,
        req.body.país,
        req.body.uf,
        req.body.cidade,
        req.body.bairro,
        req.body.site_da_empresa,
    ];
    
    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q =
    "UPDATE usuarios SET 'cnpj' = ? 'razão_social'= ? 'nome_fantasia' = ? 'país' = ? 'UF' = ? 'cidade' = ? 'bairro' = ? 'site_da_empresa' = ? WHERE 'id' = ?";
    
    const values = [
        req.body.cnpj,
        req.body.razão_social,
        req.body.nome_fantasia,
        req.body.país,
        req.body.uf,
        req.body.cidade,
        req.body.bairro,
        req.body.site_da_empresa,
    ];
    
    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE 'id' = ?";
    
    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.");
    });
};

