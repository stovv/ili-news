import React from 'react'
import { Box } from 'rebass';
import * as Typography from '../Typography';


class DropImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drag: false
        }
        this.dragCounter = 0;
        this.dropRef = React.createRef()
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragIn = this.handleDragIn.bind(this)
        this.handleDragOut = this.handleDragOut.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true})
        }
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({drag: false})
        }
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            let files = e.dataTransfer.files
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                if (files[i].name && files[i].type.match(/image.*/)){
                    formData.append('files', files[i]);
                }
            }
            if (formData.get('files')){
                //console.log("formData", formData);
            }

            e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }


    render() {
        return (
            <div
                style={{display: 'inline-block', position: 'relative'}}
                ref={this.dropRef}
            >
                {this.state.dragging &&
                <div
                    style={{
                        border: 'dashed #4a4a4a 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: '#4a4a4a',
                            fontSize: 36
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
                }
                {/*this.props.children*/}
                <Typography.CardText type="normal">Перемести сюда кавер</Typography.CardText>
            </div>
        )
    }
}
export default DropImage;