import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/list.module.css';

const lists = {
    unordered: ({children}) => <ul className={styles.unordered}>{children}</ul>,
    ordered: ({children}) => <ol className={styles.ordered}>{children}</ol>,
}

class List extends React.Component{
    render(){
        const { items, style } = this.props.data;
        const ListComponent = typeof lists[style] !== "undefined" ? lists[style] : lists.unordered
        return (
            <ListComponent>
                {
                    items.map((item, index) =>
                        <React.Fragment key={index}>
                            <li className={styles.listItem}>{item}</li>
                        </React.Fragment>
                    )
                }
            </ListComponent>
        );
    }

}

List.propTypes = {
    data : PropTypes.object.isRequired
}

export default List;