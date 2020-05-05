import React, {Fragment, useState} from "react";
import {getAlbumsFromVk} from "./_api-vk";
import {createCountersToDB, readCountersFromDB} from './_api-counters';
import {getMembersFromDB, updateMembersInDB} from "../seller/_api-seller";
import {checkAlbumsNames, createAlbumsToDB} from "../album/_api-album";

import './GetAlbums.style.css';

let source, tempCount;

const GetAlbums = (source, tempCount) => {
    const [members, setMembers] = useState(null);
    const [checkStatus, setCheckStatus] = useState('');
    const [checkCount, setCheckCount] = useState(0);
    const [counters, setCounters] = useState({
        all_members: 0,
        banned: 0,
        deleted: 0,
        closed: 0,
        seller: 0,
    });



    // Проверить на закрытие альбомов
    const checkAccessToAlbums = async () => {

        try {

            await Promise.resolve([])
                .then(() => {
                    setCheckStatus('Получение счётчиков из базы');
                    return null
                }).then(readCounters)
                .then((response) => {
                    console.log('response ', response);
                    setCheckStatus('Получение пользователей из базы');
                    return []
                }).then(getMembersFromDB)
                .then((result) => {
                    source = result.sellers; // массив продавцов
                });

            console.log('source ', source, 'counters ', tempCount);

            async function action(i) {
                setCheckCount(i);
                console.log('продолжение');
                let obj = {
                    user_id: source[i].user_id,
                    info: 'check_one'
                };

                await Promise.resolve(obj)
                    .then(() => {
                        setCheckStatus('Получение альбомов из ВК');
                        return obj
                    }).then(getAlbumsFromVk)
                    .then((data) => {
                        setCheckStatus('Проверка полученных альбомов на ключи');
                        return data // массив альбомов
                    }).then(checkAlbumsNames)
                    .then((data) => {
                        setCheckStatus('Добавление альбомов в базу');
                        return data // массив отобранных альбомов
                    }).then(createAlbumsToDB)
                    .then((data) => {
                        let membersArray = [];
                        membersArray.push(obj);
                        setCheckStatus('Изменение информации о пользователе');
                        return membersArray // массив где id и тело пользователя
                    }).then(updateMembersInDB)
                    .catch((err) => console.error(`Member with id ${source[i].user_id} does not checked`, err));
            }

            for (let i = 1; i <= counters.all_members; i++) {
                setTimeout(action, i * 1000, i);
            }
        } catch (e) {
            console.error(e)

        }
    };
    
    const createCounters = () => {
        createCountersToDB()
            .then((response) => {
                return response.json()
            }).then((data) => {
            const {all_members, banned, deleted, closed, seller} = data;
            tempCount = {all_members, banned, deleted, closed, seller};
            setCounters(tempCount);
        }).catch((err) => console.error(err))
    };

    const readCounters = async () => {
        await readCountersFromDB()
            .then((response) => {
                console.log('r ', response)
                return response
            }).then((data) => {
            const {all_members, banned, deleted, closed, seller} = data;
            setCounters({all_members, banned, deleted, closed, seller});
        }).catch((err) => console.error(err))
        console.log('readCounters ', counters)
    };


    return (
        <Fragment>
            <div className='album-loader__counters-buttons'>
                <button className='album-loader__btn-create'
                        onClick={createCounters}
                >
                    Создать счётчики
                </button>
                <button className='album-loader__btn-refresh'
                        onClick={readCounters}
                >
                    Обновить счётчики
                </button>
            </div>
            <div className='album-loader'>
                <div className='album-loader__counters'>
                    <ul className='album-loader__counters-info'>
                        <li>Всего пользователей - {counters.all_members}</li>
                        <li>Продавцы - {counters.seller}</li>
                        <li>Скрытые - {counters.closed}</li>
                        <li>Забаненные - {counters.banned}</li>
                        <li>Удалённые - {counters.deleted}</li>

                        <p>Проверяем {checkCount} из {counters.all_members - counters.seller - counters.banned -
                        counters.deleted - counters.closed}</p>
                        <span>Статус: {checkStatus}</span>
                    </ul>

                </div>
                <div className='album-loader__buttons'>
                    <button className='album-loader__btn-load'
                            onClick={checkAccessToAlbums}
                    >
                        Загрузить альбомы
                    </button>
                </div>


            </div>
        </Fragment>
    )
};

export default GetAlbums;

