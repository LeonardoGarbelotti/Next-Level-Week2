import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';


function TeacherForm() {
    // variavel do useHistory para limpar o formulário (redirecionar para mesma página)
    const history = useHistory();


    // variáveis para fazer a inserção destes valores no banco
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);


    // função que adiciona um novo horário ao clicar no botão
    function addNewScheduleItem() {
        setScheduleItems([
            //spread operator que copia o array ali de cima
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    /* 
        pposition = armazena o valor do array "scheduleItems"
        field = armazena qual o campo (week_day, from, to)
        value = armazena o valor digitado 
    */

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            // se o item que o map estiver percorrendo for igual ao item que deseja alterar
            if (index === position) {
                // ...scheduleItem = copia todo o objeto (copiando week_day, from e to)
                // depois altera o novo campo para o valor digitado
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItem);
    }

    function handleCreateClass(e: FormEvent) {

        e.preventDefault(); // previne que o usuário envie um formulário em branco

        // através da api passa os dados ao backend
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/'); //redireciona o usuário para mesma página
        }).catch(() => {
            alert('Erro no Cadastro!');
        })

    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Se cadastre para dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            name="avatar"
                            label="Foto do Usuário"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            placeholder="ex: 55DD123456789"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend> Horário das Aulas</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Filosofia', label: 'Filosofia' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Informática', label: 'Informática' },
                                { value: 'Literatura', label: 'Literatura' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Redação', label: 'Redação' },
                                { value: 'Sociologia', label: 'Sociologia' },
                                { value: 'Teologia', label: 'Teologia' },
                            ]}
                        />

                        <Input
                            name="cost"
                            label="Valor da hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}> + Novo Horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                    Importante! <br />
                    Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;