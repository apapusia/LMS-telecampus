import React, {Component} from 'react';
import ReactModal from 'react-modal';
import NewCourse from './new-course-form';

ReactModal.setAppElement('.app-wrapper')

export default class AddCourseModal extends Component {
    constructor(props){
      super(props);

      this.customStyles={
        content:{
            top:'50%',
            left:'50%',
            right:'auto',
            marginRight:'-50%',
            transform:'translate(-50%, -50%',
            width:'800px',            
        },

        overlay:{
            backgroundColor:'rgba(11, 15, 11, 1)',            
        }
      };

    };

    render() {
      return(
      <ReactModal 
        style={this.customStyles}
        
        onRequestClose={()=>{
        this.props.handleModalClose();
      }} isOpen={this.props.modalIsOpen}>
        <NewCourse/>
        <button onClick= {this.props.handleModalClose}>close</button>
      </ReactModal>          
      );
    }
  }
