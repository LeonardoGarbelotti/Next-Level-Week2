import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/33553479?s=460&u=fe61bb9dc09e33e35adf81e6b9ea9d772be03036&v=4" alt="Leonardo Garbelotti Gonçalves" />
                <div>
                    <strong> Leonardo Garbelotti Gonçalves</strong>
                    <span>Macaqueísmo</span>
                </div>
            </header>

            <p> Aprenda sobre a história e evolução do ser-humano e descubra todos os motivos, benefícios e desvantagens
            de se retornar a macaco.
                    </p>

            <footer>
                <p>
                    Preço/Hora
                            <strong>R$ 30,00</strong>
                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                            Entrar em Contato!
                        </button>
            </footer>
        </article>
    );
}

export default TeacherItem;