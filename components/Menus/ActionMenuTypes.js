import Router from 'next/router';
import { Auth, Common } from "../../actions";


const Types = (dispatch) => ({
    user: [
        {text: 'Редактировать профиль', onClick: ()=>{
                Router.push('/settings');
            }
        },
        {text: 'Создать приглашение'},
        {text: 'Выйти', onClick: ()=>{
                dispatch(Auth.logout());
                dispatch(Common.notify('Ждем вас снова 😊', "var(--backgroundPrimary)", "var(--primary)"));
                Router.push('/');
            }
        }
    ],
    "user-header":[
        {text: 'Мой профиль', onClick: ()=>{
                Router.push('/users/me');
            }
        },
        {text: 'Магазин'},
        {text: 'Публикации'},
        {text: 'Коллекция'},
        {text: 'Выйти', onClick: ()=>{
                dispatch(Auth.logout());
                dispatch(Common.notify('Ждем вас снова 😊', "var(--backgroundPrimary)", "var(--primary)"));
                Router.push('/');
            }
        }
    ]
});

export default Types