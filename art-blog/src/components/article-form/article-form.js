import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './article-form.module.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AuthContext from '../../Context.js';
import articleService from '../../services/article-serivce.js'

const ArticleForm = ({ btnTitle, disabled, titleDb, imageUrlDb, descriptionDb, authorNameDb, articleId }) => {
    const context = useContext(AuthContext);
   // console.log('Context', context);
   // console.log(context.user.authorName);

    const history = useHistory();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage] = useState('Title should be at least 3 symbols!');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState(false);
    const [imageUrlErrorMessage] = useState('Invalid Url');
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage] = useState('Description should be between 20 and 1000 symbols!');
    const [authorName, setAuthorName] = useState(context.user.authorName);

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
        if (description.length < 20 || description.length > 1000) {
            setDescriptionError(true);
            return;
        } else if (descriptionError) {
            setDescriptionError(false);
        }
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const submitHandler = async (event) => {
        console.log('IamgeUrl',imageUrl);
        if(titleError||descriptionError||imageUrlError||title===''||description===''||imageUrl===''){
            console.log('I am in err-create-submit');
            history.push('/error',{
                message: 'Invalid input!'
            });
        
            return;
        }
        event.preventDefault();
       // console.log('User id:', context.user.id);

        const data = {
            title,
            imageUrl,
            description,
            authorName: context.user.authorName,
            author: context.user.id
        }
        console.log('Data: ', data)
        if (btnTitle === 'Create') {
            await articleService.create(data).then((article) => {
                history.push('/article/my-articles/');
            }).catch(err => {
                console.log(err.message);
                history.push('/error',{message: err.message||err});
            })
        } else if (btnTitle === 'Edit') {
            await articleService.edit(articleId, data).then((article) => {
                history.push('/article/my-articles');
            }).catch(err => {
                console.log(err);
            });
        } else {
            //Delete
            await articleService.delete(articleId).then(() => {
                history.push('/article/my-articles');
            }).catch(err => {
                console.log(err);
            })
        }
    }
    useEffect(() => {
        if (titleDb && imageUrlDb && descriptionDb && authorNameDb) {
            setTitle(titleDb);
            setImageUrl(imageUrlDb);
            setDescription(descriptionDb);
            setAuthorName(authorNameDb);
        }
    }, [titleDb, imageUrlDb, descriptionDb, authorNameDb])
    return (

        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="6" className={styles.form}>
                    <form className={styles.form} onSubmit={submitHandler}>
                        <label htmlFor="title" className={styles.label}>
                            Title
                            </label>
                        <input type="text" required minLength={3} id="title" value={title}
                            onChange={titleChangeHandler} className="form-control" onBlur={titleBlurHandler} disabled={disabled} />
                        {titleError ? (<div className={styles.error} >{titleErrorMessage}</div>) : null}
                        <br />
                        <label htmlFor="imageUrl" className={styles.label}>
                            Image URL
                             </label>
                        <input type="text" id="ImageUrl" value={imageUrl}
                            onChange={imageUrlChangeHandler} className="form-control" onBlur={imageUrlBlurHandler} disabled={disabled} />
                        {imageUrlError ? (<div className={styles.error}> {imageUrlErrorMessage}</div>) : null}
                        <label htmlFor="description" className={styles.label}>
                            Description
                             </label>
                        <textarea type="text" id="description" value={description}
                            onChange={descriptionChangeHandler} className="form-control" rows="5" onBlur={descriptionBlurHandler} disabled={disabled} />
                        {descriptionError ? (<div className={styles.error}>{descriptionErrorMessage}</div>) : null}
                        <label htmlFor="authorName" className={styles.label}>
                            Author Name
                             </label>
                        <input type="text" id="authorName" className="form-control" value={authorName}
                            disabled={true} />

                        <div className="text-center mt-4">
                            <MDBBtn className={styles.btn} type="submit">{btnTitle}</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    )
}
export default ArticleForm;




