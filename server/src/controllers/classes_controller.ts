import { Request, Response } from 'express';
import db from '../database/connection';
import convertHour2Minutes from '../utils/convertHour2Minutes';

// cria uma interface para definir o tipo de scheduleItem
interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class classes_controller {

    // listagem das aulas
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHour2Minutes(time);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    // foi necessário importar os tipos Request e Response do express
    // e passar esses tipos para a classe
    async create(request: Request, response: Response) {
        // dados que serão pegos do corpo da requisição
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        // define um esquema de transaction, para garantir que caso alguma
        // operação vá falhar, ele cancela todas

        const trx = await db.transaction();

        // try catch para tratar erros
        try {
            // espera e recebe em qual tabela será feita a inserção do dado
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            // apos ter armazenado o ID de um usuário inserido, utiliza essa constante para
            // server como ligamento da chave estrangeira na tabela "classes"
            const user_id = insertedUsersId[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[0];

            // map vai percorrer o objeto e depois transforma em um novo objeto
            const class_schedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHour2Minutes(scheduleItem.from),
                    to: convertHour2Minutes(scheduleItem.to),
                };
            });

            // insere a grade das aulas no banco
            await trx('class_schedule').insert(class_schedule);

            // se todas as operações estarem corretas, ele insere no banco
            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            // caso tenha algum erro, desfaz as operações
            await trx.rollback();

            // retorna um erro
            return response.status(400).json({
                error: 'Unexpected error while creating a new class'
            })
        }
    }
}