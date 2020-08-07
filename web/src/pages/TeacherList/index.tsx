import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';


function TeacherList() {
    // variavel para fazer a visualização dos professores
    const [teachers, setTeachers] = useState([]);

    // variáveis para fazer a inserção destes valores no banco
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        //responde com os dados da api
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
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
                            { value: 'Teologia', label: 'Teologia' }
                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Horário"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {/* com o valor vindo da api na variavel 'teachers' vai criar um novo item (cartão) a ser exibido visualmente */}
                {/* Todo primeiro componente que vem do map precisa uma identificação única daquele componente, usado pela 'key' */}
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}
            </main>
        </div>
    )
}

export default TeacherList;