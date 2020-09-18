import Router from 'next/router';
import { Auth, Common } from "../../actions";


const Types = (theme, dispatch) => ({
    user: [
        {text: 'Редактировать профиль', onClick: ()=>{
                Router.push('/settings');
            }
        },
        {text: 'Создать приглашение'},
        {text: 'Выйти', onClick: ()=>{
                dispatch(Auth.logout());
                dispatch(Common.notify('Ждем вас снова 😊', theme.colors.backgroundPrimary, theme.text.primary));
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
                dispatch(Common.notify('Ждем вас снова 😊', theme.colors.backgroundPrimary, theme.text.primary));
                Router.push('/');
            }
        }
    ]
});

export default Types