import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { getTopic, getPost } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// Comps
import Comments from '../story/Comments'
import BodyMark from '../story/BodyMark'
import MoreMarkup from '../story/MoreMarkup'
import StoryMap from '../story/StoryMap'
import Loading from '../layout/Loading'
import Footer from '../layout/Footer'
import SEO from "../utils/SEO"

const useStyles = makeStyles((theme) => ({
    ...theme.spreadThis,
    headerCont: {
        marginTop: '2rem'
    },
    linkCont: {
        margin: '2.5rem auto 5rem',
        width: '250px',
        height: 80,
        border: `5px solid ${theme.palette.secondary.light}`,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
}));


export function Story(props) {

    const [story, setStory] = useState(props.location.pathname.slice(7))

    useEffect(() => {
        console.log(`*: ${props["*"]}, story: ${story}`);
        axios.get(`/post/${story}`)
            .then((res) => {
                props.getTopic(res.data.topic)
            })
            .catch((err) => console.log(err));
        props.getPost(story);
    }, []);

    const { postsid, topic, createdAt, postedBy, postImage, id, body, title, important, subTitle, link, commentCount } = props.data.post;
    console.log(props.data.post)
    const { loading } = props.UI;
    document.title = `${title === undefined ? 'Story' : title} | News | My Political Hub`;

    const theme = useTheme();
    const classes = useStyles(props);
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const readMarkup = (
        <div className={classes.linkCont}>
            <p style={{ margin: 0 }}><i>Read the full article <a target="_blank" href={link}>HERE!</a></i></p>
            <p style={{ margin: 0, marginTop: 'auto' }}><i>What do you think? Type in the comments section below.</i></p>
        </div>
    )

    return (
        <div>
            <SEO
                title={props.data.post.title}
                description={props.data.post.subtitle || props.data.post.body}
                image={{src: props.data.post.postImage, width: 250, height: 250}}
                pathname={props.location.path}
            />
            <Container maxWidth='lg'>
                <Grid className={classes.headerCont} container>
                    <Grid style={{ position: 'relative' }} item xs={12} lg={8}>
                        {loading ? <Loading /> : <StoryMap story={props.data.post} />}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        {matches ? (
                            <span>
                                {readMarkup}
                                <Comments story={props.data.post} />
                            </span>
                        ) : null
                        }
                    </Grid>
                    {matches ? (topic !== undefined ? <MoreMarkup topic={topic} title={title} link={props.location.pathname} topics={props.data.topic} /> : null) : null}
                </Grid>
            </Container>

            {loading ? null : (!matches ? <BodyMark story={props.data.post} /> : null)}

            {!matches ? (
                <span>
                    {readMarkup}
                    <Comments story={props.data.post} />
                </span>
            ) : null
            }

            {!matches ? (topic !== undefined ? <MoreMarkup topic={topic} title={title} link={props.location.pathname} topics={props.data.topic} /> : null) : null}
            <Footer />
        </div>
    );
}

const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
});

const mapDispatchToProps = { getPost, getTopic };

export default connect(mapStateToProps, mapDispatchToProps)(Story);