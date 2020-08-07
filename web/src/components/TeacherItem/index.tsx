import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';


// cria uma interface com uma variavel do tipo 'teacher'
// essa variavel 'teacher' contém as informações vindas da api
// e posteriormente podemos usar essas informações nos dados do cartão abaixo
export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={`Foto de ${teacher.name}`} />
                <div>
                    <strong> {teacher.name} </strong>
                    <span> {teacher.subject} </span>
                </div>
            </header>

            <p> {teacher.bio} </p>

            <footer>
                <p>
                    Preço/Hora
                            <strong>R$ {teacher.cost} </strong>
                </p>

                <a onClick={createNewConnection} target="_blank" href={`https://wa.me/${teacher.whatsapp}?text=Olá!%20Estou%20interessado(a)%20em%20suas%20aulas!`}>
                    <img src={whatsappIcon} alt="whatsapp" />
                            Entrar em Contato!
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;