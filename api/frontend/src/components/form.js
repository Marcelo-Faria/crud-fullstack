import axios from "axios";
import React, { useEffect ,useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify"

const FormContainer = styled.form`
    display: flex;
    aling-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    backgroud-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    heigth: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    curson: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.cnpj.value = onEdit.cnpj;
            user.razao_social.value = onEdit.razao_social;
            user.nome_fantasia.value = onEdit.nome_fantasia;
            user.pais.value = onEdit.pais;
            user.uf.value = onEdit.uf;
            user.cidade.value = onEdit.cidade;
            user.bairro.value = onEdit.bairro;
            user.site_empresa.value = onEdit.site_empresa;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.cnpj.value ||
            !user.razao_social.value ||
            !user.nome_fantasia.value ||
            !user.pais.value ||
            !user.uf.value ||
            !user.cidade.value ||
            !user.bairro.value ||
            !user.site_empresa.value ||
        ) {
            return toast.warn("Preencher todos os campos!");
        }

        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                cnpj: user.cnpj.value,
                razao_social: user.razao_social.value,
                nome_fantasia: user.nome_fantasia.value,
                pais: user.pais.value,
                uf: user.uf.value,
                cidade: user.cidade.value,
                bairro: user.bairro.value,
                site: user.site.value,
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/",{
                    cnpj: user.cnpj.value,
                    razao_social: user.razao_social.value,
                    nome_fantasia: user.nome_fantasia.value,
                    pais: user.pais.value,
                    uf: user.uf.value,
                    cidade: user.cidade.value,
                    bairro: user.bairro.value,
                    site: user.site.value,
                })
                
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }

        user.cnpj.value ="";
        user.razao_social.value ="";
        user.nome_fantasia.value ="";
        user.pais.value ="";
        user.uf.value ="";
        user.cidade.value ="";
        user.bairro.value ="";
        user.site.value ="";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>CNPJ</Label>
                <Input name='CNPJ' />
            </InputArea>
            <InputArea>
                <Label>Razão Social</Label>
                <Input name="Razão Social" type="text" />
            </InputArea>
            <InputArea>
                <Label>Nome Fantasia</Label>
                <Input name="Nome Fantasia" type="text" />
            </InputArea>
            <InputArea>
                <Label>País</Label>
                <Input name="País" type="text" />
            </InputArea>
            <InputArea>
                <Label>UF</Label>
                <Input name="UF" type="text" />
            </InputArea>
            <InputArea>
                <Label>Cidade</Label>
                <Input name="Cidade" type="text" />
            </InputArea>
            <InputArea>
                <Label>Bairro</Label>
                <Input name="Bairro" type="text" />
            </InputArea>
            <InputArea>
                <Label>Site da empresa</Label>
                <Input name="Site da empresa" type="text" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>       
    );
};

export default Form;