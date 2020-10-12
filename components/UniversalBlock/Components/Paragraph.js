import React from "react";
import ReactDOMServer from 'react-dom/server';
import styles from './styles/paragraph.module.css'


class Paragraph extends React.Component{

    prepareDOM(html){
        if (typeof window !== "undefined"){
            let doc = new DOMParser().parseFromString(html, 'text/html');

            // replace links to custom
            let all_a = doc.getElementsByTagName("a");

            for ( let a of all_a ){
                let temp = document.createElement('div');
                temp.innerHTML = ReactDOMServer.renderToString(
                    <a className={styles.animatedLink} href={a.attributes.href.value}
                       dangerouslySetInnerHTML={{__html: a.innerHTML}}/>
                );
                a.replaceWith(temp.firstChild.firstChild);
            }

            return doc.body.innerHTML;
        }

        return html;
    }

    render(){
        const {data} = this.props;

        if (data == null){
            return null
        }

        return (
            <p className={styles.postParagraph} dangerouslySetInnerHTML={{__html: this.prepareDOM(data.text)}}/>
        )
    }

}

export default Paragraph;