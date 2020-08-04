import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './create.module.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PageLayout from '../../../components/core/page-layout/page-layout.js';
import AuthContext from '../../../Context';
import articleService from '../../../services/article-serivce.js'
const CreateArticlePage = () => {
    const context = useContext(AuthContext);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('Title should be at least 3 symbols!');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState(false);
    const [imageUrlErrorMessage, setImageUrlErrorMessage] = useState('Invalid Url');
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('Description should be between 20 and 100 symbols!');
    const [authorName, setAuthorName] = useState('');
    const [authorNameError, setAuthorNameError] = useState(false);
    const [authorNameErrorMessage, setAuthorNameErrorMessage] = useState('Invalid name. The name should be at least 3 characters long!');

    const titleBlurHandler = (event) => {
        if (title.length < 3) {
            setTitleError(true);
            return;
        } else if (titleError) {
            setTitleError(false);
        }
    }

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const imageUrlBlurHandler = (event) => {
        if (!imageUrl.startsWith('http:') && !imageUrl.startsWith('https:')) {
            setImageUrlError(true);
            return;
        } else if (imageUrlError) {
            setImageUrlError(false);
        }
    }

    const imageUrlChangeHandler = (event) => {
        setImageUrl(event.target.value);
    }

    const descriptionBlurHandler = (event) => {
        if (description.length < 20 || description.length > 100) {
            setDescriptionError(true);
            return;
        } else if (descriptionError) {
            setDescriptionError(false);
        }
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const authorNameBlurHandler = (event) => {
        if (authorName.length < 3) {
            setAuthorNameError(true);
            return;
        } else if (authorNameError) {
            setAuthorNameError(false);
        }
    }

    const authorNameChangeHandler = (event) => {
        setAuthorName(event.target.value);
    }




    const submitHandler =async (event) => {
        event.preventDefault();
        console.log('User id:',context.user.id);
        const data = {
            title,
            imageUrl,
            description,
            authorName,
            author: context.user.id
        }
        console.log('Data: ',data)
        const article =await articleService.create(data).then((article) => {
            console.log(article);
            history.push('/home/');
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <PageLayout title="Article Create">
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="6" className={styles.form}>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <p className="h4 text-center mb-4 black-text color-green">Create Article</p>
                            <label htmlFor="title" className={styles.label}>
                                Title
                            </label>
                            <input type="text" required minLength={3} id="title" value={title}
                                onChange={titleChangeHandler} className="form-control" onBlur={titleBlurHandler} />
                            {titleError ? (<div className={styles.error}>{titleErrorMessage}</div>) : null}
                            <br />
                            <label htmlFor="imageUrl" className={styles.label}>
                                Image URL
                             </label>
                            <input type="text" id="ImageUrl" value={imageUrl}
                                onChange={imageUrlChangeHandler} className="form-control" onBlur={imageUrlBlurHandler} />
                            {imageUrlError ? (<div className={styles.error}> {imageUrlErrorMessage}</div>) : null}
                            <label htmlFor="description" className={styles.label}>
                                Description
                             </label>
                            <textarea type="text" id="description" value={description}
                                onChange={descriptionChangeHandler} className="form-control" rows="5" onBlur={descriptionBlurHandler} />
                            {descriptionError ? (<div className={styles.error}>{descriptionErrorMessage}</div>) : null}
                            <label htmlFor="authorName" className={styles.label}>
                                Author Name
                             </label>
                            <input type="text" id="authorName" className="form-control" value={authorName}
                                onChange={authorNameChangeHandler} onBlur={authorNameBlurHandler} />
                            {authorNameError ? (<div className={styles.error}>{authorNameErrorMessage}</div>) : null}
                            <div className="text-center mt-4">
                                <MDBBtn className={styles.btn} type="submit">Create Article</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </PageLayout>
    )
}
export default CreateArticlePage;




