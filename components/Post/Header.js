import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { object } from 'prop-types';

import styles from './styles/postHeader.module.css';
import typo from './styles/postTypography.module.css';
//import AuthorList from './Author';

const RubricLink = dynamic(() => import("../Links/Rubric"));
const YandexShare = dynamic(() => import("react-yandex-share"));
const AuthorIcon = dynamic(() => import("../../assets/author"));
const AuthorsIcon = dynamic(() => import("../../assets/authors"));


const Author = ({name, secondName, roleDescription, icon, withIcon}) => (
    <div title={roleDescription}>
        {
            withIcon &&
            (icon
                ? <img src={`${process.env.NEXT_PUBLIC_BACKEND}${icon.url}`}/>
                : <AuthorIcon/>)
        }
        <span className={typo.authors}>{name} {secondName}</span>
    </div>
);

const TimeAuthorsShare = ({title, description, cover, published_at, slug, authors}) => (
    <div style={{display: "flex", maxHeight: "56px", marginBottom: "16px"}}>
        <time className={typo.publishDate}>{dayjs(published_at).format("D MMMM YYYY")}</time>
        <div className={styles.postInfoDivider}/>
        <div className={styles.postAuthors}>

            {
                authors.length > 1
                 ? <>
                        <AuthorsIcon/>
                        <Author {...authors[0]}/>
                        <span className={typo.authorsOther}>и ещё {authors.length - 1}</span>
                   </>
                 : authors.map(author => <Author {...author} withIcon/>)
            }
        </div>
        <div style={{margin:"auto 0 auto auto"}}>
            <YandexShare
                content={{
                    title,
                    description,
                    image: `${process.env.NEXT_PUBLIC_BACKEND}${cover.url}`,
                    url: `${process.env.NEXT_PUBLIC_HOST}/${slug}`
                }}
                theme={{
                    lang: 'ru', limit: 4, size: "m", popupPosition: "outer", popupDirection: "bottom",
                    services: 'telegram,vkontakte,facebook,twitter,odnoklassniki,viber,whatsapp',
                    colorScheme: "normal", curtain: true, moreButtonType: "short"
                }}
            />
        </div>
    </div>
);


export default function PostHeader(props){
    const { data: {
        title, rubric: {title: rubricTitle, slug: rubricSlug},
        authors, date, slug, eventDate, cover
        }
    } = props;

    return (
        <header>
            <RubricLink rubricSlug={rubricSlug} className={typo.postRubric} covered>
                {rubricTitle}
            </RubricLink>
            <h1 className={typo.postHeading}>{title}</h1>
            <TimeAuthorsShare {...props.data}/>
            <img className={styles.postImage} src={`${process.env.NEXT_PUBLIC_BACKEND}${cover.url}`} alt={title}/>
        </header>
    );
}

PostHeader.propTypes = {
    data: object.isRequired,
}


/*
* <Rubric>{rubric}</Rubric>
                {
                    eventDate
                        ? <Flex mb={"10px"}>
                            <div className={styles.postEventDateWrapper}>
                                <Box m="auto">
                                    <EventDateDay>{eventDate.day}</EventDateDay>
                                    <EventDateMouth>{eventDate.mouth}</EventDateMouth>
                                </Box>
                            </div>
                            <Heading>{title}</Heading>
                        </Flex>
                        : <Heading>{title}</Heading>
                }
                <Flex my={"var(--spacing-m)"}>
                    <PublishDate>{date}</PublishDate>
                    {
                        width > 600 && <AuthorList authors={authors}/>
                    }
                    <Box  my="auto" ml="auto">
                        <Share slug={slug} cover={cover}>{title}</Share>
                    </Box>
                </Flex>
                {
                    width <= 600 && <AuthorList authors={authors}/>
                }
* */