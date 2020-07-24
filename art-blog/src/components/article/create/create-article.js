import React, { Component } from 'react';
import styles from './create.module.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: false,
            titleErrorMessage: 'Title should be at least 3 symbols!',
            imageUrl: '',
            imageUrlError: false,
            imageUrlErrorMessage: 'Invalid Url',
            description: '',
            descriptionError: false,
            descriptionErrorMessage: 'Description should be between 20 and 100 symbols!',
            authorName: '',
            authorNameError: false,
            authorNameErrorMessage: 'Invalid name. The name should be at least 3 characters long!',
            btnDisabled: false,
            //authorId: ''//todo
        }
    }

    titleBlurHandler = (event) => {
        const title = event.target.value;
        if (title.length < 3) {
            this.setState({ titleError: true });
            return;
        } else if (this.state.titleError === true) {
            this.setState({ titleError: false })
        }

    }
    titleChangeHandler = (event) => {
        this.setState({ title: event.target.value });
    }
    imageUrlBlurHandler = (event) => {
        const imageUrl = event.target.value;
        console.log('imageUrl', imageUrl);
        if (!imageUrl.startsWith('http:') && !imageUrl.startsWith('https:')) {
            this.setState({ imageUrlError: true });
            return;
        } else if (this.state.imageUrlError === true) {
            this.setState({ imageUrlError: false });
        }
    }
    imageUrlChangeHandler = (event) => {
        this.setState({ imageUrl: event.target.value });
    }
    descriptionBlurHandler = (event) => {
        const description = event.target.value;
        if (description.length < 20 || description.length > 100) {
            this.setState({ descriptionError: true });
            return;
        } else if (this.state.descriptionError === true) {
            this.setState({ descriptionError: false });
        }
    }
    descriptionChangeHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    authorNameBlurHandler = (event) => {
        const authorName = event.target.value;
        if (authorName.length < 3) {
            this.setState({ authorNameError: true });
            return;
        } else if (this.state.authorNameError === true) {
            this.setState({ authorNameError: false });
        }
    }
    authorNameChangeHandler = (event) => {
        this.setState({ authorName: event.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        
        const { title, imageUrl, description,authorName,
            titleError,imageUrlError , descriptionError,authorNameError } = this.state;
        if (titleError || imageUrlError || descriptionError||authorNameError) {
            this.setState({ btnDisabled: true });
            return;
        } else if (this.state.btnDisabled) {
            this.setState({ btnDisabled: false })
        }
        //fetch data
        console.log(this.state);
        console.log('Everything is correct');
        this.props.history.push('/home');
    }
    render() {
        const { title, titleError, titleErrorMessage,
            imageUrl, imageUrlError, imageUrlErrorMessage,
            description, descriptionError, descriptionErrorMessage,
            authorName, authorNameError, authorNameErrorMessage
        } = this.state;
        return (

            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="6" className={styles.form}>
                        <form className={styles.form} onSubmit={this.submitHandler}>
                            <p className="h4 text-center mb-4 black-text color-green">CREATE ARTICLE</p>
                            <label htmlFor="title" className={styles.label}>
                                Title
                            </label>
                            <input type="text" required minLength={3} id="title" value={title}
                                onChange={this.titleChangeHandler} className="form-control" onBlur={this.titleBlurHandler} />
                            {titleError ? (<div className={styles.error}>{titleErrorMessage}</div>) : null}
                            <br />
                            <label htmlFor="imageUrl" className={styles.label}>
                                Image URL
                             </label>
                            <input type="text" id="ImageUrl" value={imageUrl}
                                onChange={this.imageUrlChangeHandler} className="form-control" onBlur={this.imageUrlBlurHandler} />
                            {imageUrlError ? (<div className={styles.error}> {imageUrlErrorMessage}</div>) : null}
                            <label htmlFor="description" className={styles.label}>
                                Description
                             </label>
                            <textarea type="text" id="description" value={description}
                                onChange={this.descriptionChangeHandler} className="form-control" rows="5" onBlur={this.descriptionBlurHandler} />
                            {descriptionError ? (<div className={styles.error}>{descriptionErrorMessage}</div>) : null}
                            <label htmlFor="authorName" className={styles.label}>
                                Author Name
                             </label>
                            <input type="text" id="authorName" className="form-control" value={authorName}
                                onChange={this.authorNameChangeHandler} onBlur={this.authorNameBlurHandler} />
                            {authorNameError ? (<div className={styles.error}>{authorNameErrorMessage}</div>) : null}
                            <div className="text-center mt-4">
                                <MDBBtn className={styles.btn} type="submit">Create Article</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )

    }
}
export default Create;




